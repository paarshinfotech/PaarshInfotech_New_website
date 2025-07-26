import { NextResponse } from "next/server";
import _db from "../../../lib/utils/db";
import ECGalleryItemModel from "../../../../models/ECGalleryItem.model";
import { uploadBase64, deleteFile } from "../../../lib/utils/upload";

await _db();

const GALLERY_DIR = "ec-gallery";

export async function GET() {
  try {
    const items = await ECGalleryItemModel.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch gallery items" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { imageBase64, ...body } = await request.json();
    if (imageBase64) {
      const imageUrl = await uploadBase64(imageBase64, `${GALLERY_DIR}-${Date.now()}`);
      body.imageUrl = imageUrl;
    }
    const maxOrder = await ECGalleryItemModel.find().sort({ order: -1 }).limit(1);
    body.order = maxOrder.length > 0 ? maxOrder[0].order + 10 : 10;
    
    const newItem = new ECGalleryItemModel(body);
    await newItem.save();
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create gallery item" }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const { _id, imageBase64, ...updateData } = await request.json();
    if (imageBase64) {
      const oldItem = await ECGalleryItemModel.findById(_id);
      if (oldItem?.imageUrl) await deleteFile(oldItem.imageUrl);
      const imageUrl = await uploadBase64(imageBase64, `${GALLERY_DIR}-${Date.now()}`);
      updateData.imageUrl = imageUrl;
    }
    const updatedItem = await ECGalleryItemModel.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    if (!updatedItem) {
      return NextResponse.json({ success: false, error: "Gallery item not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedItem }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update gallery item" }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const { _id } = await request.json();
    const itemToDelete = await ECGalleryItemModel.findById(_id);
    if (!itemToDelete) {
      return NextResponse.json({ success: false, error: "Gallery item not found" }, { status: 404 });
    }
    if (itemToDelete.imageUrl) await deleteFile(itemToDelete.imageUrl);
    await ECGalleryItemModel.findByIdAndDelete(_id);
    return NextResponse.json({ success: true, message: "Gallery item deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete gallery item" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { items } = await request.json();
    const updatePromises = items.map(p => 
      ECGalleryItemModel.findByIdAndUpdate(p._id, { order: p.order })
    );
    await Promise.all(updatePromises);
    return NextResponse.json({ success: true, message: "Gallery items reordered" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to reorder gallery items" }, { status: 500 });
  }
}
