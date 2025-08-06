import { NextResponse } from "next/server";
import _db from "../../../lib/utils/db";
import GalleryCategoryModel from "../../../../models/GalleryCategory.model";

await _db();

export async function GET() {
  try {
    const categories = await GalleryCategoryModel.find().sort({ name: 1 });
    return NextResponse.json({ success: true, data: categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newCategory = new GalleryCategoryModel(body);
    await newCategory.save();
    return NextResponse.json({ success: true, data: newCategory }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create category" }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const { _id, ...updateData } = await request.json();
    const updatedCategory = await GalleryCategoryModel.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    if (!updatedCategory) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedCategory }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update category" }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const { _id } = await request.json();
    const deletedCategory = await GalleryCategoryModel.findByIdAndDelete(_id);
    if (!deletedCategory) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Category deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete category" }, { status: 500 });
  }
}