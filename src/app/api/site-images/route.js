
import _db from "../../../lib/utils/db";
import SiteImageModel from "../../../../models/SiteImage.model";
import { uploadBase64, deleteFile } from "../../../lib/utils/upload";


// Establish MongoDB connection
_db();

export async function GET() {
  try {
    const images = await SiteImageModel.find().lean();
    return new Response(JSON.stringify(images), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching site images:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch site images" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { page, section, alt, hint, imageUrl } = data;

    if (!page || !section || !alt || !imageUrl) {
      return new Response(
        JSON.stringify({ error: "Page, section, alt, and imageUrl are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // Upload image
    const uploadedUrl = await uploadBase64(imageUrl, section);
    if (!uploadedUrl) {
      throw new Error("Failed to upload image");
    }

    const newImage = new SiteImageModel({
      page,
      section,
      alt,
      hint: hint || "website image",
      imageUrl: uploadedUrl,
    });
    
    await newImage.save();

    return new Response(
      JSON.stringify({
        message: "Site image created successfully",
        data: newImage,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating site image:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create site image" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


export async function PUT(request) {
  try {
    const data = await request.json();
    const { _id, alt, hint, imageUrl } = data;

    if (!_id || !alt) {
      return new Response(
        JSON.stringify({ error: "_id and alt are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    
    const imageToUpdate = await SiteImageModel.findById(_id);
    if (!imageToUpdate) {
        return new Response(JSON.stringify({ error: "Image not found" }), {
            status: 404, headers: { "Content-Type": "application/json" },
        });
    }

    let finalImageUrl = imageToUpdate.imageUrl;
    // Check if a new image was uploaded (it will be a base64 string)
    if (imageUrl && imageUrl.startsWith('data:')) {
      // Delete old image
      await deleteFile(imageToUpdate.imageUrl);
      // Upload new image
      const newUrl = await uploadBase64(imageUrl, imageToUpdate.section);
      if (!newUrl) {
        throw new Error("Failed to upload new image");
      }
      finalImageUrl = newUrl;
    }

    const updatedImage = await SiteImageModel.findByIdAndUpdate(
      _id,
      { 
        alt,
        hint: hint || "website image",
        imageUrl: finalImageUrl,
      },
      { new: true, runValidators: true }
    );

    return new Response(
      JSON.stringify({
        message: "Site image updated successfully",
        data: updatedImage,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating site image:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update site image" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(request) {
  try {
    const { _id } = await request.json();

    if (!_id) {
      return new Response(JSON.stringify({ error: "_id is required" }), {
        status: 400, headers: { "Content-Type": "application/json" },
      });
    }

    const imageToDelete = await SiteImageModel.findById(_id);
    if (!imageToDelete) {
      return new Response(JSON.stringify({ error: "Image not found" }), {
        status: 404, headers: { "Content-Type": "application/json" },
      });
    }

    // Delete the file from storage
    await deleteFile(imageToDelete.imageUrl);

    // Delete the record from the database
    await SiteImageModel.findByIdAndDelete(_id);
    
    return new Response(
      JSON.stringify({ message: "Site image deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting site image:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete site image" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
