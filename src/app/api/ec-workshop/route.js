import { NextResponse } from "next/server";
import _db from "../../../lib/utils/db";
import WorkshopModel from "../../../../models/Workshop.model";

await _db();

export async function GET() {
  try {
    const workshops = await WorkshopModel.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: workshops }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch workshops" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const maxOrder = await WorkshopModel.find().sort({ order: -1 }).limit(1);
    body.order = maxOrder.length > 0 ? maxOrder[0].order + 10 : 10;
    const newWorkshop = new WorkshopModel(body);
    await newWorkshop.save();
    return NextResponse.json({ success: true, data: newWorkshop }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create workshop" }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const { _id, ...updateData } = await request.json();
    const updatedWorkshop = await WorkshopModel.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    if (!updatedWorkshop) {
      return NextResponse.json({ success: false, error: "Workshop not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedWorkshop }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update workshop" }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const { _id } = await request.json();
    const deletedWorkshop = await WorkshopModel.findByIdAndDelete(_id);
    if (!deletedWorkshop) {
      return NextResponse.json({ success: false, error: "Workshop not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Workshop deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete workshop" }, { status: 500 });
  }
}

export async function PATCH(request) {
    try {
      const { workshops } = await request.json();
      const updatePromises = workshops.map(p => 
        WorkshopModel.findByIdAndUpdate(p._id, { order: p.order })
      );
      await Promise.all(updatePromises);
      return NextResponse.json({ success: true, message: "Workshops reordered" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: "Failed to reorder workshops" }, { status: 500 });
    }
  }
