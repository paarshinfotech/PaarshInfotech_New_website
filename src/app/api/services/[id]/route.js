import { NextResponse } from "next/server";
import mongoose from "mongoose";
import _db from "../../../../lib/utils/db"; // Adjust path to your db connection
import ServiceModel from "../../../../../models/Service.model"; // Adjust path to your model

await _db();

export async function GET(request , { params }) {
  try {
    const service = await ServiceModel.findById(params.id);
    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Services retrieved successfully",
      data: service
    }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving services:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve services" },
      { status: 500 }
    );
  }
}
