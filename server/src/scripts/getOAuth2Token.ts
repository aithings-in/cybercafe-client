/**
 * OAuth2 Token Setup Script
 *
 * This script helps you get a refresh token for Google Drive API.
 * Run with: npx ts-node src/scripts/getOAuth2Token.ts
 */

import { google } from "googleapis";
import readline from "readline";
import { createServer } from "http";
import { parse } from "url";
import open from "open";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({
  path: path.resolve(__dirname, "../..", ".env"),
});

const CLIENT_ID = process.env.GOOGLE_DRIVE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
const REDIRECT_URI =
  process.env.GOOGLE_DRIVE_REDIRECT_URI ||
  "http://localhost:5000/oauth2callback";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "❌ Error: GOOGLE_DRIVE_CLIENT_ID and GOOGLE_DRIVE_CLIENT_SECRET must be set in .env file"
  );
  console.log("\nPlease add to your .env file:");
  console.log("GOOGLE_DRIVE_CLIENT_ID=your-client-id");
  console.log("GOOGLE_DRIVE_CLIENT_SECRET=your-client-secret");
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = ["https://www.googleapis.com/auth/drive"];

async function getRefreshToken() {
  return new Promise<string>((resolve, reject) => {
    // Generate auth URL
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
      prompt: "consent", // Force consent screen to get refresh token
    });

    console.log("\n🔐 OAuth2 Setup for Google Drive");
    console.log("================================\n");
    console.log("1. Opening browser for authentication...");
    console.log("2. Sign in with your Google account");
    console.log("3. Grant permission to access Google Drive");
    console.log("4. You'll be redirected back automatically\n");

    // Create temporary server to receive callback
    const server = createServer(async (req, res) => {
      try {
        if (!req.url) return;

        const qs = new URL(req.url, REDIRECT_URI).searchParams;
        const code = qs.get("code");

        if (code) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(`
            <html>
              <body>
                <h1>Success!</h1>
                <p>Authorization code received. Processing...</p>
                <script>setTimeout(() => window.close(), 2000);</script>
              </body>
            </html>
          `);

          // Exchange code for tokens
          const { tokens } = await oauth2Client.getToken(code);

          server.close();

          if (tokens.refresh_token) {
            console.log("\n✅ Success! Refresh token obtained:\n");
            console.log("=".repeat(60));
            console.log(tokens.refresh_token);
            console.log("=".repeat(60));
            console.log("\n📝 Add this to your .env file:");
            console.log(`GOOGLE_DRIVE_REFRESH_TOKEN=${tokens.refresh_token}\n`);
            resolve(tokens.refresh_token);
          } else {
            console.error("\n❌ Error: No refresh token received");
            console.log(
              "This might happen if you've already authorized the app."
            );
            console.log("Try revoking access and running the script again.");
            reject(new Error("No refresh token received"));
          }
        } else {
          res.writeHead(400, { "Content-Type": "text/html" });
          res.end("<h1>Error: No authorization code received</h1>");
          server.close();
          reject(new Error("No authorization code"));
        }
      } catch (error) {
        server.close();
        reject(error);
      }
    });

    server.listen(5000, () => {
      // Open browser
      open(authUrl).catch(() => {
        console.log("\n⚠️  Could not open browser automatically.");
        console.log("Please open this URL in your browser:\n");
        console.log(authUrl);
        console.log("\n");
      });
    });
  });
}

// Run the script
getRefreshToken()
  .then(() => {
    console.log("✅ Setup complete! Restart your server to use OAuth2.\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  });
