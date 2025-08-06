
import _db from "../../../lib/utils/db";
import { uploadBase64, deleteFile } from "../../../lib/utils/upload";
import {
  GalleryItem,
  SliderImage,
  BtsItem,
  EventRecap,
  EmployeeSpotlight,
} from "../../../../models/Media.model";
import { NextResponse } from 'next/server';

// Establish MongoDB connection
_db();

// Helper function to get model by type
function getModelByType(type) {
  switch (type) {
    case "gallery":
      return GalleryItem;
    case "slider":
      return SliderImage;
    case "bts":
      return BtsItem;
    case "event":
      return EventRecap;
    case "spotlight":
      return EmployeeSpotlight;
    default:
      throw new Error("Invalid media type");
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (!type) {
      return new Response(
        JSON.stringify({ error: "Media type is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const Model = getModelByType(type);
    const items = await Model.find().sort({ order: 1 }).lean();

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching media items:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch media items" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { type, ...mediaData } = data;

    if (!type) {
      return new Response(
        JSON.stringify({ error: "Media type is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const Model = getModelByType(type);

    // Validate and handle image uploads if present
    if (mediaData.imageBase64) {
      if (!mediaData.imageBase64.match(/^data:image\/(png|jpeg|jpg);base64,/)) {
        throw new Error("Invalid image format. Only PNG or JPEG allowed.");
      }
      const imageUrl = await uploadBase64(mediaData.imageBase64, `${type}-image`);
      if (!imageUrl) {
        throw new Error("Failed to upload image or invalid image URL");
      }
      mediaData.imageUrl = imageUrl;
      delete mediaData.imageBase64;
    }

    // Handle multiple images for event recaps
    if (type === "event" && mediaData.images) {
      if (!Array.isArray(mediaData.images)) {
        throw new Error("imagesBase64 must be an array");
      }
      
      const uploadPromises = mediaData.images.map(async (img, index) => {
        if (img.image) { // This is a base64 string for new images
          if (!img.image.match(/^data:image\/(png|jpeg|jpg);base64,/)) {
            throw new Error(`Invalid image format for gallery image ${index}. Only PNG or JPEG allowed.`);
          }
          const imageUrl = await uploadBase64(img.image, `${type}-image-gallery-${index}`);
          if (!imageUrl) {
            throw new Error("Failed to upload one or more gallery images or invalid image URL");
          }
          return { ...img, imageUrl, image: undefined };
        }
        return img;
      });
      
      mediaData.images = await Promise.all(uploadPromises);
    }

    if (type !== 'spotlight') {
      const maxOrder = await Model.find().sort({ order: -1 }).limit(1);
      const newOrder = maxOrder.length > 0 ? maxOrder[0].order + 1 : 0;
      mediaData.order = newOrder;
    }

    const newItem = new Model(mediaData);
    await newItem.save();

    return NextResponse.json({
        message: "Media item created successfully",
        data: newItem,
      }, { status: 201 });
  } catch (error) {
    console.error("Error creating media item:", error);
    return NextResponse.json({ error: `Failed to create media item: ${error.message}` }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { type, _id, ...updateData } = data;

    if (!type || !_id) {
      return NextResponse.json({ error: "Media type and _id are required" }, { status: 400 });
    }

    const Model = getModelByType(type);
    const oldItem = await Model.findById(_id);

    if (updateData.imageBase64) {
      if (!updateData.imageBase64.match(/^data:image\/(png|jpeg|jpg);base64,/)) {
        throw new Error("Invalid image format. Only PNG or JPEG allowed.");
      }
      if (oldItem?.imageUrl) {
        await deleteFile(oldItem.imageUrl);
      }
      const imageUrl = await uploadBase64(updateData.imageBase64, `${type}-image`);
      if (!imageUrl) {
        throw new Error("Failed to upload image or invalid image URL");
      }
      updateData.imageUrl = imageUrl;
      delete updateData.imageBase64;
    }

    if (type === "event" && updateData.images) {
      if (!Array.isArray(updateData.images)) {
        throw new Error("images must be an array");
      }
      
      const newImageUrls = new Set();
      const uploadPromises = updateData.images.map(async (img, index) => {
        if (img.image) {
          if (!img.image.match(/^data:image\/(png|jpeg|jpg);base64,/)) {
            throw new Error(`Invalid image format for gallery image ${index}.`);
          }
          const imageUrl = await uploadBase64(img.image, `${type}-gallery-image-${Date.now()}`);
          newImageUrls.add(imageUrl);
          return { alt: img.alt, hint: img.hint, imageUrl };
        }
        if (img.imageUrl) {
          newImageUrls.add(img.imageUrl);
        }
        return img;
      });

      updateData.images = await Promise.all(uploadPromises);
      
      // Delete old images that are no longer in the gallery
      if (oldItem?.images) {
        for (const oldImage of oldItem.images) {
          if (!newImageUrls.has(oldImage.imageUrl)) {
            await deleteFile(oldImage.imageUrl);
          }
        }
      }
    }

    const updatedItem = await Model.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return NextResponse.json({ error: "Media item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Media item updated successfully", data: updatedItem }, { status: 200 });
  } catch (error) {
    console.error("Error updating media item:", error);
    return NextResponse.json({ error: `Failed to update media item: ${error.message}` }, { status: 500 });
  }
}


export async function DELETE(request) {
  try {
    const data = await request.json();
    const { type, _id } = data;

    if (!type || !_id) {
      return new Response(
        JSON.stringify({ error: "Media type and _id are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const Model = getModelByType(type);
    const item = await Model.findById(_id);
    if (!item) {
      return new Response(
        JSON.stringify({ error: "Media item not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    if (item.imageUrl) {
      await deleteFile(item.imageUrl);
    }
    if (item.images && Array.isArray(item.images)) {
      await Promise.all(item.images.map(img => deleteFile(img.imageUrl)));
    }

    await Model.findByIdAndDelete(_id);

    return new Response(
      JSON.stringify({ message: "Media item deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting media item:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete media item" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PATCH(request) {
  try {
    const data = await request.json();
    const { type, items } = data;

    if (!type || !Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Media type and items array are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const Model = getModelByType(type);
    const updatePromises = items.map(({ _id, order }) =>
      Model.findByIdAndUpdate(_id, { order }, { new: true, runValidators: true })
    );
    const updatedItems = await Promise.all(updatePromises);

    if (updatedItems.some((item) => !item)) {
      return new Response(
        JSON.stringify({ error: "One or more items not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return NextResponse.json({
        message: "Media items reordered successfully",
        data: updatedItems,
      }, { status: 200 });
  } catch (error) {
    console.error("Error reordering media items:", error);
    return NextResponse.json({ error: "Failed to reorder media items" }, { status: 500 });
  }
}
