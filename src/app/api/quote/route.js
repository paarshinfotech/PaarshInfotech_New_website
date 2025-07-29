import _db from "../../../lib/utils/db";
import QuoteModel from "../../../../models/quote.model";
import { NextResponse } from 'next/server';

_db();

export async function GET() {
  try {
    const quotes = await QuoteModel.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(quotes);
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return NextResponse.json({ error: "Failed to fetch quotes" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, message, services } = data;

    if (!name || !email || !message || !services || services.length === 0) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newQuote = new QuoteModel({
      name,
      email,
      message,
      services,
    });

    await newQuote.save();

    return NextResponse.json({
        message: "Quote request created successfully",
        data: newQuote,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating quote:", error);
    return NextResponse.json({ error: "Failed to create quote" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { _id } = await request.json();

    if (!_id) {
      return NextResponse.json({ error: "_id is required" }, { status: 400 });
    }

    const deletedQuote = await QuoteModel.findByIdAndDelete(_id);

    if (!deletedQuote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Quote deleted successfully" });
  } catch (error) {
    console.error("Error deleting quote:", error);
    return NextResponse.json({ error: "Failed to delete quote" }, { status: 500 });
  }
}
