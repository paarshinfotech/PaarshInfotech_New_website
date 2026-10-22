import { NextResponse } from "next/server";
import mongoose from "mongoose";
import _db from "../../../../lib/utils/db"; // Adjust path to your db connection
import ProductModel from "../../../../../models/Product.model"; // Adjust path to your model

// Connect to the database
await _db();

// GET: Retrieve a single product by ID or Slug
export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams?.id;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      );
    }

    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const product = isObjectId
      ? await ProductModel.findById(id)
      : await ProductModel.findOne({ id });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product retrieved successfully",
      data: product,
    }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve product" },
      { status: 500 }
    );
  }
}