# Google Drive Integration Setup Guide

This guide will help you set up Google Drive integration for storing resumes and payment screenshots.

## Prerequisites

- Google Cloud Project
- Service Account created
- Google Drive folder ready

## Step 1: Get Your Service Account Key

You already have the service account email:
```
paarsh-infotech-registration@serious-flight-475206-s4.iam.gserviceaccount.com
```

To get the full service account key JSON:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: `serious-flight-475206-s4`
3. Navigate to **IAM & Admin** > **Service Accounts**
4. Find the service account: `paarsh-infotech-registration@serious-flight-475206-s4.iam.gserviceaccount.com`
5. Click on the service account
6. Go to the **Keys** tab
7. Click **Add Key** > **Create new key**
8. Choose **JSON** format
9. Download the key file

The downloaded JSON will look like this:
```json
{
  "type": "service_account",
  "project_id": "serious-flight-475206-s4",
  "private_key_id": "xxxxx...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nxxxxx...\n-----END PRIVATE KEY-----\n",
  "client_email": "paarsh-infotech-registration@serious-flight-475206-s4.iam.gserviceaccount.com",
  "client_id": "xxxxx...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "xxxxx..."
}
```

## Step 2: Set Up Google Drive Folder

1. Create or locate your folder named **InternshipUploads** in Google Drive
2. Right-click the folder and select **Share**
3. Add the service account email:
   ```
   paarsh-infotech-registration@serious-flight-475206-s4.iam.gserviceaccount.com
   ```
4. Give it **Editor** permissions
5. Get the Folder ID from the URL:
   - Open the folder in Google Drive
   - The URL will look like: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`
   - Copy the `FOLDER_ID_HERE` part

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in your project root (or update your existing `.env` file)
2. Add the following variables:

```env
# Google Drive Integration
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"serious-flight-475206-s4",...}
DRIVE_FOLDER_ID=your_folder_id_here
```

**Important Notes:**
- For `GOOGLE_SERVICE_ACCOUNT_KEY`: Copy the ENTIRE JSON content from the downloaded key file and paste it as a single line (no line breaks)
- For `DRIVE_FOLDER_ID`: Paste the folder ID you copied from the Drive URL

### Example:

```env
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"serious-flight-475206-s4","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n","client_email":"paarsh-infotech-registration@serious-flight-475206-s4.iam.gserviceaccount.com","client_id":"123456789","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/oauth2/v1/x509/paarsh-infotech-registration%40serious-flight-475206-s4.iam.gserviceaccount.com"}

DRIVE_FOLDER_ID=1aBcDeFgHiJkLmNoPqRsTuVwXyZ
```

## Step 4: Enable Google Drive API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: `serious-flight-475206-s4`
3. Navigate to **APIs & Services** > **Library**
4. Search for "Google Drive API"
5. Click on it and press **Enable** (if not already enabled)

## Step 5: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the registration page
3. Try uploading a test resume or payment screenshot
4. Check your Google Drive folder to verify the file was uploaded

## Troubleshooting

### Error: "Google Drive initialization failed"
- Check that `GOOGLE_SERVICE_ACCOUNT_KEY` is properly formatted JSON
- Ensure there are no extra quotes or escape characters

### Error: "DRIVE_FOLDER_ID environment variable is not set"
- Make sure you've added the folder ID to your `.env.local` file
- Restart your development server after adding environment variables

### Error: "Permission denied"
- Verify that the service account email has been added to the Drive folder with Editor permissions
- Double-check the folder ID is correct

### Files upload but return 404 when accessed
- This means the permission settings aren't correct
- The files are set to "anyone with the link can view" automatically
- If this doesn't work, manually share the InternshipUploads folder as "Anyone with the link can view"

## How It Works

1. **Upload Flow:**
   - User uploads a file through the registration form
   - File is sent to `/api/upload` endpoint
   - File is uploaded directly to Google Drive
   - File metadata (including Drive file ID and links) is stored in MongoDB
   - User receives a direct download link

2. **File Storage:**
   - All files are stored in the "InternshipUploads" folder
   - Files are named with category prefix: `resume_timestamp_random.pdf`
   - Files are publicly accessible via direct links

3. **File Access:**
   - `directLink`: Direct download link
   - `previewLink`: View file in Google Drive
   - `webViewLink`: Open in Google Drive viewer
   - `webContentLink`: Download link from Google Drive

## Security Considerations

- Service account key should NEVER be committed to version control
- Add `.env.local` to `.gitignore`
- Store production keys in your hosting platform's environment variables (e.g., Vercel, Netlify)
- Consider implementing file size limits and file type restrictions
- Monitor your Google Drive storage quota

## Production Deployment

When deploying to production:

1. Add the same environment variables to your hosting platform
2. Ensure the service account has access to the production Drive folder
3. Test file uploads in production environment
4. Monitor Drive API usage in Google Cloud Console

## Additional Notes

- The integration automatically makes uploaded files publicly accessible
- Files are organized in a single folder (you can modify the code to create subfolders)
- File metadata is stored in MongoDB for easy querying and management
- You can delete files from Drive using the `deleteFromDrive` function in `googleDrive.js`
