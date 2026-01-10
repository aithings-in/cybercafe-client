import dotenv from "dotenv";
import { google } from "googleapis";
import { Readable } from "stream";

dotenv.config();

interface UploadToDriveOptions {
  fileName: string;
  fileBuffer: Buffer;
  mimeType: string;
  folderName?: string;
  userName: string;
}

interface UploadResponse {
  id: string;
  name: string;
  webViewLink?: string;
  webContentLink?: string;
}

class GoogleDriveService {
  private drive: any;
  private folderId: string | null = null;
  private isInitialized = false;

  // ---------------- INIT ----------------
  private initialize() {
    if (this.isInitialized) return;

    try {
      console.log("Initializing Google Drive service with OAuth2...");

      // OAuth2 Configuration
      const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
      const refreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;
      const redirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI;

      if (!clientId || !clientSecret || !refreshToken) {
        throw new Error(
          "OAuth2 credentials not configured. " +
            "Please set GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET, and GOOGLE_DRIVE_REFRESH_TOKEN in your .env file."
        );
      }

      // Create OAuth2 client
      const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        redirectUri
      );

      // Set refresh token and handle token refresh
      oauth2Client.setCredentials({
        refresh_token: refreshToken,
      });

      // Handle token refresh automatically
      oauth2Client.on("tokens", (tokens) => {
        if (tokens.refresh_token) {
          // If a new refresh token is provided, save it
          console.log(
            "⚠️  New refresh token received. Update your .env file with it."
          );
          console.log(`GOOGLE_DRIVE_REFRESH_TOKEN=${tokens.refresh_token}`);
        }
      });

      // Initialize Drive API
      this.drive = google.drive({ version: "v3", auth: oauth2Client });

      // Folder ID (optional - can be set in .env or hardcoded)
      this.folderId =
        process.env.GOOGLE_DRIVE_FOLDER_ID ||
        "1EwzKQNgXgwuCbEvAEI0Rnx4K4aB8TW2F";
      console.log(`Using Google Drive folder ID: ${this.folderId}`);

      this.isInitialized = true;
      console.log("✅ Google Drive initialized with OAuth2");
    } catch (err: any) {
      console.error("❌ Google Drive init failed:", err.message);
      this.drive = null;
      this.isInitialized = true;
    }
  }

  // ---------------- HELPERS ----------------
  private sanitizeFileName(name: string): string {
    return name.replace(/[<>:"/\\|?*]+/g, "_");
  }

  private async getOrCreateFolder(folderName: string): Promise<string> {
    this.initialize();
    if (!this.drive) throw new Error("Drive not initialized");

    const query = `
      name='${folderName}'
      and mimeType='application/vnd.google-apps.folder'
      and '${this.folderId}' in parents
      and trashed=false
    `;

    const list = await this.drive.files.list({
      q: query,
      fields: "files(id)",
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    if (list.data.files?.length) {
      return list.data.files[0].id;
    }

    const folder = await this.drive.files.create({
      requestBody: {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
        parents: [this.folderId],
      },
      fields: "id",
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    return folder.data.id;
  }

  private async deleteIfExists(
    fileName: string,
    parentId: string
  ): Promise<void> {
    const existing = await this.drive.files.list({
      q: `
        name='${fileName}'
        and '${parentId}' in parents
        and trashed=false
      `,
      fields: "files(id)",
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    if (existing.data.files?.length) {
      await this.drive.files.delete({
        fileId: existing.data.files[0].id,
      });
    }
  }

  // ---------------- SINGLE FILE UPLOAD ----------------
  async uploadFile(options: UploadToDriveOptions): Promise<UploadResponse> {
    this.initialize();
    if (!this.drive || !this.folderId) {
      throw new Error("Google Drive not properly configured");
    }

    const { fileName, fileBuffer, mimeType, userName, folderName } = options;

    const safeFileName = this.sanitizeFileName(fileName);

    let parentFolderId = this.folderId;

    if (userName) {
      const userFolder = `Uploads_${userName}_${
        new Date().toISOString().split("T")[0]
      }`;
      parentFolderId = await this.getOrCreateFolder(userFolder);
    } else if (folderName) {
      parentFolderId = await this.getOrCreateFolder(folderName);
    }

    // Overwrite if same filename exists
    await this.deleteIfExists(safeFileName, parentFolderId);

    const stream = new Readable();
    stream.push(fileBuffer);
    stream.push(null);

    const response = await this.drive.files.create({
      requestBody: {
        name: safeFileName,
        parents: [parentFolderId],
      },
      media: {
        mimeType,
        body: stream,
      },
      fields: "id, name, webViewLink, webContentLink",
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    return {
      id: response.data.id,
      name: response.data.name,
      webViewLink: response.data.webViewLink,
      webContentLink: response.data.webContentLink,
    };
  }

  // ---------------- MULTIPLE FILE UPLOAD ----------------
  async uploadFiles(
    files: Array<{ fileName: string; fileBuffer: Buffer; mimeType: string }>,
    userName: string
  ): Promise<UploadResponse[]> {
    const results: UploadResponse[] = [];

    for (const file of files) {
      const uploaded = await this.uploadFile({
        ...file,
        userName,
      });
      results.push(uploaded);
    }

    return results;
  }
}

export default new GoogleDriveService();
