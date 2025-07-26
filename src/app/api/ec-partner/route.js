import { NextResponse } from "next/server";
import _db from "../../../lib/utils/db";
import PartnerModel from "../../../../models/Partner.model";
import { uploadBase64, deleteFile } from "../../../lib/utils/upload";
import path from "path";

await _db();

const PARTNER_DIR = "partners";

export async function GET() {
  try {
    const partners = await PartnerModel.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: partners }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch partners" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { logoBase64, ...body } = await request.json();
    if (logoBase64) {
      const logoUrl = await uploadBase64(logoBase64, `${PARTNER_DIR}-${Date.now()}`);
      body.logo = logoUrl;
    }
    const maxOrder = await PartnerModel.find().sort({ order: -1 }).limit(1);
    body.order = maxOrder.length > 0 ? maxOrder[0].order + 10 : 10;
    
    const newPartner = new PartnerModel(body);
    await newPartner.save();
    return NextResponse.json({ success: true, data: newPartner }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create partner" }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const { _id, logoBase64, ...updateData } = await request.json();
    if (logoBase64) {
      const oldPartner = await PartnerModel.findById(_id);
      if (oldPartner?.logo) await deleteFile(oldPartner.logo);
      const logoUrl = await uploadBase64(logoBase64, `${PARTNER_DIR}-${Date.now()}`);
      updateData.logo = logoUrl;
    }
    const updatedPartner = await PartnerModel.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    if (!updatedPartner) {
      return NextResponse.json({ success: false, error: "Partner not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedPartner }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update partner" }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const { _id } = await request.json();
    const partnerToDelete = await PartnerModel.findById(_id);
    if (!partnerToDelete) {
      return NextResponse.json({ success: false, error: "Partner not found" }, { status: 404 });
    }
    if (partnerToDelete.logo) await deleteFile(partnerToDelete.logo);
    await PartnerModel.findByIdAndDelete(_id);
    return NextResponse.json({ success: true, message: "Partner deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete partner" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { partners } = await request.json();
    const updatePromises = partners.map(p => 
      PartnerModel.findByIdAndUpdate(p._id, { order: p.order })
    );
    await Promise.all(updatePromises);
    return NextResponse.json({ success: true, message: "Partners reordered" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to reorder partners" }, { status: 500 });
  }
}
