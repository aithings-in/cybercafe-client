# Fix: invalid_grant Error

## What does "invalid_grant" mean?

The `invalid_grant` error from Google OAuth2 means:
- ❌ Your refresh token is invalid, expired, or has been revoked
- ❌ The refresh token doesn't match the Client ID/Secret
- ❌ The refresh token format is incorrect
- ❌ The user revoked access to your app

## How to Fix It

### Solution 1: Get a New Refresh Token (Recommended)

The refresh token in your code appears to be invalid. You need to generate a new one:

1. **Revoke old access** (optional but recommended):
   - Go to: https://myaccount.google.com/permissions
   - Find your app and click "Remove Access"
   - This ensures you get a fresh token

2. **Run the setup script to get a new refresh token**:
   ```bash
   cd server
   npx ts-node src/scripts/getOAuth2Token.ts
   ```

3. **The script will**:
   - Open a browser window
   - Ask you to sign in with Google
   - Request permission for Google Drive
   - Display a new refresh token

4. **Update your code** with the new refresh token:
   - Replace the hardcoded refresh token in `googleDriveService.ts` line 40
   - Or better: Use environment variables in `.env`

### Solution 2: Use Environment Variables (Better Practice)

Instead of hardcoding credentials, use `.env` file:

1. **Create/Update `server/.env`**:
   ```env
   GOOGLE_DRIVE_CLIENT_ID=your-client-id-here
   GOOGLE_DRIVE_CLIENT_SECRET=your-client-secret-here
   GOOGLE_DRIVE_REFRESH_TOKEN=your-new-refresh-token-here
   GOOGLE_DRIVE_REDIRECT_URI=http://localhost:5000/auth/google/callback
   ```

2. **Update `googleDriveService.ts`** to remove hardcoded values:
   ```typescript
   const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
   const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
   const refreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;
   ```

3. **Remove the fallback values** (lines with `|| "hardcoded-value"`)

### Solution 3: Verify OAuth2 Credentials

Make sure your Client ID and Secret are correct:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** > **Credentials**
3. Find your OAuth 2.0 Client ID
4. Verify the Client ID and Secret match what's in your code
5. Check that the redirect URI is: `http://localhost:5000/auth/google/callback`

### Solution 4: Check OAuth Consent Screen

1. Go to **APIs & Services** > **OAuth consent screen**
2. Make sure your app is in **Testing** mode (or Published)
3. Add your Google account email as a **Test user**
4. Make sure the scope `https://www.googleapis.com/auth/drive` is added

## Quick Fix Steps

1. **Get a new refresh token**:
   ```bash
   cd server
   npx ts-node src/scripts/getOAuth2Token.ts
   ```

2. **Copy the refresh token** that's displayed

3. **Update your `.env` file**:
   ```env
   GOOGLE_DRIVE_REFRESH_TOKEN=paste-new-token-here
   ```

4. **Update `googleDriveService.ts`** to use environment variables instead of hardcoded values

5. **Restart your server**

## Common Causes

- ✅ **Token expired**: Refresh tokens can expire if not used for 6 months
- ✅ **Token revoked**: User revoked access in Google account settings
- ✅ **Wrong credentials**: Client ID/Secret don't match the token
- ✅ **Token format**: Extra spaces or characters in the token

## Prevention

- Use environment variables instead of hardcoding tokens
- Store tokens securely (never commit to git)
- Regenerate tokens if you suspect they're compromised
- Use the setup script whenever you need a new token

