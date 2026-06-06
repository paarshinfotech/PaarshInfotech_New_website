import { NextResponse } from 'next/server';
import _db from '../../../lib/utils/db';
import File from '../../../../models/File.model';
import { uploadFile } from '../../../lib/utils/upload';

await _db();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const category = formData.get('category') || 'other';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate filename based on category + timestamp
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, '-');
    // Use the real file extension from the original filename
    const originalExtension = file.name.split('.').pop()?.toLowerCase() || '';
    const fileNameWithoutExt = `${category}-${timestamp}`;

    // Upload file using the shared upload utility (auto-detects dev vs production)
    const fileUrl = await uploadFile(buffer, fileNameWithoutExt, file.type, originalExtension);

    if (!fileUrl) {
      return NextResponse.json(
        { success: false, error: 'Failed to upload file' },
        { status: 500 }
      );
    }

    // Extract just the filename from the URL for storage
    const fileName = fileUrl.split('/').pop();

    // Save file metadata to database
    const fileRecord = await File.create({
      fileName,
      originalName,
      fileUrl,
      fileType: file.type,
      fileSize: file.size,
      category,
    });

    return NextResponse.json({
      success: true,
      data: {
        url: fileUrl,
        fileName,
        fileId: fileRecord._id,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
