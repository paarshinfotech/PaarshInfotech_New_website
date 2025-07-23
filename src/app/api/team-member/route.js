import _db from "../../../lib/utils/db";
import TeamMemberModel from "../../../../models/TeamMember.model";
import TeamCategoryModel from "../../../../models/TeamCategory.model";

_db();

export async function GET() {
  try {
    const members = await TeamMemberModel.find().lean();
    return new Response(JSON.stringify(members), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching team members:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch team members" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, categoryId, avatar, published } = data;

    if (!name || !categoryId) {
      return new Response(
        JSON.stringify({ error: "Name and categoryId are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate categoryId exists
    const category = await TeamCategoryModel.findById(categoryId);
    if (!category) {
      return new Response(JSON.stringify({ error: "Invalid categoryId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if category allows multiple members
    if (!category.allowMultiple) {
      const existingMember = await TeamMemberModel.findOne({ categoryId });
      if (existingMember) {
        return new Response(
          JSON.stringify({ error: "Category already assigned to a member" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    const newMember = new TeamMemberModel({
      name,
      categoryId,
      avatar: avatar || "https://placehold.co/40x40.png",
      published: published ?? true,
    });

    await newMember.save();

    return new Response(
      JSON.stringify({
        message: "Team member created successfully",
        data: newMember,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating team member:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create team member" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { _id, name, categoryId, avatar, published } = data;

    if (!_id || !name || !categoryId) {
      return new Response(
        JSON.stringify({ error: "_id, name, and categoryId are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate categoryId exists
    const category = await TeamCategoryModel.findById(categoryId);
    if (!category) {
      return new Response(JSON.stringify({ error: "Invalid categoryId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if category allows multiple members
    if (!category.allowMultiple) {
      const existingMember = await TeamMemberModel.findOne({
        categoryId,
        _id: { $ne: _id },
      });
      if (existingMember) {
        return new Response(
          JSON.stringify({
            error: "Category already assigned to another member",
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    const updatedMember = await TeamMemberModel.findByIdAndUpdate(
      _id,
      { name, categoryId, avatar, published },
      { new: true, runValidators: true }
    );

    if (!updatedMember) {
      return new Response(JSON.stringify({ error: "Team member not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        message: "Team member updated successfully",
        data: updatedMember,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating team member:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update team member" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(request) {
  try {
    const { _id } = await request.json();

    if (!_id) {
      return new Response(JSON.stringify({ error: "_id is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const deletedMember = await TeamMemberModel.findByIdAndDelete(_id);

    if (!deletedMember) {
      return new Response(JSON.stringify({ error: "Team member not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ message: "Team member deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting team member:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete team member" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
