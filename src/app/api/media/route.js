import _db from "../../../lib/utils/db";
import { uploadBase64, deleteFile } from "../../../lib/utils/upload";
import {
  GalleryItem,
  SliderImage,
  BtsItem,
  EventRecap,
  EmployeeSpotlight,
} from "../../../../models/Media.model";

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

    return new Response(JSON.stringify(items), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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

    // Handle image uploads if present
    if (mediaData.imageBase64) {
      const imageUrl = await uploadBase64(mediaData.imageBase64, `${type}-image`);
      if (!imageUrl) {
        throw new Error("Failed to upload image");
      }
      mediaData.imageUrl = imageUrl;
      delete mediaData.imageBase64;
    }

    // Handle multiple images for event recaps
    if (type === "event" && mediaData.imagesBase64) {
      const uploadPromises = mediaData.imagesBase64.map((base64, index) =>
        uploadBase64(base64, `${type}-image-${index}`)
      );
      const imageUrls = await Promise.all(uploadPromises);
      if (imageUrls.some(url => !url)) {
        throw new Error("Failed to upload one or more images");
      }
      mediaData.images = imageUrls;
      delete mediaData.imagesBase64;
    }

    // Set order to highest current order + 1
    const maxOrder = await Model.find().sort({ order: -1 }).limit(1);
    const newOrder = maxOrder.length > 0 ? maxOrder[0].order + 1 : 0;
    mediaData.order = newOrder;

    const newItem = new Model(mediaData);
    await newItem.save();

    return new Response(
      JSON.stringify({
        message: "Media item created successfully",
        data: newItem,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating media item:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create media item" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { type, _id, ...updateData } = data;

    if (!type || !_id) {
      return new Response(
        JSON.stringify({ error: "Media type and _id are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const Model = getModelByType(type);

    // Handle image update if present
    if (updateData.imageBase64) {
      const imageUrl = await uploadBase64(updateData.imageBase64, `${type}-image`);
      if (!imageUrl) {
        throw new Error("Failed to upload image");
      }
      updateData.imageUrl = imageUrl;
      delete updateData.imageBase64;

      // Delete old image
      const oldItem = await Model.findById(_id);
      if (oldItem?.imageUrl) {
        await deleteFile(oldItem.imageUrl);
      }
    }

    // Handle multiple images for event recaps
    if (type === "event" && updateData.imagesBase64) {
      const uploadPromises = updateData.imagesBase64.map((base64, index) =>
        uploadBase64(base64, `${type}-image-${index}`)
      );
      const imageUrls = await Promise.all(uploadPromises);
      if (imageUrls.some(url => !url)) {
        throw new Error("Failed to upload one or more images");
      }
      updateData.images = imageUrls;
      delete updateData.imagesBase64;

      // Delete old images
      const oldItem = await Model.findById(_id);
      if (oldItem?.images) {
        await Promise.all(oldItem.images.map(url => deleteFile(url)));
      }
    }

    const updatedItem = await Model.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return new Response(
        JSON.stringify({ error: "Media item not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Media item updated successfully",
        data: updatedItem,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating media item:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update media item" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
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

    // Get item before deletion to access file URLs
    const item = await Model.findById(_id);
    if (!item) {
      return new Response(
        JSON.stringify({ error: "Media item not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Delete associated files
    if (item.imageUrl) {
      await deleteFile(item.imageUrl);
    }
    if (item.images) {
      await Promise.all(item.images.map(url => deleteFile(url)));
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

    // Update order for each item
    const updatePromises = items.map(({ _id, order }) =>
      Model.findByIdAndUpdate(
        _id,
        { order },
        { new: true, runValidators: true }
      )
    );

    const updatedItems = await Promise.all(updatePromises);

    if (updatedItems.some((item) => !item)) {
      return new Response(
        JSON.stringify({ error: "One or more items not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Media items reordered successfully",
        data: updatedItems,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error reordering media items:", error);
    return new Response(
      JSON.stringify({ error: "Failed to reorder media items" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
} 