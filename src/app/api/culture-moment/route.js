import _db from "../../../lib/utils/db";
import { uploadBase64, deleteFile } from "../../../lib/utils/upload";
import CultureMomentModel from "../../../../models/CultureMoment.model";
import path from "path";

// Establish MongoDB connection
_db();

const CULTURE_DIR = "culture"; // For upload path and file naming

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const activeOnly = url.searchParams.get("activeOnly") === "true";
    let query = CultureMomentModel.find();
    if (activeOnly) query = query.where({ isActive: true });
    query = query.sort({ order: 1 });
    const items = await query.lean();
    return new Response(JSON.stringify(items), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching culture moments:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch culture moments" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { imageBase64, alt, order, isActive } = data;
    if (!imageBase64 || !alt || order === undefined) {
      return new Response(
        JSON.stringify({ error: "Image, alt text, and order are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    // Upload image to /uploads/culture/
    const imageUrl = await uploadBase64(imageBase64, `${CULTURE_DIR}-${Date.now()}`);
    if (!imageUrl) throw new Error("Failed to upload image");
    const newMoment = new CultureMomentModel({
      imageUrl,
      alt,
      order,
      isActive: isActive ?? true,
    });
    await newMoment.save();
    return new Response(
      JSON.stringify({ message: "Culture moment created", data: newMoment }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating culture moment:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create culture moment" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { _id, imageBase64, alt, order, isActive } = data;
    if (!_id || !alt || order === undefined) {
      return new Response(
        JSON.stringify({ error: "ID, alt text, and order are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const updateData = { alt, order, isActive: isActive ?? true };
    if (imageBase64) {
      // Upload new image
      const imageUrl = await uploadBase64(imageBase64, `${CULTURE_DIR}-${Date.now()}`);
      if (!imageUrl) throw new Error("Failed to upload image");
      updateData.imageUrl = imageUrl;
      // Delete old image
      const oldItem = await CultureMomentModel.findById(_id);
      if (oldItem?.imageUrl) await deleteFile(oldItem.imageUrl);
    }
    const updated = await CultureMomentModel.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    if (!updated) {
      return new Response(
        JSON.stringify({ error: "Culture moment not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ message: "Culture moment updated", data: updated }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating culture moment:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update culture moment" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(request) {
  try {
    const data = await request.json();
    const { _id } = data;
    if (!_id) {
      return new Response(
        JSON.stringify({ error: "ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const item = await CultureMomentModel.findById(_id);
    if (!item) {
      return new Response(
        JSON.stringify({ error: "Culture moment not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    if (item.imageUrl) await deleteFile(item.imageUrl);
    await CultureMomentModel.findByIdAndDelete(_id);
    return new Response(
      JSON.stringify({ message: "Culture moment deleted" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting culture moment:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete culture moment" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PATCH(request) {
  try {
    const data = await request.json();
    const { moments } = data;
    if (!moments || !Array.isArray(moments)) {
      return new Response(
        JSON.stringify({ error: "Moments array is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    // Two-step update to avoid duplicate key errors
    for (const moment of moments) {
      await CultureMomentModel.findByIdAndUpdate(
        moment._id,
        { order: -(moment.order + 1000) },
        { new: true }
      );
    }
    for (const moment of moments) {
      await CultureMomentModel.findByIdAndUpdate(
        moment._id,
        { order: moment.order },
        { new: true }
      );
    }
    return new Response(
      JSON.stringify({ message: "Culture moments reordered successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error reordering culture moments:", error);
    return new Response(
      JSON.stringify({ error: "Failed to reorder culture moments" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
} 