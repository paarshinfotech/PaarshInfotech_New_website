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

    // Validate and handle image uploads if present
    if (mediaData.imageBase64) {
      // Validate base64 string
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
    if (type === "event" && mediaData.imagesBase64) {
      if (!Array.isArray(mediaData.imagesBase64)) {
        throw new Error("imagesBase64 must be an array");
      }
      
      // Ensure imageAlts array exists and has the same length
      if (!mediaData.imageAlts || !Array.isArray(mediaData.imageAlts)) {
        mediaData.imageAlts = mediaData.imagesBase64.map((_, index) => `Event image ${index + 1}`);
      }
      
      const uploadPromises = mediaData.imagesBase64.map((base64, index) => {
        // Validate each base64 string
        if (!base64.match(/^data:image\/(png|jpeg|jpg);base64,/)) {
          throw new Error(`Invalid image format for gallery image ${index}. Only PNG or JPEG allowed.`);
        }
        return uploadBase64(base64, `${type}-image-gallery-${index}`);
      });
      
      const imageUrls = await Promise.all(uploadPromises);
      if (imageUrls.some(url => !url )) {
        throw new Error("Failed to upload one or more gallery images or invalid image URL");
      }
      
      // Transform imageUrls to match embedded document schema with alt and imageUrl
      mediaData.images = imageUrls.map((url, index) => ({
        imageUrl: url,
        alt: mediaData.imageAlts[index] || `Event image ${index + 1}`
      }));
      
      delete mediaData.imagesBase64;
      delete mediaData.imageAlts;
    }


    // Set order to highest current order + 1 if applicable
    if (type !== 'spotlight') {
      const maxOrder = await Model.find().sort({ order: -1 }).limit(1);
      const newOrder = maxOrder.length > 0 ? maxOrder[0].order + 1 : 0;
      mediaData.order = newOrder;
    }

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
      JSON.stringify({ error: `Failed to create media item: ${error.message}` }),
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
      // Validate base64 string
      if (!updateData.imageBase64.match(/^data:image\/(png|jpeg|jpg);base64,/)) {
        throw new Error("Invalid image format. Only PNG or JPEG allowed.");
      }
      
      const oldItem = await Model.findById(_id);
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

    // Handle multiple images for event recaps
    if (type === "event" && updateData.imagesBase64) {
      if (!Array.isArray(updateData.imagesBase64)) {
        throw new Error("imagesBase64 must be an array");
      }
      
      const oldItem = await Model.findById(_id);
      if (oldItem?.images) {
        // Delete old images - fix: access imageUrl property correctly
        await Promise.all(oldItem.images.map(img => deleteFile(img.imageUrl || img.url)));
      }
      
      // Ensure imageAlts array exists and has the same length
      if (!updateData.imageAlts || !Array.isArray(updateData.imageAlts)) {
        updateData.imageAlts = updateData.imagesBase64.map((_, index) => `Event image ${index + 1}`);
      }
      
      const uploadPromises = updateData.imagesBase64.map((base64, index) => {
        // Validate each base64 string
        if (!base64.match(/^data:image\/(png|jpeg|jpg);base64,/)) {
          throw new Error(`Invalid image format for gallery image ${index}. Only PNG or JPEG allowed.`);
        }
        return uploadBase64(base64, `${type}-image-gallery-${index}`);
      });
      
      const imageUrls = await Promise.all(uploadPromises);
      if (imageUrls.some(url => !url || !url.startsWith('/uploads/'))) {
        throw new Error("Failed to upload one or more gallery images or invalid image URL");
      }
      
      // Transform imageUrls to match embedded document schema with alt and imageUrl
      updateData.images = imageUrls.map((url, index) => ({
        imageUrl: url,
        alt: updateData.imageAlts[index] || `Event image ${index + 1}`
      }));
      
      delete updateData.imagesBase64;
      delete updateData.imageAlts;
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
      JSON.stringify({ error: `Failed to update media item: ${error.message}` }),
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
    if (item.images && Array.isArray(item.images)) {
      // Fix: access imageUrl property correctly from embedded documents
      await Promise.all(item.images.map(img => deleteFile(img.imageUrl || img.url)));
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