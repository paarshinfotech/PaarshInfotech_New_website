import _db from "../../../lib/utils/db";
import TeamCategoryModel from "../../../../models/TeamCategory.model";

// Establish MongoDB connection once at startup
_db();

export async function GET() {
  try {
    const categories = await TeamCategoryModel.find()
      .sort({ order: 1, name: 1 })
      .lean();
    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch categories" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, allowMultiple } = data;

    if (!name || typeof allowMultiple !== "boolean") {
      return new Response(
        JSON.stringify({ error: "Name and allowMultiple are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Set order to the highest current order + 1
    const maxOrder = await TeamCategoryModel.find()
      .sort({ order: -1 })
      .limit(1);
    const newOrder = maxOrder.length > 0 ? maxOrder[0].order + 1 : 0;

    const newCategory = new TeamCategoryModel({
      name,
      allowMultiple,
      order: newOrder,
    });

    await newCategory.save();

    return new Response(
      JSON.stringify({
        message: "Category created successfully",
        data: newCategory,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create category" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { _id, name, allowMultiple } = data;

    if (!_id || !name || typeof allowMultiple !== "boolean") {
      return new Response(
        JSON.stringify({ error: "_id, name, and allowMultiple are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const updatedCategory = await TeamCategoryModel.findByIdAndUpdate(
      _id,
      { name, allowMultiple },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return new Response(JSON.stringify({ error: "Category not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        message: "Category updated successfully",
        data: updatedCategory,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating category:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update category" }),
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

    const deletedCategory = await TeamCategoryModel.findByIdAndDelete(_id);

    if (!deletedCategory) {
      return new Response(JSON.stringify({ error: "Category not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ message: "Category deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete category" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PATCH(request) {
  try {
    const { categories } = await request.json();

    if (!Array.isArray(categories) || categories.length === 0) {
      return new Response(
        JSON.stringify({ error: "Categories array is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Update order for each category
    const updatePromises = categories.map(({ _id, order }) =>
      TeamCategoryModel.findByIdAndUpdate(
        _id,
        { order },
        { new: true, runValidators: true }
      )
    );

    const updatedCategories = await Promise.all(updatePromises);

    if (updatedCategories.some((category) => !category)) {
      return new Response(
        JSON.stringify({ error: "One or more categories not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Categories reordered successfully",
        data: updatedCategories,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error reordering categories:", error);
    return new Response(
      JSON.stringify({ error: "Failed to reorder categories" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
