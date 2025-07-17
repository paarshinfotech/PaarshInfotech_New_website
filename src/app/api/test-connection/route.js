import { NextResponse } from 'next/server';
import { _db } from '@/lib/utils/db';

export async function GET() {
  try {
    await _db();
    return NextResponse.json({ message: 'Database connected successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Database connection failed:', error);
    return NextResponse.json({ message: 'Database connection failed.', error: error.message }, { status: 500 });
  }
}
