import { NextResponse } from "next/server";
import _db from "../../../lib/utils/db";
import CenterModel from "../../../../models/Center.model";

await _db();

export async function GET() {
  try {
    const centers = await CenterModel.find().populate('partnerId').sort({ name: 1 });
    return NextResponse.json({ success: true, data: centers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch centers" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newCenter = new CenterModel(body);
    await newCenter.save();
    const populatedCenter = await CenterModel.findById(newCenter._id).populate('partnerId');
    return NextResponse.json({ success: true, data: populatedCenter }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create center" }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const { _id, ...updateData } = await request.json();
    const updatedCenter = await CenterModel.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true }).populate('partnerId');
    if (!updatedCenter) {
      return NextResponse.json({ success: false, error: "Center not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedCenter }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update center" }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const { _id } = await request.json();
    const deletedCenter = await CenterModel.findByIdAndDelete(_id);
    if (!deletedCenter) {
      return NextResponse.json({ success: false, error: "Center not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Center deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete center" }, { status: 500 });
  }
}
