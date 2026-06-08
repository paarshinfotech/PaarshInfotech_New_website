import { NextResponse } from "next/server";
import _db from "../../../lib/utils/db";
import ECTestimonialModel from "../../../../models/ECTestimonial.model";
import { uploadBase64, deleteFile } from "../../../lib/utils/upload";

await _db();

const DIR = "ec-testimonials";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get("publishedOnly") === "true";
    const query = publishedOnly ? { published: true } : {};
    const testimonials = await ECTestimonialModel.find(query).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: testimonials }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { avatarBase64, ...body } = await request.json();
    if (avatarBase64) {
      const avatarUrl = await uploadBase64(avatarBase64, `${DIR}-${Date.now()}`);
      body.avatar = avatarUrl;
    }
    const maxOrder = await ECTestimonialModel.find().sort({ order: -1 }).limit(1);
    body.order = maxOrder.length > 0 ? maxOrder[0].order + 10 : 10;

    const newTestimonial = new ECTestimonialModel(body);
    await newTestimonial.save();
    return NextResponse.json({ success: true, data: newTestimonial }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create testimonial" }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const { _id, avatarBase64, ...updateData } = await request.json();
    if (avatarBase64) {
      const old = await ECTestimonialModel.findById(_id);
      if (old?.avatar && !old.avatar.startsWith("https://placehold.co")) {
        await deleteFile(old.avatar);
      }
      const avatarUrl = await uploadBase64(avatarBase64, `${DIR}-${Date.now()}`);
      updateData.avatar = avatarUrl;
    }
    const updated = await ECTestimonialModel.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    if (!updated) {
      return NextResponse.json({ success: false, error: "Testimonial not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update testimonial" }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const { _id } = await request.json();
    const toDelete = await ECTestimonialModel.findById(_id);
    if (!toDelete) {
      return NextResponse.json({ success: false, error: "Testimonial not found" }, { status: 404 });
    }
    if (toDelete.avatar && !toDelete.avatar.startsWith("https://placehold.co")) {
      await deleteFile(toDelete.avatar);
    }
    await ECTestimonialModel.findByIdAndDelete(_id);
    return NextResponse.json({ success: true, message: "Testimonial deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete testimonial" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { testimonials } = await request.json();
    const updatePromises = testimonials.map((t) =>
      ECTestimonialModel.findByIdAndUpdate(t._id, { order: t.order })
    );
    await Promise.all(updatePromises);
    return NextResponse.json({ success: true, message: "Testimonials reordered" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to reorder testimonials" }, { status: 500 });
  }
}
