import _db from "../../../lib/utils/db";
import { uploadBase64, deleteFile } from "../../../lib/utils/upload";
import CareerTestimonialModel from "../../../../models/CareerTestimonial.model";
import { NextResponse } from "next/server";

_db();

const CAREER_DIR = "career-testimonials";

export async function GET() {
  try {
    const items = await CareerTestimonialModel.find().sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error) {
    console.error("Error fetching career testimonials:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch career testimonials" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { avatarBase64, ...rest } = data;
    if (!avatarBase64) return NextResponse.json({ success: false, error: "Avatar is required" }, { status: 400 });

    const avatarUrl = await uploadBase64(avatarBase64, `${CAREER_DIR}-${Date.now()}`);
    if (!avatarUrl) throw new Error("Failed to upload avatar");
    
    const newItem = new CareerTestimonialModel({ ...rest, avatar: avatarUrl });
    await newItem.save();
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    console.error("Error creating career testimonial:", error);
    return NextResponse.json({ success: false, error: "Failed to create career testimonial" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { _id, avatarBase64, ...rest } = data;
    const updateData = { ...rest };

    if (avatarBase64) {
      const oldItem = await CareerTestimonialModel.findById(_id);
      if (oldItem?.avatar) await deleteFile(oldItem.avatar);
      const avatarUrl = await uploadBase64(avatarBase64, `${CAREER_DIR}-${Date.now()}`);
      if (!avatarUrl) throw new Error("Failed to upload avatar");
      updateData.avatar = avatarUrl;
    }

    const updated = await CareerTestimonialModel.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    if (!updated) return NextResponse.json({ success: false, error: "Testimonial not found" }, { status: 404 });
    
    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    console.error("Error updating career testimonial:", error);
    return NextResponse.json({ success: false, error: "Failed to update career testimonial" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { _id } = await request.json();
    if (!_id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    const item = await CareerTestimonialModel.findById(_id);
    if (!item) return NextResponse.json({ success: false, error: "Testimonial not found" }, { status: 404 });
    if (item.avatar) await deleteFile(item.avatar);
    await CareerTestimonialModel.findByIdAndDelete(_id);
    return NextResponse.json({ success: true, message: "Testimonial deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting career testimonial:", error);
    return NextResponse.json({ success: false, error: "Failed to delete career testimonial" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { testimonials } = await request.json();
    if (!testimonials || !Array.isArray(testimonials)) {
      return NextResponse.json({ success: false, error: "Testimonials array is required" }, { status: 400 });
    }
    for (const item of testimonials) {
      await CareerTestimonialModel.findByIdAndUpdate(item._id, { order: item.order });
    }
    return NextResponse.json({ success: true, message: "Testimonials reordered successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error reordering career testimonials:", error);
    return NextResponse.json({ success: false, error: "Failed to reorder career testimonials" }, { status: 500 });
  }
}
