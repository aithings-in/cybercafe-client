import { Router } from "express";
import { body } from "express-validator";
import { uploadToDrive, upload } from "../controllers/uploadController";

const router = Router();

// Validation rules for uploading files
const uploadValidation = [
  body("userName")
    .trim()
    .notEmpty()
    .withMessage("User name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("User name must be between 2 and 100 characters"),
];

// Route for uploading files to Google Drive
router.post(
  "/drive",
  upload.array("files", 10), // Allow up to 10 files
  uploadValidation,
  uploadToDrive
);

export default router;

