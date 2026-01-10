# Google Drive API Setup Guide

This guide will help you set up Google Drive API integration for file uploads.

## Prerequisites

- Google Cloud Platform (GCP) account
- A GCP project with Google Drive API enabled

## Setup Steps

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project ID // delta-env-258202

### 2. Enable Google Drive API

1. In the Google Cloud Console, navigate to **APIs & Services** > **Library**
2. Search for "Google Drive API"
3. Click on it and click **Enable**

### 3. Create Service Account (Recommended for Server-Side)

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in the service account details:
   - **Name**: CyberCafe Drive Service
   - **Description**: Service account for uploading files to Google Drive
4. Click **Create and Continue**
5. Skip role assignment (or assign if needed)
6. Click **Done**

### 4. Create Service Account Key

63780053120-rl752qroe79logbaj6jjae2oslagq529.apps.googleusercontent.com

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** > **Create new key**
4. Select **JSON** format
5. Click **Create**
6. The JSON file will be downloaded automatically

### 5. Share Google Drive Folder (Optional)

If you want to upload files to a specific folder:

1. Open the downloaded JSON file
2. Copy the `client_email` value (e.g., `cybercafe-drive@project-id.iam.gserviceaccount.com`)
3. Go to your Google Drive
4. Create or select a folder where you want files to be uploaded
5. Right-click the folder > **Share**
6. Paste the service account email and give it **Editor** access
7. Copy the folder ID from the URL (the long string after `/folders/`)
8. Add it to your `.env` file as `GOOGLE_DRIVE_FOLDER_ID`

### 6. Configure Environment Variables

Add the following to your `server/.env` file:

```env
# Option 1: Path to service account key file (Recommended)
GOOGLE_DRIVE_KEY_FILE=./path/to/service-account-key.json

# Option 2: Or paste the entire JSON as a single line (Alternative)
# GOOGLE_DRIVE_SERVICE_ACCOUNT={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}

# Optional: Specific folder ID
GOOGLE_DRIVE_FOLDER_ID=your-folder-id-here
```

### 7. Place Service Account Key File

1. Create a `keys` or `credentials` folder in your server directory
2. Place the downloaded JSON file there
3. Update `GOOGLE_DRIVE_KEY_FILE` path in `.env`
4. **Important**: Add the key file to `.gitignore` to keep it secure!

```bash
# Add to server/.gitignore
keys/
credentials/
*.json
service-account-key.json
```

## Alternative: OAuth2 Setup (For User-Based Authentication)

If you prefer OAuth2 instead of service account:

### 1. Create OAuth2 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Choose **Web application**
4. Add authorized redirect URIs
5. Download the credentials

### 2. Get Refresh Token

You'll need to implement OAuth2 flow to get a refresh token. This is more complex and typically requires user interaction.

### 3. Configure Environment Variables

```env
GOOGLE_DRIVE_CLIENT_ID=your-client-id
GOOGLE_DRIVE_CLIENT_SECRET=your-client-secret
GOOGLE_DRIVE_REDIRECT_URI=http://localhost:5000/auth/google/callback
GOOGLE_DRIVE_REFRESH_TOKEN=your-refresh-token
```

## Testing the Setup

1. Start your server:
```bash
cd server
npm run dev
```

2. Test the upload endpoint using a tool like Postman or curl:
```bash
curl -X POST http://localhost:5000/api/upload/drive \
  -F "userName=Test User" \
  -F "files=@/path/to/test-file.pdf"
```

3. Check your Google Drive to verify the file was uploaded

## Troubleshooting

### Error: "Google Drive service is not initialized"
- Check that `GOOGLE_DRIVE_KEY_FILE` path is correct
- Verify the JSON file exists and is readable
- Check file permissions

### Error: "Insufficient Permission"
- Make sure the service account has access to the folder
- Verify the folder ID is correct
- Check that the service account email has Editor access

### Error: "API not enabled"
- Go to Google Cloud Console
- Enable Google Drive API for your project

### Files not appearing in Drive
- Check the folder ID in `.env`
- Verify the service account has access to that folder
- Check server logs for detailed error messages

## Security Best Practices

1. **Never commit service account keys to version control**
2. Use environment variables for sensitive data
3. Restrict service account permissions to minimum required
4. Regularly rotate service account keys
5. Use separate service accounts for development and production

## File Organization

Files will be organized as follows:
- If `GOOGLE_DRIVE_FOLDER_ID` is set: Files go into that folder
- User-specific folders: `Uploads_[UserName]_[Date]` (e.g., `Uploads_John_Doe_2024-01-15`)
- Files are uploaded with their original names

