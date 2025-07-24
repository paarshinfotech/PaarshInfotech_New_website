import _db from "../../../lib/utils/db";
import SiteImageModel from "../../../../models/SiteImage.model";

// Establish MongoDB connection
_db();

export async function GET() {
  try {
    const images = await SiteImageModel.find().lean();
    return new Response(JSON.stringify(images), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching site images:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch site images" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { section, imageUrl, alt, hint } = data;

    if (!section || !imageUrl || !alt) {
      return new Response(
        JSON.stringify({ error: "Section, imageUrl, and alt are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // Use upsert to create or update the image based on the unique section identifier
    const updatedImage = await SiteImageModel.findOneAndUpdate(
      { section: section },
      { 
        $set: { 
          imageUrl, 
          alt,
          hint: hint || "website image"
        },
        $setOnInsert: {
            page: section.split('_')[0], // Assumes section is like 'page_name'
            section: section,
        }
      },
      { new: true, upsert: true, runValidators: true }
    );

    return new Response(
      JSON.stringify({
        message: "Site image updated successfully",
        data: updatedImage,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating site image:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update site image" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
