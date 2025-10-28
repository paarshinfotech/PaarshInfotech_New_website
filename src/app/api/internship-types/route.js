import { NextResponse } from 'next/server';
import _db from '../../../lib/utils/db';
import InternshipType from '../../../../models/InternshipType.model';

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
    const internshipTypes = await InternshipType.find({ isActive: true }).sort({ name: 1 });
    return NextResponse.json({ success: true, data: internshipTypes });
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
    
    const internshipType = await InternshipType.create(body);
    return NextResponse.json({ success: true, data: internshipType }, { status: 201 });
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
    
    const internshipType = await InternshipType.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });
    
    if (!internshipType) {
      return NextResponse.json(
        { success: false, error: 'Internship type not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: internshipType });
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
    
    const internshipType = await InternshipType.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    
    if (!internshipType) {
      return NextResponse.json(
        { success: false, error: 'Internship type not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: internshipType });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
