import { NextResponse } from 'next/server';
import _db from '../../../lib/utils/db';
import InternshipPolicy from '../../../../models/InternshipPolicy.model';

await _db();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    let query = { isActive: true };
    if (type) {
      query.type = type;
    }
    
    const policies = await InternshipPolicy.find(query);
    return NextResponse.json({ success: true, data: policies });
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
    const { type, content } = body;
    
    // Check if policy of this type already exists
    const existing = await InternshipPolicy.findOne({ type });
    
    if (existing) {
      // Update existing
      existing.content = content;
      await existing.save();
      return NextResponse.json({ success: true, data: existing });
    } else {
      // Create new
      const policy = await InternshipPolicy.create({ type, content });
      return NextResponse.json({ success: true, data: policy }, { status: 201 });
    }
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
    const { type, content } = body;
    
    const policy = await InternshipPolicy.findOneAndUpdate(
      { type },
      { content },
      { new: true, upsert: true }
    );
    
    return NextResponse.json({ success: true, data: policy });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
