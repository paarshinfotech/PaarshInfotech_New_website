
import { NextResponse } from "next/server";
import _db from "../../../lib/utils/db";
import ProgramModel from "../../../../models/Program.model";

await _db();

export async function GET() {
  try {
    const programs = await ProgramModel.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: programs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch programs" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const maxOrder = await ProgramModel.find().sort({ order: -1 }).limit(1);
    body.order = maxOrder.length > 0 ? maxOrder[0].order + 10 : 10;

    const newProgram = new ProgramModel(body);
    await newProgram.save();
    return NextResponse.json({ success: true, data: newProgram }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create program" }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const { _id, ...updateData } = await request.json();
    const updatedProgram = await ProgramModel.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    if (!updatedProgram) {
      return NextResponse.json({ success: false, error: "Program not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedProgram }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update program" }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const { _id } = await request.json();
    const deletedProgram = await ProgramModel.findByIdAndDelete(_id);
    if (!deletedProgram) {
      return NextResponse.json({ success: false, error: "Program not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Program deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete program" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { programs } = await request.json();
    const updatePromises = programs.map(p => 
      ProgramModel.findByIdAndUpdate(p._id, { order: p.order })
    );
    await Promise.all(updatePromises);
    return NextResponse.json({ success: true, message: "Programs reordered" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to reorder programs" }, { status: 500 });
  }
}
