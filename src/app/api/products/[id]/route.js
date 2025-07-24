import { NextResponse } from "next/server";
import mongoose from "mongoose";
import _db from "../../../../lib/utils/db"; // Adjust path to your db connection
import ProductModel from "../../../../../models/Product.model"; // Adjust path to your model

// Connect to the database
await _db();

// GET: Retrieve a single product by ID
export async function GET(request, { params }) {
  try {
    const product = await ProductModel.findById(params?.id);
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