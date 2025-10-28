# Google Drive Integration - Quick Reference

## Files Modified/Created

### 1. Created: `src/lib/utils/googleDrive.js`
Utility functions for Google Drive operations:
- `uploadBufferToDrive()` - Upload file buffer directly to Drive
- `uploadToDrive()` - Upload file from local path to Drive
- `deleteFromDrive()` - Delete file from Drive

### 2. Modified: `src/app/api/upload/route.js`
Updated to use Google Drive instead of local file storage:
- Files now uploaded to Google Drive
- Returns Drive links instead of local paths
- Stores Drive file metadata in database

### 3. Modified: `models/File.model.js`
Added Google Drive specific fields:
- `driveFileId` - Unique Drive file identifier
- `driveWebViewLink` - Link to view file in Drive
- `driveWebContentLink` - Direct download link
- `drivePreviewLink` - Preview link

### 4. Created: `.env.example`
Environment variables template with Google Drive configuration

### 5. Created: `docs/GOOGLE_DRIVE_SETUP.md`
Complete setup guide for Google Drive integration

## Required Environment Variables

```env
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
DRIVE_FOLDER_ID=your_folder_id
```

## Service Account Details

- **Email**: paarsh-infotech-registration@serious-flight-475206-s4.iam.gserviceaccount.com
- **Project**: serious-flight-475206-s4
- **Folder**: InternshipUploads

## API Response Format

When a file is uploaded, the API returns:

```json
{
  "success": true,
  "data": {
    "url": "https://drive.google.com/uc?export=download&id=FILE_ID",
    "previewLink": "https://drive.google.com/file/d/FILE_ID/view",
    "webViewLink": "https://drive.google.com/file/d/FILE_ID/view",
    "fileName": "resume_1234567890_abc123.pdf",
    "fileId": "mongodb_document_id",
    "driveFileId": "google_drive_file_id"
  }
}
```

## Usage in Frontend

The registration form already sends files to `/api/upload` with the correct category:

```javascript
// For resume
const formData = new FormData();
formData.append('file', resumeFile);
formData.append('category', 'resume');

// For payment
const formData = new FormData();
formData.append('file', paymentFile);
formData.append('category', 'payment');
```

No changes needed in the frontend - it works automatically!

## Next Steps

1. ✅ Install googleapis package
2. ✅ Create Google Drive utility
3. ✅ Update upload API
4. ✅ Update File model
5. ⏳ Add environment variables to .env.local
6. ⏳ Share Drive folder with service account
7. ⏳ Enable Google Drive API in Google Cloud Console
8. ⏳ Test uploads

## Testing Checklist

- [ ] Environment variables are set correctly
- [ ] Service account has access to Drive folder
- [ ] Google Drive API is enabled
- [ ] Test resume upload
- [ ] Test payment screenshot upload
- [ ] Verify files appear in Drive folder
- [ ] Verify file links work correctly
- [ ] Check database records include Drive metadata

## Important Notes

⚠️ **Security**: Never commit `.env.local` or service account keys to Git!

⚠️ **Permissions**: The service account needs "Editor" access to the Drive folder

⚠️ **Public Access**: Files are automatically set to public (anyone with link can view)

⚠️ **Cleanup**: Old local files in `public/resumes` and `public/payments` are no longer used
