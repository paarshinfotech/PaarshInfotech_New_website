import { NextResponse } from "next/server";
import mongoose from "mongoose";
import _db from "../../../lib/utils/db"; // Adjust path to your db connection
import ProductModel from "../../../../models/Product.model"; // Adjust path to your model
import { uploadBase64 } from "../../../lib/utils/upload";

await _db();

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      id,
      name,
      tagline,
      description,
      heroImageBase64,
      features,
      gallery,
      videoUrl,
      videoThumbnail,
    } = data;

    if (
      !name ||
      !tagline ||
      !description ||
      !heroImageBase64 ||
      !features ||
      !gallery
    ) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const heroImageUrl = await uploadBase64(
      heroImageBase64,
      `hero-${name}-${Date.now()}`
    );
    if (!heroImageUrl) {
      throw new Error("Failed to upload hero image");
    }

    // Handle gallery images upload
    const galleryData = await Promise.all(
      gallery.map(async (item, index) => {
        if (item.srcBase64) {
          const imageUrl = await uploadBase64(
            item.srcBase64,
            `gallery-${name}-${index}-${Date.now()}`
          );
          if (!imageUrl) {
            throw new Error(`Failed to upload gallery image ${index}`);
          }
          return { ...item, src: imageUrl, srcBase64: imageUrl };
        }
        return item;
      })
    );

    let videoThumbnailUrl = "";
    if (videoThumbnail) {
      if (videoThumbnail.startsWith('data:image/')) {
        videoThumbnailUrl = (await uploadBase64(videoThumbnail, `thumb-${name}-${Date.now()}`)) || "";
      } else {
        videoThumbnailUrl = videoThumbnail;
      }
    }

    let finalVideoUrl = videoUrl || "";
    if (videoUrl && videoUrl.startsWith('data:video/')) {
      finalVideoUrl = (await uploadBase64(videoUrl, `video-${name}-${Date.now()}`)) || videoUrl;
    }

    const newProduct = new ProductModel({
      id: id || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name,
      tagline,
      description,
      heroImageBase64: heroImageUrl,
      features,
      gallery: galleryData,
      videoUrl: finalVideoUrl,
      videoThumbnail: videoThumbnailUrl,
      published: true,
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
    const data = await request.json();
    const {
      _id,
      id,
      name,
      tagline,
      description,
      heroImageBase64,
      features,
      gallery,
      published,
      videoUrl,
      videoThumbnail,
    } = data;

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      );
    }

    const updateData = {};

    // Add simple fields if they exist
    if (id !== undefined) updateData.id = id;
    if (name !== undefined) updateData.name = name;
    if (tagline !== undefined) updateData.tagline = tagline;
    if (description !== undefined) updateData.description = description;
    if (features !== undefined) updateData.features = features;
    if (published !== undefined) updateData.published = published;

    // Handle hero image upload if provided
    if (heroImageBase64 !== undefined) {
      if (heroImageBase64.startsWith('data:image/')) {
        const heroImageUrl = await uploadBase64(
          heroImageBase64,
          `hero-${_id}-${Date.now()}`
        );
        if (!heroImageUrl) {
          throw new Error("Failed to upload hero image");
        }
        updateData.heroImageBase64 = heroImageUrl;
      } else if (heroImageBase64.startsWith('http://') || heroImageBase64.startsWith('https://') || heroImageBase64.startsWith('/')) {
        updateData.heroImageBase64 = heroImageBase64;
      } else {
        // Ignore invalid format silently — don't throw, just skip
        console.warn("Skipping invalid hero image format:", heroImageBase64.substring(0, 30));
      }
    }

    // Handle gallery if provided
    if (gallery !== undefined) {
      updateData.gallery = await Promise.all(
        gallery.map(async (item, index) => {
          if (item.srcBase64) {
            if (item.srcBase64.startsWith('data:image/')) {
              const imageUrl = await uploadBase64(
                item.srcBase64,
                `gallery-${_id}-${index}-${Date.now()}`
              );
              if (!imageUrl) {
                throw new Error(`Failed to upload gallery image ${index}`);
              }
              return { ...item, src: imageUrl, srcBase64: imageUrl };
            } else if (item.srcBase64.startsWith('http://') || item.srcBase64.startsWith('https://') || item.srcBase64.startsWith('/')) {
              return { ...item, src: item.srcBase64, srcBase64: item.srcBase64 };
            } else {
              // Skip invalid format silently — keep existing item
              return item;
            }
          }
          return item;
        })
      );
    }

    // Handle video URL and Thumbnail if provided
    if (videoUrl !== undefined) {
      if (typeof videoUrl === "string" && videoUrl.startsWith('data:video/')) {
        const uploaded = await uploadBase64(videoUrl, `video-${_id}-${Date.now()}`);
        updateData.videoUrl = uploaded || videoUrl;
      } else {
        updateData.videoUrl = videoUrl;
      }
    }

    if (videoThumbnail !== undefined) {
      if (typeof videoThumbnail === "string" && videoThumbnail.startsWith('data:image/')) {
        const thumbUrl = await uploadBase64(videoThumbnail, `thumb-${_id}-${Date.now()}`);
        updateData.videoThumbnail = thumbUrl || videoThumbnail;
      } else {
        updateData.videoThumbnail = videoThumbnail;
      }
    }

    // Only proceed with update if there are fields to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: "No fields provided to update" },
        { status: 400 }
      );
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true, runValidators: false }
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
      data: updatedProduct,
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { _id } = await request.json();

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      );
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(_id);

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