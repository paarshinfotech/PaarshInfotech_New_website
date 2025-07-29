import _db from "../../../lib/utils/db";
import { uploadBase64, deleteFile } from "../../../lib/utils/upload";
import CareerImageModel from "../../../../models/CareerImage.model";
import { NextResponse } from "next/server";

_db();

const CAREER_DIR = "career-images";

export async function GET() {
  try {
    const items = await CareerImageModel.find().sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error) {
    console.error("Error fetching career images:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch career images" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { imageBase64, alt, hint, order } = data;
    if (!imageBase64 || !alt || order === undefined) {
      return NextResponse.json({ success: false, error: "Image, alt text, and order are required" }, { status: 400 });
    }
    const imageUrl = await uploadBase64(imageBase64, `${CAREER_DIR}-${Date.now()}`);
    if (!imageUrl) throw new Error("Failed to upload image");
    const newItem = new CareerImageModel({ imageUrl, alt, hint, order });
    await newItem.save();
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    console.error("Error creating career image:", error);
    return NextResponse.json({ success: false, error: "Failed to create career image" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { _id, imageBase64, alt, hint, order } = data;
    if (!_id || !alt || order === undefined) {
      return NextResponse.json({ success: false, error: "ID, alt text, and order are required" }, { status: 400 });
    }
    const updateData = { alt, hint, order };
    if (imageBase64) {
      const oldItem = await CareerImageModel.findById(_id);
      if (oldItem?.imageUrl) await deleteFile(oldItem.imageUrl);
      const imageUrl = await uploadBase64(imageBase64, `${CAREER_DIR}-${Date.now()}`);
      if (!imageUrl) throw new Error("Failed to upload image");
      updateData.imageUrl = imageUrl;
    }
    const updated = await CareerImageModel.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    if (!updated) {
      return NextResponse.json({ success: false, error: "Image not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    console.error("Error updating career image:", error);
    return NextResponse.json({ success: false, error: "Failed to update career image" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { _id } = await request.json();
    if (!_id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    const item = await CareerImageModel.findById(_id);
    if (!item) return NextResponse.json({ success: false, error: "Image not found" }, { status: 404 });
    if (item.imageUrl) await deleteFile(item.imageUrl);
    await CareerImageModel.findByIdAndDelete(_id);
    return NextResponse.json({ success: true, message: "Image deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting career image:", error);
    return NextResponse.json({ success: false, error: "Failed to delete career image" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { images } = await request.json();
    if (!images || !Array.isArray(images)) {
      return NextResponse.json({ success: false, error: "Images array is required" }, { status: 400 });
    }
    for (const item of images) {
      await CareerImageModel.findByIdAndUpdate(item._id, { order: item.order });
    }
    return NextResponse.json({ success: true, message: "Images reordered successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error reordering career images:", error);
    return NextResponse.json({ success: false, error: "Failed to reorder career images" }, { status: 500 });
  }
}
