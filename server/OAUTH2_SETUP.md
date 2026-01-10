# OAuth2 Setup for Google Drive

This guide will help you set up OAuth2 authentication for Google Drive API.

## Prerequisites

- Google Cloud Platform (GCP) account
- A GCP project with Google Drive API enabled
- Node.js installed

## Step 1: Create OAuth2 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. If prompted, configure the OAuth consent screen first:
   - Choose **External** (unless you have a Google Workspace)
   - Fill in the required information:
     - App name: CyberCafe
     - User support email: your email
     - Developer contact: your email
   - Add scopes: `https://www.googleapis.com/auth/drive`
   - Add test users (your Google account email)
   - Save and continue
6. Back to Credentials, click **Create Credentials** > **OAuth client ID**
7. Choose **Web application**
8. Configure:
   - **Name**: CyberCafe Drive Client
   - **Authorized redirect URIs**: 
     - `http://localhost:5000/auth/google/callback`
     - `http://localhost:5000/oauth2callback` (for the setup script)
9. Click **Create**
10. **IMPORTANT**: Copy the **Client ID** and **Client Secret** - you'll need these!

## Step 2: Get Refresh Token

You need to get a refresh token to authenticate. We'll use a setup script for this.

### Option A: Using the Setup Script (Recommended)

1. Install dependencies (if not already installed):
   ```bash
   cd server
   npm install
   ```

2. Run the OAuth2 setup script:
   ```bash
   npx ts-node src/scripts/getOAuth2Token.ts
   ```

3. The script will:
   - Open a browser window
   - Ask you to sign in with your Google account
   - Ask for permission to access Google Drive
   - Redirect you back and display the refresh token

4. Copy the refresh token that's displayed

### Option B: Manual Setup

1. Open this URL in your browser (replace `YOUR_CLIENT_ID`):
   ```
   https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:5000/oauth2callback&response_type=code&scope=https://www.googleapis.com/auth/drive&access_type=offline&prompt=consent
   ```

2. Sign in with your Google account
3. Grant permission to access Google Drive
4. You'll be redirected to `http://localhost:5000/oauth2callback?code=...`
5. Copy the `code` parameter from the URL
6. Exchange the code for a refresh token using the setup script or manually

## Step 3: Configure Environment Variables

Add the following to your `server/.env` file:

```env
# OAuth2 Configuration
GOOGLE_DRIVE_CLIENT_ID=your-client-id-here
GOOGLE_DRIVE_CLIENT_SECRET=your-client-secret-here
GOOGLE_DRIVE_REFRESH_TOKEN=your-refresh-token-here
GOOGLE_DRIVE_REDIRECT_URI=http://localhost:5000/auth/google/callback

# Optional: Specific folder ID (defaults to hardcoded value if not set)
GOOGLE_DRIVE_FOLDER_ID=1EwzKQNgXgwuCbEvAEI0Rnx4K4aB8TW2F
```

**Example:**
```env
GOOGLE_DRIVE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_DRIVE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz
GOOGLE_DRIVE_REFRESH_TOKEN=1//0abcdefghijklmnopqrstuvwxyz-abcdefghijklmnop
GOOGLE_DRIVE_REDIRECT_URI=http://localhost:5000/auth/google/callback
GOOGLE_DRIVE_FOLDER_ID=1EwzKQNgXgwuCbEvAEI0Rnx4K4aB8TW2F
```

## Step 4: Test the Setup

1. Restart your server:
   ```bash
   cd server
   npm run dev
   ```

2. You should see:
   ```
   Initializing Google Drive service with OAuth2...
   Using Google Drive folder ID: 1EwzKQNgXgwuCbEvAEI0Rnx4K4aB8TW2F
   ✅ Google Drive initialized with OAuth2
   ```

3. Test uploading a file through your application

## Advantages of OAuth2 over Service Account

- ✅ Uses your personal Google Drive storage (no need to share folders)
- ✅ No storage quota issues
- ✅ Simpler setup (no folder sharing required)
- ✅ Uses your Google account's storage

## Troubleshooting

### Error: "OAuth2 credentials not configured"
- Make sure all three environment variables are set: `GOOGLE_DRIVE_CLIENT_ID`, `GOOGLE_DRIVE_CLIENT_SECRET`, `GOOGLE_DRIVE_REFRESH_TOKEN`
- Restart the server after updating `.env`

### Error: "Invalid refresh token"
- The refresh token may have expired or been revoked
- Generate a new refresh token using the setup script
- Make sure you use `access_type=offline&prompt=consent` when getting the token

### Error: "Redirect URI mismatch"
- Make sure the redirect URI in your OAuth2 credentials matches exactly: `http://localhost:5000/auth/google/callback`
- Check for typos or extra spaces

### Error: "Access blocked: This app's request is invalid"
- Make sure you added your email as a test user in the OAuth consent screen
- The app might be in testing mode - add test users in Google Cloud Console

## Security Notes

- **Never commit** your `.env` file to version control
- Keep your `GOOGLE_DRIVE_CLIENT_SECRET` and `GOOGLE_DRIVE_REFRESH_TOKEN` secure
- Refresh tokens don't expire unless revoked, but keep them safe
- Consider rotating refresh tokens periodically


