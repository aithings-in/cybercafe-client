const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface UploadResponse {
  success: boolean;
  message: string;
  data?: {
    fileIds: string[];
    count: number;
    userName: string;
  };
  errors?: Array<{
    msg: string;
    param: string;
  }>;
}

export interface UploadError {
  message: string;
  errors?: Array<{
    msg: string;
    param: string;
  }>;
}

/**
 * Upload files to Google Drive
 * @param files - Array of File objects to upload
 * @param userName - Name of the user uploading the files
 * @returns Promise with upload response
 */
export const uploadFilesToDrive = async (
  files: File[],
  userName: string
): Promise<UploadResponse> => {
  try {
    // Validate inputs
    if (!files || files.length === 0) {
      throw new Error("No files selected");
    }

    if (!userName || userName.trim() === "") {
      throw new Error("User name is required");
    }

    // Create FormData
    const formData = new FormData();
    formData.append("userName", userName.trim());

    files.forEach((file) => {
      formData.append("files", file);
    });

    // Make API request
    const response = await fetch(`${API_URL}/upload/drive`, {
      method: "POST",
      body: formData,
    });

    // Parse response
    const data: UploadResponse = await response.json();

    // Handle non-OK responses
    if (!response.ok) {
      const errorMessage =
        data.message ||
        data.errors?.[0]?.msg ||
        `Upload failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    // Return successful response
    return data;
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Network error. Please check your connection and ensure the server is running."
      );
    }

    // Re-throw other errors
    throw error;
  }
};

/**
 * Check if the upload API is available
 * @returns Promise<boolean> - true if API is available
 */
export const checkUploadApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: "GET",
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};
