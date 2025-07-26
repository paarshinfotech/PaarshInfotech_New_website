import { NextResponse } from "next/server";
import _db from "../../../lib/utils/db";
import AwardModel from "../../../../models/Award.model";

await _db();

export async function GET() {
  try {
    const awards = await AwardModel.find().sort({ year: -1, title: 1 });
    return NextResponse.json({ success: true, data: awards }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch awards" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newAward = new AwardModel(body);
    await newAward.save();
    return NextResponse.json({ success: true, data: newAward }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create award" }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const { _id, ...updateData } = await request.json();
    const updatedAward = await AwardModel.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    if (!updatedAward) {
      return NextResponse.json({ success: false, error: "Award not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedAward }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update award" }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const { _id } = await request.json();
    const deletedAward = await AwardModel.findByIdAndDelete(_id);
    if (!deletedAward) {
      return NextResponse.json({ success: false, error: "Award not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Award deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete award" }, { status: 500 });
  }
}
