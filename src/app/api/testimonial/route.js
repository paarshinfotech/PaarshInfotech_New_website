import _db from "../../../lib/utils/db";
import TestimonialModel from "../../../../models/Testimonial.model";

// Establish MongoDB connection
_db();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const activeOnly = url.searchParams.get("activeOnly") === "true";
    
    let query = TestimonialModel.find();
    if (activeOnly) query = query.where({ isActive: true });
    query = query.sort({ order: 1 });
    
    const testimonials = await query.lean();
    return new Response(JSON.stringify(testimonials), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch testimonials" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, designation, rating, feedback, order, isActive } = data;

    if (!name || !designation || !rating || !feedback || order === undefined) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newTestimonial = new TestimonialModel({
      name,
      designation,
      rating,
      feedback,
      order,
      isActive: isActive ?? true,
    });

    await newTestimonial.save();

    return new Response(
      JSON.stringify({
        message: "Testimonial created successfully",
        data: newTestimonial,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating testimonial:", error);
    if (error.code === 11000) {
      return new Response(
        JSON.stringify({ error: "Order number already exists" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ error: "Failed to create testimonial" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { _id, name, designation, rating, feedback, order, isActive } = data;

    if (!_id || !name || !designation || !rating || !feedback || order === undefined) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const updatedTestimonial = await TestimonialModel.findByIdAndUpdate(
      _id,
      {
        name,
        designation,
        rating,
        feedback,
        order,
        isActive: isActive ?? true,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTestimonial) {
      return new Response(
        JSON.stringify({ error: "Testimonial not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Testimonial updated successfully",
        data: updatedTestimonial,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating testimonial:", error);
    if (error.code === 11000) {
      return new Response(
        JSON.stringify({ error: "Order number already exists" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ error: "Failed to update testimonial" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(request) {
  try {
    const data = await request.json();
    const { _id } = data;

    if (!_id) {
      return new Response(
        JSON.stringify({ error: "Testimonial ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const deletedTestimonial = await TestimonialModel.findByIdAndDelete(_id);

    if (!deletedTestimonial) {
      return new Response(
        JSON.stringify({ error: "Testimonial not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Testimonial deleted successfully",
        data: deletedTestimonial,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete testimonial" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PATCH(request) {
  try {
    const data = await request.json();
    const { testimonials } = data;

    if (!testimonials || !Array.isArray(testimonials)) {
      return new Response(
        JSON.stringify({ error: "Testimonials array is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Two-step update to avoid duplicate key errors
    for (const testimonial of testimonials) {
      await TestimonialModel.findByIdAndUpdate(
        testimonial._id,
        { order: -(testimonial.order + 1000) },
        { new: true }
      );
    }
    for (const testimonial of testimonials) {
      await TestimonialModel.findByIdAndUpdate(
        testimonial._id,
        { order: testimonial.order },
        { new: true }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Testimonials reordered successfully",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error reordering testimonials:", error);
    return new Response(
      JSON.stringify({ error: "Failed to reorder testimonials" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
} 