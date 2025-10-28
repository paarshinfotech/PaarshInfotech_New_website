import { NextResponse } from 'next/server';
import _db from '../../../lib/utils/db';
import College from '../../../../models/College.model';

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
    const colleges = await College.find({ isActive: true }).sort({ name: 1 });
    return NextResponse.json({ success: true, data: colleges });
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
    if (body.location) body.location = toTitleCase(body.location);
    
    const college = await College.create(body);
    return NextResponse.json({ success: true, data: college }, { status: 201 });
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
    if (updateData.location) updateData.location = toTitleCase(updateData.location);
    
    const college = await College.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });
    
    if (!college) {
      return NextResponse.json(
        { success: false, error: 'College not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: college });
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
    
    const college = await College.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    
    if (!college) {
      return NextResponse.json(
        { success: false, error: 'College not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: college });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
