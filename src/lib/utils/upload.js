import path from "path";
import fs from "fs";

// Auto-detect environment
const IS_PRODUCTION = process.env.NODE_ENV === "production";

// Define upload directories
const LOCAL_UPLOAD_DIR = path.join(process.cwd(), "public/uploads");
const VPS_UPLOAD_DIR = "/root/Paarsh-Infotech/uploads";

// Define base URLs
const LOCAL_BASE_URL = "/uploads/";
const VPS_BASE_URL = "https://paarshinfotech.com/Paarsh-Infotech/uploads/";

// Automatically pick the right config based on environment
const UPLOAD_DIR = IS_PRODUCTION ? VPS_UPLOAD_DIR : LOCAL_UPLOAD_DIR;
const BASE_URL   = IS_PRODUCTION ? VPS_BASE_URL   : LOCAL_BASE_URL;

// Ensure the upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

/**
 * Maps common MIME types to correct file extensions.
 */
const MIME_TO_EXT = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
    'video/mp4': 'mp4',
    'video/webm': 'webm',
    'audio/mpeg': 'mp3',
    'audio/wav': 'wav',
    'text/plain': 'txt',
    'application/zip': 'zip',
};

/**
 * Uploads a file and returns its URL.
 * @param {Buffer} buffer - The file buffer
 * @param {string} fileName - Name for the uploaded file (without extension)
 * @param {string} mimeType - The file's MIME type
 * @param {string} [originalExtension] - Original file extension (e.g. 'docx') - preferred over MIME lookup
 * @returns {Promise<string|null>} - Public URL of the uploaded file or null on failure
 */
export async function uploadFile(buffer, fileName, mimeType, originalExtension) {
    try {
        // Prefer the original extension from the filename, then MIME map, then fallback
        const extension = originalExtension
            || MIME_TO_EXT[mimeType]
            || mimeType.split('/').pop().split(';')[0]
            || 'bin';
        
        // Generate a unique file name (fileName already contains timestamp)
        const fullFileName = `${fileName}.${extension}`;
        const filePath = path.join(UPLOAD_DIR, fullFileName);
        
        // Save the file
        fs.writeFileSync(filePath, buffer);
        
        console.log(`File saved: ${filePath}`);
        
        // Return the public URL of the uploaded file
        return `${BASE_URL}${fullFileName}`;
    } catch (error) {
        console.error("File upload error:", error);
        return null;
    }
}

/**
 * Uploads a base64 encoded file
 * @param {string} base64String - Base64 encoded file data
 * @param {string} fileName - Name for the uploaded file (without extension)
 * @returns {Promise<string|null>} - Public URL of the uploaded file or null on failure
 */
export async function uploadBase64(base64String, fileName) {
    try {
        // Validate Base64 format
        const match = base64String.match(/^data:(.*?);base64,(.*)$/);
        if (!match) {
            console.error("Invalid Base64 format.");
            return null;
        }
        
        const fileType = match[1]; // Example: video/mp4, image/png
        const base64Data = match[2];
        
        // Get file extension
        const extension = fileType.split("/")[1];
        
        // Generate a unique file name
        const fullFileName = `${Date.now()}-${fileName}.${extension}`;
        const filePath = path.join(UPLOAD_DIR, fullFileName);
        
        // Convert Base64 to buffer and save the file
        const buffer = Buffer.from(base64Data, "base64");
        fs.writeFileSync(filePath, buffer);
        
        console.log(`File saved: ${filePath}`);
        
        // Return the public URL of the uploaded file
        return `${BASE_URL}${fullFileName}`;
    } catch (error) {
        console.error("File upload error:", error);
        return null;
    }
}

/**
 * Deletes a file from the upload directory
 * @param {string} fileUrl - The URL of the file to delete
 * @returns {Promise<boolean>} - True if deletion was successful
 */
export async function deleteFile(fileUrl) {
    try {
        // Extract filename from URL
        const fileName = fileUrl.split('/').pop();
        const filePath = path.join(UPLOAD_DIR, fileName);
        
        // Check if file exists
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`File deleted: ${filePath}`);
            return true;
        }
        return false;
    } catch (error) {
        console.error("File deletion error:", error);
        return false;
    }
} 