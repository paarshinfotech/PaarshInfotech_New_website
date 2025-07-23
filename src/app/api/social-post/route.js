import _db from "../../../lib/utils/db";
import SocialPostModel from "../../../../models/SocialPost.model";

// Establish MongoDB connection once at startup
_db();

export async function GET() {
  try {
    const posts = await SocialPostModel.find().lean();
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching social posts:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch social posts" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { content, image, likes, comments, hint, published } = data;

    if (!content) {
      return new Response(JSON.stringify({ error: "Content is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newPost = new SocialPostModel({
      content,
      image: image || "https://placehold.co/600x400.png",
      likes: likes || 0,
      comments: comments || 0,
      hint: hint || "social media",
      published: published ?? true,
      timestamp: new Date(),
    });

    await newPost.save();

    return new Response(
      JSON.stringify({
        message: "Social post created successfully",
        data: newPost,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating social post:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create social post" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { _id, content, image, likes, comments, hint, published } = data;

    if (!_id || !content) {
      return new Response(
        JSON.stringify({ error: "_id and content are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const updatedPost = await SocialPostModel.findByIdAndUpdate(
      _id,
      {
        content,
        image: image || null,
        likes: likes || 0,
        comments: comments || 0,
        hint: hint || "social media",
        published,
      },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return new Response(JSON.stringify({ error: "Social post not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        message: "Social post updated successfully",
        data: updatedPost,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating social post:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update social post" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const _id = url.pathname.split("/").pop();

    if (!_id) {
      return new Response(JSON.stringify({ error: "_id is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const deletedPost = await SocialPostModel.findByIdAndDelete(_id);

    if (!deletedPost) {
      return new Response(JSON.stringify({ error: "Social post not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ message: "Social post deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting social post:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete social post" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
