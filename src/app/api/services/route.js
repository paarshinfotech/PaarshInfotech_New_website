import { NextResponse } from "next/server";
import mongoose from "mongoose";
import _db from "../../../lib/utils/db";
import ServiceModel from "../../../../models/Service.model";
import { uploadBase64 } from "../../../lib/utils/upload";

// Mock uploadBase64 function (replace with actual implementation)

await _db();

// Helper function to ensure array of strings
const ensureArrayOfStrings = (value, fieldName) => {
  try {
    if (Array.isArray(value)) {
      const sanitized = value
        .map((item) => String(item).trim())
        .filter((item) => item.length > 0);
      console.log(`Sanitized ${fieldName}:`, sanitized);
      return sanitized;
    }
    if (typeof value === "string") {
      const sanitized = value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
      console.log(`Sanitized ${fieldName} from string:`, sanitized);
      return sanitized;
    }
    console.warn(`Invalid ${fieldName} input:`, value);
    return [];
  } catch (error) {
    console.error(`Error sanitizing ${fieldName}:`, error);
    return [];
  }
};

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("Received POST request data:", JSON.stringify(data, null, 2));

    const {
      title,
      slug,
      description,
      overview,
      heroImageBase64,
      Icon,
      offerings,
      whyChooseUs,
      techStack,
      process,
      impact,
      testimonial,
      gallery,
      industries,
      published,
    } = data;

    if (
      !title ||
      !slug ||
      !description ||
      !overview ||
      !heroImageBase64 ||
      !offerings ||
      !whyChooseUs ||
      !techStack ||
      !process ||
      !impact ||
      !testimonial ||
      !gallery ||
      !industries
    ) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Sanitize techStack and industries
    const sanitizedTechStack = {
      frontend: ensureArrayOfStrings(techStack.frontend, "techStack.frontend"),
      backend: ensureArrayOfStrings(techStack.backend, "techStack.backend"),
      database: ensureArrayOfStrings(techStack.database, "techStack.database"),
      tools: ensureArrayOfStrings(techStack.tools, "techStack.tools"),
    };
    const sanitizedIndustries = ensureArrayOfStrings(industries, "industries");

    // Validate sanitized arrays
    if (
      !sanitizedTechStack.frontend.length ||
      !sanitizedTechStack.backend.length ||
      !sanitizedTechStack.database.length ||
      !sanitizedTechStack.tools.length ||
      !sanitizedIndustries.length
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "At least one value is required for each tech stack field and industries",
        },
        { status: 400 }
      );
    }

    // Handle base64 image uploads
    const heroImageUrl = await uploadBase64(
      heroImageBase64,
      `hero-${slug}-${Date.now()}`
    );
    if (!heroImageUrl) {
      throw new Error("Failed to upload hero image");
    }

    const testimonialData = { ...testimonial };
    if (testimonial.avatarBase64) {
      const avatarUrl = await uploadBase64(
        testimonial.avatarBase64,
        `avatar-${slug}-${Date.now()}`
      );
      if (!avatarUrl) {
        throw new Error("Failed to upload avatar image");
      }
      testimonialData.avatar = avatarUrl;
    }

    const galleryData = await Promise.all(
      gallery.map(async (item, index) => {
        if (item.srcBase64) {
          const imageUrl = await uploadBase64(
            item.srcBase64,
            `gallery-${slug}-${index}-${Date.now()}`
          );
          if (!imageUrl) {
            throw new Error(`Failed to upload gallery image ${index}`);
          }
          return { ...item, src: imageUrl };
        }
        return item;
      })
    );

    const newService = new ServiceModel({
      title,
      slug,
      description,
      overview,
      heroImageBase64: heroImageUrl,
      Icon,
      offerings,
      whyChooseUs,
      techStack: sanitizedTechStack,
      process,
      impact,
      testimonial: testimonialData,
      gallery: galleryData,
      industries: sanitizedIndustries,
      published: published || false,
    });

    // Log document before saving
    console.log("Document to save:", JSON.stringify(newService.toObject(), null, 2));

    await newService.save();

    return NextResponse.json(
      {
        success: true,
        message: "Service created successfully",
        data: newService,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create service",
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const services = await ServiceModel.find();
    return NextResponse.json(
      {
        success: true,
        message: "Services retrieved successfully",
        data: services,
      },
      { status: 200 }
    );
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
    console.log("Received PUT request data:", JSON.stringify(data, null, 2));

    const {
      id,
      title,
      slug,
      description,
      overview,
      heroImageBase64,
      Icon,
      offerings,
      whyChooseUs,
      techStack,
      process,
      impact,
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

    // Build update object with only provided fields
    const updateData = {};

    // Add simple fields if they exist
    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (description !== undefined) updateData.description = description;
    if (overview !== undefined) updateData.overview = overview;
    if (Icon !== undefined) updateData.Icon = Icon;
    if (offerings !== undefined) updateData.offerings = offerings;
    if (whyChooseUs !== undefined) updateData.whyChooseUs = whyChooseUs;
    if (process !== undefined) updateData.process = process;
    if (impact !== undefined) updateData.impact = impact;
    if (published !== undefined) updateData.published = published;

    // Handle techStack only if provided
    if (techStack !== undefined) {
      const sanitizedTechStack = {
        frontend: ensureArrayOfStrings(techStack.frontend || [], "techStack.frontend"),
        backend: ensureArrayOfStrings(techStack.backend || [], "techStack.backend"),
        database: ensureArrayOfStrings(techStack.database || [], "techStack.database"),
        tools: ensureArrayOfStrings(techStack.tools || [], "techStack.tools"),
      };
      updateData.techStack = sanitizedTechStack;
    }

    // Handle industries only if provided
    if (industries !== undefined) {
      updateData.industries = ensureArrayOfStrings(industries, "industries");
    }

    // Handle hero image upload if provided
    if (heroImageBase64) {
      // Check if it's actually base64 data or an existing URL
      if (heroImageBase64.startsWith('data:image/')) {
        // It's base64 data, upload it
        const heroImageUrl = await uploadBase64(
          heroImageBase64,
          `hero-${slug || 'service'}-${Date.now()}`
        );
        if (!heroImageUrl) {
          throw new Error("Failed to upload hero image");
        }
        updateData.heroImageBase64 = heroImageUrl;
      } else if (heroImageBase64.startsWith('http://') || heroImageBase64.startsWith('https://')) {
        // It's already a URL, just use it as is
        updateData.heroImageBase64 = heroImageBase64;
      } else {
        // Invalid format
        throw new Error("Invalid hero image format. Must be base64 data or valid URL");
      }
    }

    // Handle testimonial only if provided
    if (testimonial !== undefined) {
      updateData.testimonial = { ...testimonial };
      
      if (testimonial.avatarBase64) {
        // Check if it's actually base64 data or an existing URL
        if (testimonial.avatarBase64.startsWith('data:image/')) {
          // It's base64 data, upload it
          const avatarUrl = await uploadBase64(
            testimonial.avatarBase64,
            `avatar-${slug || 'service'}-${Date.now()}`
          );
          if (!avatarUrl) {
            throw new Error("Failed to upload avatar image");
          }
          updateData.testimonial.avatar = avatarUrl;
          // Keep the avatarBase64 field for schema validation
          updateData.testimonial.avatarBase64 = avatarUrl;
        } else if (testimonial.avatarBase64.startsWith('http://') || testimonial.avatarBase64.startsWith('https://')) {
          // It's already a URL, use it for both fields
          updateData.testimonial.avatar = testimonial.avatarBase64;
          updateData.testimonial.avatarBase64 = testimonial.avatarBase64;
        } else {
          // Invalid format
          throw new Error("Invalid avatar image format. Must be base64 data or valid URL");
        }
      }
    }

    // Handle gallery only if provided
    if (gallery !== undefined) {
      updateData.gallery = await Promise.all(
        gallery.map(async (item, index) => {
          if (item.srcBase64) {
            // Check if it's actually base64 data or an existing URL
            if (item.srcBase64.startsWith('data:image/')) {
              // It's base64 data, upload it
              const imageUrl = await uploadBase64(
                item.srcBase64,
                `gallery-${slug || 'service'}-${index}-${Date.now()}`
              );
              if (!imageUrl) {
                throw new Error(`Failed to upload gallery image ${index}`);
              }
              return { ...item, src: imageUrl, srcBase64: imageUrl };
            } else if (item.srcBase64.startsWith('http://') || item.srcBase64.startsWith('https://')) {
              // It's already a URL, use it for both fields
              return { ...item, src: item.srcBase64, srcBase64: item.srcBase64 };
            } else {
              // Invalid format
              throw new Error(`Invalid gallery image format at index ${index}. Must be base64 data or valid URL`);
            }
          }
          return item;
        })
      );
    }

    // Only proceed with update if there are fields to update (excluding id)
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: "No fields provided to update" },
        { status: 400 }
      );
    }

    console.log("Update data:", JSON.stringify(updateData, null, 2));

    const updatedService = await ServiceModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: false } // Disable validators to avoid base64 field issues
    );

    if (!updatedService) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Service updated successfully",
        data: updatedService,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update service",
      },
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

    return NextResponse.json(
      {
        success: true,
        message: "Service deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete service" },
      { status: 500 }
    );
  }
}