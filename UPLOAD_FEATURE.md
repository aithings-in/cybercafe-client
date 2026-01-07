# Document Upload to Google Drive Feature

## Overview

The upload document feature allows users to:
1. Select or drag-and-drop files
2. Enter their name
3. Upload files to Google Drive organized by user name and date

## How It Works

### User Flow

1. **File Selection**: User drags and drops files or clicks to select files
2. **Form Display**: After files are selected, the drag-and-drop area disappears and a form appears
3. **Name Input**: User enters their name in the form
4. **Upload**: User clicks "Upload to Drive" button
5. **Success**: Files are uploaded to Google Drive in a folder named `Uploads_[UserName]_[Date]`

### Client-Side (`client/src/pages/upload-document.tsx`)

- **State Management**: 
  - `selectedFiles`: Array of selected files
  - `userName`: User's name input
  - `uploadStatus`: Current upload status (idle, uploading, success, error)
  - `errorMessage`: Error message if upload fails

- **Features**:
  - Drag and drop file selection
  - File list display with remove option
  - User name input form
  - Real-time upload status
  - Success/error messages

### Server-Side

#### API Endpoint
- **POST** `/api/upload/drive`
- **Body**: FormData with:
  - `userName`: string (required)
  - `files`: File[] (required, up to 10 files)

#### Response
```json
{
  "success": true,
  "message": "Files uploaded to Google Drive successfully",
  "data": {
    "fileIds": ["file-id-1", "file-id-2"],
    "count": 2,
    "userName": "John Doe"
  }
}
```

#### Server Structure

1. **Routes** (`server/src/routes/uploadRoutes.ts`):
   - Handles file upload with multer middleware
   - Validates user name input
   - Routes to upload controller

2. **Controller** (`server/src/controllers/uploadController.ts`):
   - Processes uploaded files
   - Validates input
   - Calls Google Drive service
   - Returns response

3. **Service** (`server/src/services/googleDriveService.ts`):
   - Handles Google Drive API integration
   - Creates user-specific folders
   - Uploads files to Google Drive
   - Returns file IDs

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

This will install:
- `multer`: For handling file uploads
- `googleapis`: For Google Drive API integration
- `@types/multer`: TypeScript types for multer

### 2. Configure Google Drive API

Follow the detailed guide in `server/GOOGLE_DRIVE_SETUP.md` to:
1. Create a Google Cloud project
2. Enable Google Drive API
3. Create service account
4. Download service account key
5. Configure environment variables

### 3. Update Environment Variables

Add to `server/.env`:
```env
GOOGLE_DRIVE_KEY_FILE=./keys/service-account-key.json
GOOGLE_DRIVE_FOLDER_ID=your-folder-id (optional)
```

### 4. Start Server

```bash
cd server
npm run dev
```

### 5. Test the Feature

1. Navigate to `http://localhost:3000/upload-document`
2. Select or drag files
3. Enter your name
4. Click "Upload to Drive"
5. Check Google Drive for uploaded files

## File Organization in Google Drive

Files are organized as follows:

```
Google Drive Root (or specified folder)
└── Uploads_John_Doe_2024-01-15/
    ├── document1.pdf
    ├── document2.docx
    └── image1.jpg
```

Each user gets a folder named: `Uploads_[UserName]_[Date]`

## Error Handling

The feature includes comprehensive error handling:

- **Client-side**:
  - Network errors
  - Validation errors
  - Server errors
  - User-friendly error messages

- **Server-side**:
  - File validation
  - Google Drive API errors
  - Authentication errors
  - Detailed error logging

## Security Considerations

1. **File Size Limit**: 50MB per file (configurable in `uploadController.ts`)
2. **File Count Limit**: 10 files per upload (configurable in `uploadRoutes.ts`)
3. **Service Account Keys**: Never committed to version control
4. **Input Validation**: User name and files are validated before processing

## Future Enhancements

Possible improvements:
- File type restrictions
- Progress bar for large files
- File preview before upload
- Upload history
- Email notifications
- File sharing links

