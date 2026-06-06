import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

/**
 * Initialize Google Drive API with service account credentials
 */
const initDrive = () => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    return google.drive({ version: "v3", auth });
  } catch (error) {
    console.error("Failed to initialize Google Drive:", error.message);
    throw new Error("Google Drive initialization failed. Check your service account credentials.");
  }
};

/**
 * Upload a file to Google Drive
 * @param {string} filePath - Local file path to upload
 * @param {string} fileName - Name for the file in Google Drive
 * @param {string} mimeType - MIME type of the file
 * @param {string} category - Category of file (resume, payment, etc.)
 * @returns {Promise<Object>} Object containing file ID and URLs
 */
export async function uploadToDrive(filePath, fileName, mimeType, category = "other") {
  try {
    const drive = initDrive();
    
    // Determine folder ID based on category or use default
    const folderId = process.env.DRIVE_FOLDER_ID;
    
    if (!folderId) {
      throw new Error("DRIVE_FOLDER_ID environment variable is not set");
    }

    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };

    const media = {
      mimeType,
      body: fs.createReadStream(filePath),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id, webViewLink, webContentLink",
      supportsAllDrives: true,
    });

    // Make the file accessible (optional - comment out if you want private files)
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
      supportsAllDrives: true,
    });

    // Get the direct download link
    const file = await drive.files.get({
      fileId: response.data.id,
      fields: "id, webViewLink, webContentLink",
      supportsAllDrives: true,
    });

    return {
      fileId: file.data.id,
      webViewLink: file.data.webViewLink,
      webContentLink: file.data.webContentLink,
      // Direct download link that works better for resumes and images
      directLink: `https://drive.google.com/uc?export=download&id=${file.data.id}`,
      // Preview link for images
      previewLink: `https://drive.google.com/file/d/${file.data.id}/view`,
    };
  } catch (error) {
    console.error("Error uploading to Google Drive:", error.message);
    throw new Error(`Failed to upload file to Google Drive: ${error.message}`);
  }
}

/**
 * Upload a file buffer directly to Google Drive (without saving to disk first)
 * @param {Buffer} buffer - File buffer
 * @param {string} fileName - Name for the file in Google Drive
 * @param {string} mimeType - MIME type of the file
 * @param {string} category - Category of file (resume, payment, etc.)
 * @returns {Promise<Object>} Object containing file ID and URLs
 */
export async function uploadBufferToDrive(buffer, fileName, mimeType, category = "other") {
  try {
    const drive = initDrive();
    
    const folderId = process.env.DRIVE_FOLDER_ID;
    
    if (!folderId) {
      throw new Error("DRIVE_FOLDER_ID environment variable is not set");
    }

    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };

    const bufferStream = new Readable();
    bufferStream.push(buffer);
    bufferStream.push(null);

    const media = {
      mimeType,
      body: bufferStream,
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id, webViewLink, webContentLink",
      supportsAllDrives: true,
    });

    // Make the file accessible
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
      supportsAllDrives: true,
    });

    const file = await drive.files.get({
      fileId: response.data.id,
      fields: "id, webViewLink, webContentLink",
      supportsAllDrives: true,
    });

    return {
      fileId: file.data.id,
      webViewLink: file.data.webViewLink,
      webContentLink: file.data.webContentLink,
      directLink: `https://drive.google.com/uc?export=download&id=${file.data.id}`,
      previewLink: `https://drive.google.com/file/d/${file.data.id}/view`,
    };
  } catch (error) {
    console.error("Error uploading buffer to Google Drive:", error.message);
    throw new Error(`Failed to upload file to Google Drive: ${error.message}`);
  }
}

/**
 * Delete a file from Google Drive
 * @param {string} fileId - Google Drive file ID
 * @returns {Promise<void>}
 */
export async function deleteFromDrive(fileId) {
  try {
    const drive = initDrive();
    await drive.files.delete({
      fileId,
      supportsAllDrives: true,
    });
  } catch (error) {
    console.error("Error deleting from Google Drive:", error.message);
    throw new Error(`Failed to delete file from Google Drive: ${error.message}`);
  }
}
