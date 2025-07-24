import { NextResponse } from "next/server";
import mongoose from "mongoose";
import _db from "../../../lib/utils/db"; // Adjust path to your db connection
import ProductModel from "../../../../models/Product.model"; // Adjust path to your model

await _db();

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      name,
      id,
      tagline,
      description,
      heroImage,
      features,
      gallery
    } = data;

    if (
      !name ||
      !id ||
      !tagline ||
      !description ||
      !heroImage ||
      !features ||
      !gallery
    ) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const newProduct = new ProductModel({
      name,
      id,
      tagline,
      description,
      heroImage,
      features,
      gallery
    });

    await newProduct.save();

    return NextResponse.json({
      success: true,
      message: "Product created successfully",
      data: newProduct
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const products = await ProductModel.find();
    return NextResponse.json({
      success: true,
      message: "Products retrieved successfully",
      data: products
    }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve products" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const {...data} = await request.json();
    const {
      _id,  
      name,
      tagline,
      description,
      heroImage,
      features,
      gallery,
      published
    } = data;

    console.log("Data:", data);
    console.log("NAME:", name);

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      );
    }

    const updateData = {
      name,
      tagline,
      description,
      heroImage,
      features,
      gallery,
      published
    };

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      );
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully"
    }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}