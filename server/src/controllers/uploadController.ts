import { Request, Response } from "express";
import multer from "multer";
import googleDriveService from "../services/googleDriveService";
import { validationResult } from "express-validator";

// Configure multer for memory storage
const storage = multer.memoryStorage();
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept all file types, or you can add specific filters
    cb(null, true);
  },
});

export const uploadToDrive = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
      return;
    }

    const { userName } = req.body;

    if (!userName || userName.trim() === "") {
      res.status(400).json({
        success: false,
        message: "User name is required",
      });
      return;
    }

    if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
      res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
      return;
    }

    const files = Array.isArray(req.files) ? req.files : [req.files];
    const filesToUpload = files.map((file: Express.Multer.File) => ({
      fileName: file.originalname,
      fileBuffer: file.buffer,
      mimeType: file.mimetype,
    }));

    // Upload files to Google Drive
    const uploadedFileIds = await googleDriveService.uploadFiles(
      filesToUpload,
      userName.trim()
    );

    res.status(200).json({
      success: true,
      message: "Files uploaded to Google Drive successfully",
      data: {
        fileIds: uploadedFileIds,
        count: uploadedFileIds.length,
        userName: userName.trim(),
      },
    });
  } catch (error: any) {
    console.error("Error uploading to Google Drive:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload files to Google Drive",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

