import { NextResponse } from "next/server";
import _db from "../../../lib/utils/db";
import AwardModel from "../../../../models/Award.model";

await _db();

export async function GET() {
  try {
    const awards = await AwardModel.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: awards }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch awards" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const maxOrder = await AwardModel.find().sort({ order: -1 }).limit(1);
    body.order = maxOrder.length > 0 ? maxOrder[0].order + 10 : 10;
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

export async function PATCH(request) {
    try {
      const { awards } = await request.json();
      const updatePromises = awards.map(p => 
        AwardModel.findByIdAndUpdate(p._id, { order: p.order })
      );
      await Promise.all(updatePromises);
      return NextResponse.json({ success: true, message: "Awards reordered" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: "Failed to reorder awards" }, { status: 500 });
    }
  }
