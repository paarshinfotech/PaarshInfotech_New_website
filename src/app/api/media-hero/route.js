import { NextResponse } from "next/server";
import _db from "../../../lib/utils/db";
import MediaHeroModel from "../../../../models/MediaHero.model";
import { uploadBase64, deleteFile } from "../../../lib/utils/upload";

// Establish MongoDB connection
_db();

// GET: Retrieve the single media hero image
export async function GET() {
  try {
    const heroImage = await MediaHeroModel.findOne({ page: "media" }).lean();
    return NextResponse.json({ success: true, data: heroImage }, { status: 200 });
  } catch (error) {
    console.error("Error fetching media hero image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch media hero image" },
      { status: 500 }
    );
  }
}

// POST: Create or update the media hero image
export async function POST(request) {
  try {
    const data = await request.json();
    const { alt, hint, imageUrl } = data; // imageUrl is base64

    if (!alt || !imageUrl) {
      return NextResponse.json(
        { success: false, error: "Alt text and image are required" },
        { status: 400 }
      );
    }

    const existingImage = await MediaHeroModel.findOne({ page: "media" });

    // If a new image is uploaded, handle file operations
    let finalImageUrl = existingImage?.imageUrl;
    if (imageUrl && imageUrl.startsWith('data:')) {
      // Delete old image if it exists
      if (existingImage?.imageUrl) {
        await deleteFile(existingImage.imageUrl);
      }
      // Upload new image
      const uploadedUrl = await uploadBase64(imageUrl, "media-hero-banner");
      if (!uploadedUrl) {
        throw new Error("Failed to upload new hero image");
      }
      finalImageUrl = uploadedUrl;
    }

    const updateData = {
      page: "media",
      alt,
      hint: hint || "media page hero",
      imageUrl: finalImageUrl,
    };

    // Use findOneAndUpdate with upsert: true to create or update the document
    const updatedHeroImage = await MediaHeroModel.findOneAndUpdate(
      { page: "media" },
      updateData,
      { new: true, upsert: true, runValidators: true }
    );

    return NextResponse.json(
      {
        message: "Media hero image updated successfully",
        data: updatedHeroImage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating media hero image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update media hero image" },
      { status: 500 }
    );
  }
}
