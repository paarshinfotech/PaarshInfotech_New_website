import _db from "../../../lib/utils/db";
import JourneyMilestoneModel from "../../../../models/JourneyMilestone.model";

// Establish MongoDB connection once at startup
_db();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const activeOnly = url.searchParams.get("activeOnly") === "true";

    let query = JourneyMilestoneModel.find();
    
    if (activeOnly) {
      query = query.where({ isActive: true });
    }
    
    query = query.sort({ order: 1 });

    const milestones = await query.lean();
    return new Response(JSON.stringify(milestones), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching journey milestones:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch journey milestones" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { year, title, description, icon, order, isActive } = data;

    if (!year || !title || !description || !icon || order === undefined) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newMilestone = new JourneyMilestoneModel({
      year,
      title,
      description,
      icon,
      order,
      isActive: isActive ?? true,
    });

    await newMilestone.save();

    return new Response(
      JSON.stringify({
        message: "Journey milestone created successfully",
        data: newMilestone,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating journey milestone:", error);
    if (error.code === 11000) {
      return new Response(
        JSON.stringify({ error: "Order number already exists" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ error: "Failed to create journey milestone" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { _id, year, title, description, icon, order, isActive } = data;

    if (!_id || !year || !title || !description || !icon || order === undefined) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const updatedMilestone = await JourneyMilestoneModel.findByIdAndUpdate(
      _id,
      {
        year,
        title,
        description,
        icon,
        order,
        isActive: isActive ?? true,
      },
      { new: true, runValidators: true }
    );

    if (!updatedMilestone) {
      return new Response(
        JSON.stringify({ error: "Journey milestone not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Journey milestone updated successfully",
        data: updatedMilestone,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating journey milestone:", error);
    if (error.code === 11000) {
      return new Response(
        JSON.stringify({ error: "Order number already exists" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ error: "Failed to update journey milestone" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request) {
  try {
    const data = await request.json();
    const { _id } = data;

    if (!_id) {
      return new Response(
        JSON.stringify({ error: "Milestone ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const deletedMilestone = await JourneyMilestoneModel.findByIdAndDelete(_id);

    if (!deletedMilestone) {
      return new Response(
        JSON.stringify({ error: "Journey milestone not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Journey milestone deleted successfully",
        data: deletedMilestone,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting journey milestone:", error);
    return new Response(JSON.stringify({ error: "Failed to delete journey milestone" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PATCH(request) {
  try {
    const data = await request.json();
    const { milestones } = data;

    if (!milestones || !Array.isArray(milestones)) {
      return new Response(
        JSON.stringify({ error: "Milestones array is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Use a two-step approach to avoid duplicate key errors
    // Step 1: Set all orders to temporary negative values
    for (const milestone of milestones) {
      await JourneyMilestoneModel.findByIdAndUpdate(
        milestone._id,
        { order: -(milestone.order + 1000) }, // Use negative values to avoid conflicts
        { new: true }
      );
    }

    // Step 2: Set the correct order values
    for (const milestone of milestones) {
      await JourneyMilestoneModel.findByIdAndUpdate(
        milestone._id,
        { order: milestone.order },
        { new: true }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Journey milestones reordered successfully",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error reordering journey milestones:", error);
    return new Response(JSON.stringify({ error: "Failed to reorder journey milestones" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 