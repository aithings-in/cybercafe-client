# How to Share Google Drive Folder with Service Account

## Quick Fix Steps

Your service account email is: **`cybercafe@delta-env-258202.iam.gserviceaccount.com`**

Your folder ID is: **`1EwzKQNgXgwuCbEvAEI0Rnx4K4aB8TW2F`**

### Step 1: Open the Folder in Google Drive

1. Go to [Google Drive](https://drive.google.com)
2. Open the folder with ID `1EwzKQNgXgwuCbEvAEI0Rnx4K4aB8TW2F`
   - You can also search for it or navigate to it directly
   - The URL should be: `https://drive.google.com/drive/folders/1EwzKQNgXgwuCbEvAEI0Rnx4K4aB8TW2F`

### Step 2: Share the Folder

1. **Right-click** on the folder → Click **Share** (or click the folder name and then click the Share button)
2. In the "Add people and groups" field, paste this email:
   ```
   cybercafe@delta-env-258202.iam.gserviceaccount.com
   ```
3. **IMPORTANT**: Set the permission to **Editor** (not Viewer)
   - Click the dropdown next to the email
   - Select **Editor**
4. **Uncheck** "Notify people" (service accounts don't need notifications)
5. Click **Share** or **Send**

### Step 3: Verify Sharing

1. Click on the folder name to open it
2. Click the **Share** button again
3. You should see `cybercafe@delta-env-258202.iam.gserviceaccount.com` listed with **Editor** permission

### Step 4: Test the Upload

1. Restart your server:
   ```bash
   cd server
   npm run dev
   ```
2. Try uploading a file through your application
3. Check the folder in Google Drive - the file should appear

## Common Issues

### Issue: "Service Accounts do not have storage quota"
**Solution**: The folder is not shared with the service account, or the service account doesn't have Editor permission.

### Issue: "Permission denied"
**Solution**: 
- Make sure the service account has **Editor** permission (not Viewer)
- Verify the email is exactly: `cybercafe@delta-env-258202.iam.gserviceaccount.com`
- Make sure you shared the folder, not just gave access via link

### Issue: Files not appearing
**Solution**:
- Check server logs for errors
- Verify the folder ID is correct: `1EwzKQNgXgwuCbEvAEI0Rnx4K4aB8TW2F`
- Make sure the folder is shared (not just accessible via link)

## Alternative: Create a New Folder

If you don't have access to the existing folder, create a new one:

1. Create a new folder in Google Drive (e.g., "CyberCafe Uploads")
2. Share it with: `cybercafe@delta-env-258202.iam.gserviceaccount.com` with **Editor** permission
3. Get the folder ID from the URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`
4. Update the code in `server/src/services/googleDriveService.ts` line 56:
   ```typescript
   this.folderId = "YOUR_NEW_FOLDER_ID_HERE";
   ```

## Verification Checklist

- [ ] Folder is shared with `cybercafe@delta-env-258202.iam.gserviceaccount.com`
- [ ] Service account has **Editor** permission (not Viewer)
- [ ] Folder ID in code matches the actual folder: `1EwzKQNgXgwuCbEvAEI0Rnx4K4aB8TW2F`
- [ ] Server has been restarted after any changes
- [ ] No errors in server console logs



