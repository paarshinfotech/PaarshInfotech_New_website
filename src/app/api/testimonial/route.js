import { NextResponse } from "next/server";
import mongoose from "mongoose";
import _db from "../../../lib/utils/db"; // Adjust path to your db connection
import TestimonialModel from "../../../../models/Testimonial.model"; // Adjust path to your model
import { uploadBase64 } from "../../../lib/utils/upload";

await _db();

export async function POST(request) {
  try {
    const data = await request.json();
    let { quote, name, title, avatarBase64, published } = data;

    if (!quote || !name || !title) {
      return NextResponse.json(
        { success: false, error: "Quote, name, and title are required" },
        { status: 400 }
      );
    }

    let avatar = "https://placehold.co/40x40.png"; // Default avatar
    if (avatarBase64) {
      const imageUrl = await uploadBase64(avatarBase64, `testimonial-${Date.now()}`);
      if (!imageUrl) {
        throw new Error("Failed to upload avatar image");
      }
      avatar = imageUrl;
    }

    const newTestimonial = new TestimonialModel({
      quote,
      name,
      title,
      avatar,
      published: published ?? true,
    });

    await newTestimonial.save();

    return NextResponse.json({
      success: true,
      message: "Testimonial created successfully",
      data: newTestimonial,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const testimonials = await TestimonialModel.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        results: testimonials.length,
        data: testimonials,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

export async function PATCH(request,) {
  try {
    const data = await request.json();
    let { _id, quote, name, title, avatarBase64, published } = data;

    if (!quote && !name && !title && !avatarBase64 && published === undefined) {
      return NextResponse.json(
        { success: false, error: "At least one field is required to update" },
        { status: 400 }
      );
    }

    const updateData = { quote, name, title, published };
    if (avatarBase64) {
      const imageUrl = await uploadBase64(avatarBase64, `testimonial-${_id}-${Date.now()}`);
      if (!imageUrl) {
        throw new Error("Failed to upload avatar image");
      }
      updateData.avatar = imageUrl;
    }

    const testimonial = await TestimonialModel.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const testimonial = await TestimonialModel.findByIdAndDelete(id);

    if (!testimonial) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial deleted successfully",
        data: null,
      },
      { status: 200 }
    ); // Using 200 instead of 204 to match the response format
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
