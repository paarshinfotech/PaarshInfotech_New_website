import { NextResponse } from 'next/server';
import _db from '../../../lib/utils/db';
import Duration from '../../../../models/Duration.model';

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
    const durations = await Duration.find({ isActive: true }).sort({ durationInMonths: 1 });
    return NextResponse.json({ success: true, data: durations });
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
    
    const duration = await Duration.create(body);
    return NextResponse.json({ success: true, data: duration }, { status: 201 });
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
    
    const duration = await Duration.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });
    
    if (!duration) {
      return NextResponse.json(
        { success: false, error: 'Duration not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: duration });
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
    
    const duration = await Duration.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    
    if (!duration) {
      return NextResponse.json(
        { success: false, error: 'Duration not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: duration });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
