# Fix: Service Account Storage Quota Error

## Problem
You're getting this error:
```
Service Accounts do not have storage quota. Leverage shared drives or use OAuth delegation instead.
```

## Solution: Share a Folder with Service Account

Service accounts don't have their own Google Drive storage. You need to share a folder from your personal Google Drive with the service account.

### Step-by-Step Instructions

1. **Get Your Service Account Email**
   - Your service account email is: `cybercafe@delta-env-258202.iam.gserviceaccount.com`
   - (You can also find this in `server/src/config/service-account-key.json` under `client_email`)

2. **Create or Select a Folder in Your Google Drive**
   - Go to [Google Drive](https://drive.google.com)
   - Create a new folder (e.g., "CyberCafe Uploads") or use an existing one
   - This folder will store all uploaded files

3. **Share the Folder with Service Account**
   - Right-click on the folder → **Share**
   - In the "Add people and groups" field, paste: `cybercafe@delta-env-258202.iam.gserviceaccount.com`
   - Set permission to **Editor** (so it can create files and folders)
   - Click **Send** (you don't need to notify, but you can if you want)
   - **Important**: Make sure "Notify people" is unchecked or the service account won't receive the notification

4. **Get the Folder ID**
   - Open the shared folder in Google Drive
   - Look at the URL in your browser
   - The URL will look like: `https://drive.google.com/drive/folders/1EwzKQNgXgwuCbEvAEI0Rnx4K4aB8TW2F`
   - Copy the part after `/folders/` - that's your folder ID
   - Example: `1EwzKQNgXgwuCbEvAEI0Rnx4K4aB8TW2F`

5. **Update Your .env File**
   - Open `server/.env`
   - Make sure `GOOGLE_DRIVE_FOLDER_ID` is set:
   ```env
   GOOGLE_DRIVE_FOLDER_ID=1EwzKQNgXgwuCbEvAEI0Rnx4K4aB8TW2F
   ```
   - Replace with your actual folder ID

6. **Restart Your Server**
   ```bash
   cd server
   npm run dev
   ```

### How It Works

- Files will be uploaded to the shared folder
- Within that folder, subfolders will be created for each user: `Uploads_[UserName]_[Date]`
- Example structure:
  ```
  CyberCafe Uploads/ (shared folder)
    └── Uploads_John_Doe_2024-01-15/
        ├── document1.pdf
        └── document2.docx
  ```

### Verification

1. Check that the folder is shared:
   - Go to the folder in Google Drive
   - Click the folder name → **Share** → Check that `cybercafe@delta-env-258202.iam.gserviceaccount.com` is listed

2. Test the upload:
   - Try uploading a file through your application
   - Check the shared folder in Google Drive
   - You should see the file appear

### Troubleshooting

**Error: "GOOGLE_DRIVE_FOLDER_ID is required"**
- Make sure `GOOGLE_DRIVE_FOLDER_ID` is set in your `.env` file
- Restart the server after updating `.env`

**Error: "Permission denied" or "File not found"**
- Verify the folder is shared with the service account email
- Check that the service account has **Editor** permission (not just Viewer)
- Verify the folder ID is correct (no extra spaces or characters)

**Files not appearing**
- Check the server logs for errors
- Verify the folder ID matches the one in the URL
- Make sure the folder is shared, not just accessible via link

### Alternative: Use OAuth2 (More Complex)

If you prefer not to share folders, you can use OAuth2 with a user account instead of a service account. This requires:
- Setting up OAuth2 credentials
- Getting a refresh token
- Using user's Google Drive storage

This is more complex and requires user interaction for initial setup.

