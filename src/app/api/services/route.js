import { NextResponse } from "next/server";
import mongoose from "mongoose";
import _db from "../../../lib/utils/db"; // Adjust path to your db connection
import ServiceModel from "../../../../models/Service.model"; // Adjust path to your model

await _db();

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      title,
      slug,
      description,
      overview,
      heroImage,
      offerings,
      techStack,
      testimonial,
      gallery,
      industries
    } = data;

    if (
      !title ||
      !slug ||
      !description ||
      !overview ||
      !heroImage ||
      !offerings ||
      !techStack ||
      !testimonial ||
      !gallery ||
      !industries
    ) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const newService = new ServiceModel({
      title,
      slug,
      description,
      overview,
      heroImage,
      offerings,
      techStack,
      testimonial,
      gallery,
      industries
    });

    await newService.save();

    return NextResponse.json({
      success: true,
      message: "Service created successfully",
      data: newService
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create service" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const services = await ServiceModel.find();
    return NextResponse.json({
      success: true,
      message: "Services retrieved successfully",
      data: services
    }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving services:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve services" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const {
      id,
      title,
      slug,
      description,
      overview,
      heroImage,
      offerings,
      techStack,
      testimonial,
      gallery,
      published,
      industries,
    } = data;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Service ID is required" },
        { status: 400 }
      );
    }

    const updateData = {
      title,
      slug,
      description,
      overview,
      heroImage,
      offerings,
      techStack,
      testimonial,
      gallery,
      published,
      industries,
    };

    const updatedService = await ServiceModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service updated successfully",
      data: updatedService,
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update service" },
      { status: 500 }
    );
  }
}
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Service ID is required" },
        { status: 400 }
      );
    }

    const deletedService = await ServiceModel.findByIdAndDelete(id);

    if (!deletedService) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully"
    }, { status: 200 });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete service" },
      { status: 500 }
    );
  }
}