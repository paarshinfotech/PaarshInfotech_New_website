import { NextResponse } from "next/server";
import _db from "../../../lib/utils/db";
import ECJourneyMilestoneModel from "../../../../models/ECJourneyMilestone.model";

await _db();

export async function GET() {
  try {
    const milestones = await ECJourneyMilestoneModel.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: milestones }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch journey milestones" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const maxOrder = await ECJourneyMilestoneModel.find().sort({ order: -1 }).limit(1);
    body.order = maxOrder.length > 0 ? maxOrder[0].order + 10 : 10;
    
    const newMilestone = new ECJourneyMilestoneModel(body);
    await newMilestone.save();
    return NextResponse.json({ success: true, data: newMilestone }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create milestone" }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const { _id, ...updateData } = await request.json();
    const updatedMilestone = await ECJourneyMilestoneModel.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    if (!updatedMilestone) {
      return NextResponse.json({ success: false, error: "Milestone not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedMilestone }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update milestone" }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const { _id } = await request.json();
    const deletedMilestone = await ECJourneyMilestoneModel.findByIdAndDelete(_id);
    if (!deletedMilestone) {
      return NextResponse.json({ success: false, error: "Milestone not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Milestone deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete milestone" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { milestones } = await request.json();
    const updatePromises = milestones.map(m => 
      ECJourneyMilestoneModel.findByIdAndUpdate(m._id, { order: m.order })
    );
    await Promise.all(updatePromises);
    return NextResponse.json({ success: true, message: "Milestones reordered" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to reorder milestones" }, { status: 500 });
  }
}
