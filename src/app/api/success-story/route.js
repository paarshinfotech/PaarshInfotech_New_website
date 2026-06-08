import { NextResponse } from "next/server";
import _db from "../../../lib/utils/db";
import SuccessStoryModel from "../../../../models/SuccessStory.model";
import { uploadBase64, deleteFile } from "../../../lib/utils/upload";

await _db();

const DIR = "success-stories";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get("publishedOnly") === "true";
    const query = publishedOnly ? { published: true } : {};
    const stories = await SuccessStoryModel.find(query).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: stories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch success stories" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { avatarBase64, ...body } = await request.json();
    if (avatarBase64) {
      const avatarUrl = await uploadBase64(avatarBase64, `${DIR}-${Date.now()}`);
      body.avatar = avatarUrl;
    }
    const maxOrder = await SuccessStoryModel.find().sort({ order: -1 }).limit(1);
    body.order = maxOrder.length > 0 ? maxOrder[0].order + 10 : 10;

    const newStory = new SuccessStoryModel(body);
    await newStory.save();
    return NextResponse.json({ success: true, data: newStory }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create success story" }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const { _id, avatarBase64, ...updateData } = await request.json();
    if (avatarBase64) {
      const old = await SuccessStoryModel.findById(_id);
      if (old?.avatar && !old.avatar.startsWith("https://placehold.co")) {
        await deleteFile(old.avatar);
      }
      const avatarUrl = await uploadBase64(avatarBase64, `${DIR}-${Date.now()}`);
      updateData.avatar = avatarUrl;
    }
    const updated = await SuccessStoryModel.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    if (!updated) {
      return NextResponse.json({ success: false, error: "Success story not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update success story" }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const { _id } = await request.json();
    const toDelete = await SuccessStoryModel.findById(_id);
    if (!toDelete) {
      return NextResponse.json({ success: false, error: "Success story not found" }, { status: 404 });
    }
    if (toDelete.avatar && !toDelete.avatar.startsWith("https://placehold.co")) {
      await deleteFile(toDelete.avatar);
    }
    await SuccessStoryModel.findByIdAndDelete(_id);
    return NextResponse.json({ success: true, message: "Success story deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete success story" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { stories } = await request.json();
    const updatePromises = stories.map((s) =>
      SuccessStoryModel.findByIdAndUpdate(s._id, { order: s.order })
    );
    await Promise.all(updatePromises);
    return NextResponse.json({ success: true, message: "Success stories reordered" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to reorder success stories" }, { status: 500 });
  }
}
