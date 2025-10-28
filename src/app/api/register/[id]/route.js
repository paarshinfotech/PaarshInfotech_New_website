import { NextResponse } from 'next/server';
import _db from '../../../../lib/utils/db';
import Registration from '../../../../../models/Registration.model';

await _db();

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Registration ID is required' },
        { status: 400 }
      );
    }

    // Soft delete by setting isActive to false
    const registration = await Registration.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!registration) {
      return NextResponse.json(
        { success: false, error: 'Registration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Registration deleted successfully',
    });
  } catch (error) {
    console.error('Delete registration error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Registration ID is required' },
        { status: 400 }
      );
    }

    const registration = await Registration.findById(id)
      .populate('college')
      .populate('internshipType')
      .populate('attendanceMode')
      .populate('internshipDuration');

    if (!registration || !registration.isActive) {
      return NextResponse.json(
        { success: false, error: 'Registration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: registration,
    });
  } catch (error) {
    console.error('Get registration error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
