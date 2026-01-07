import { google } from "googleapis";
import { Readable } from "stream";

interface UploadToDriveOptions {
  fileName: string;
  fileBuffer: Buffer;
  mimeType: string;
  folderName?: string;
  userName: string;
}

class GoogleDriveService {
  private drive: any;
  private folderId: string | null = null;
  private isInitialized: boolean = false;

  private initialize() {
    if (this.isInitialized) return;

    try {
      // Option 1: Service Account (Recommended for server-side)
      if (process.env.GOOGLE_DRIVE_KEY_FILE) {
        const auth = new google.auth.GoogleAuth({
          keyFile: process.env.GOOGLE_DRIVE_KEY_FILE,
          scopes: ["https://www.googleapis.com/auth/drive"],
        });
        this.drive = google.drive({ version: "v3", auth });
      }
      // Option 2: Service Account JSON (if provided as environment variable)
      else if (process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT) {
        const credentials = JSON.parse(
          process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT
        );
        const auth = new google.auth.GoogleAuth({
          credentials: credentials,
          scopes: ["https://www.googleapis.com/auth/drive"],
        });
        this.drive = google.drive({ version: "v3", auth });
      }
      // Option 3: OAuth2 Client (for user-based authentication)
      else if (
        process.env.GOOGLE_DRIVE_CLIENT_ID &&
        process.env.GOOGLE_DRIVE_CLIENT_SECRET
      ) {
        const oauth2Client = new google.auth.OAuth2(
          process.env.GOOGLE_DRIVE_CLIENT_ID,
          process.env.GOOGLE_DRIVE_CLIENT_SECRET,
          process.env.GOOGLE_DRIVE_REDIRECT_URI
        );
        oauth2Client.setCredentials({
          refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
        });
        this.drive = google.drive({ version: "v3", auth: oauth2Client });
      } else {
        console.warn(
          "Google Drive credentials not configured. File uploads will fail."
        );
        this.drive = null;
      }

      this.folderId = process.env.GOOGLE_DRIVE_FOLDER_ID || null;
      this.isInitialized = true;
    } catch (error) {
      console.error("Error initializing Google Drive service:", error);
      this.drive = null;
    }
  }

  /**
   * Create or get folder in Google Drive
   */
  private async getOrCreateFolder(folderName: string): Promise<string> {
    this.initialize();

    if (!this.drive) {
      throw new Error(
        "Google Drive service is not initialized. Please configure credentials."
      );
    }

    try {
      // First, try to find existing folder
      const query = this.folderId
        ? `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and '${this.folderId}' in parents and trashed=false`
        : `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;

      const response = await this.drive.files.list({
        q: query,
        fields: "files(id, name)",
      });

      if (response.data.files && response.data.files.length > 0) {
        return response.data.files[0].id;
      }

      // Create new folder if it doesn't exist
      const folderMetadata: any = {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
      };

      if (this.folderId) {
        folderMetadata.parents = [this.folderId];
      }

      const folder = await this.drive.files.create({
        requestBody: folderMetadata,
        fields: "id",
      });

      return folder.data.id || "";
    } catch (error) {
      console.error("Error creating/getting folder:", error);
      throw error;
    }
  }

  /**
   * Upload file to Google Drive
   */
  async uploadFile(options: UploadToDriveOptions): Promise<string> {
    this.initialize();

    if (!this.drive) {
      throw new Error(
        "Google Drive service is not initialized. Please configure credentials."
      );
    }

    try {
      const { fileName, fileBuffer, mimeType, folderName, userName } = options;

      // Create a folder with user's name if provided
      let parentFolderId = this.folderId;
      if (userName) {
        const userFolderName = `Uploads_${userName}_${
          new Date().toISOString().split("T")[0]
        }`;
        parentFolderId = await this.getOrCreateFolder(userFolderName);
      } else if (folderName) {
        parentFolderId = await this.getOrCreateFolder(folderName);
      }

      // Create file metadata
      const fileMetadata: any = {
        name: fileName,
      };

      if (parentFolderId) {
        fileMetadata.parents = [parentFolderId];
      }

      // Convert buffer to stream
      const stream = new Readable();
      stream.push(fileBuffer);
      stream.push(null);

      // Upload file
      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        media: {
          mimeType: mimeType,
          body: stream,
        },
        fields: "id, name, webViewLink, webContentLink",
      });

      return response.data.id || "";
    } catch (error) {
      console.error("Error uploading file to Google Drive:", error);
      throw error;
    }
  }

  /**
   * Upload multiple files to Google Drive
   */
  async uploadFiles(
    files: Array<{ fileName: string; fileBuffer: Buffer; mimeType: string }>,
    userName: string
  ): Promise<string[]> {
    try {
      const uploadedFileIds: string[] = [];

      for (const file of files) {
        const fileId = await this.uploadFile({
          fileName: file.fileName,
          fileBuffer: file.fileBuffer,
          mimeType: file.mimeType,
          userName: userName,
        });
        uploadedFileIds.push(fileId);
      }

      return uploadedFileIds;
    } catch (error) {
      console.error("Error uploading files to Google Drive:", error);
      throw error;
    }
  }
}

export default new GoogleDriveService();
