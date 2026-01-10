/**
 * Test script to verify Google Drive configuration
 * Run with: npx ts-node src/scripts/testGoogleDrive.ts
 */

import dotenv from "dotenv";
import path from "path";
import googleDriveService from "../services/googleDriveService";

// Load environment variables
dotenv.config({
  path: path.resolve(__dirname, "../..", ".env"),
});

async function testGoogleDrive() {
  console.log("Testing Google Drive Configuration...\n");

  // Check environment variables
  console.log("1. Checking environment variables:");
  console.log(`   GOOGLE_DRIVE_KEY_FILE: ${process.env.GOOGLE_DRIVE_KEY_FILE || "NOT SET"}`);
  console.log(`   GOOGLE_DRIVE_FOLDER_ID: ${process.env.GOOGLE_DRIVE_FOLDER_ID || "NOT SET"}`);
  console.log("");

  // Test initialization
  console.log("2. Testing Google Drive service initialization...");
  try {
    // Try to upload a test file
    const testBuffer = Buffer.from("This is a test file");
    const testFileId = await googleDriveService.uploadFile({
      fileName: "test-file.txt",
      fileBuffer: testBuffer,
      mimeType: "text/plain",
      userName: "TestUser",
    });

    console.log(`   ✓ Success! Test file uploaded with ID: ${testFileId}`);
    console.log("   Google Drive is configured correctly!");
  } catch (error: any) {
    console.log("   ✗ Error:");
    console.log(`   Message: ${error.message}`);
    if (error.code) {
      console.log(`   Code: ${error.code}`);
    }
    if (error.status) {
      console.log(`   Status: ${error.status}`);
    }
    console.log("\n   Common issues:");
    console.log("   - Service account key file not found");
    console.log("   - Folder not shared with service account");
    console.log("   - Invalid folder ID");
    console.log("   - Insufficient permissions");
  }
}

testGoogleDrive()
  .then(() => {
    console.log("\nTest completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\nFatal error:", error);
    process.exit(1);
  });

