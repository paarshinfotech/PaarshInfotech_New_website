import { NextResponse } from 'next/server';
import _db from '../../../lib/utils/db';
import Mode from '../../../../models/Mode.model';

await _db();

// Helper function to convert text to Title Case
const toTitleCase = (text) => {
  if (!text) return text;
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .trim();
};

export async function GET() {
  try {
    const modes = await Mode.find({ isActive: true }).sort({ name: 1 });
    return NextResponse.json({ success: true, data: modes });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Apply title case formatting
    if (body.name) body.name = toTitleCase(body.name);
    
    const mode = await Mode.create(body);
    return NextResponse.json({ success: true, data: mode }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    // Apply title case formatting
    if (updateData.name) updateData.name = toTitleCase(updateData.name);
    
    const mode = await Mode.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });
    
    if (!mode) {
      return NextResponse.json(
        { success: false, error: 'Mode not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: mode });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    const mode = await Mode.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    
    if (!mode) {
      return NextResponse.json(
        { success: false, error: 'Mode not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: mode });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
