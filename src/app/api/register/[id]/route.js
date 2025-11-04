import { NextResponse } from 'next/server';
import _db from '../../../../lib/utils/db';
import Registration from '../../../../../models/Registration.model';

await _db();

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

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
    const { id } = await params;

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

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Registration ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { offerLetterSent, completionLetterSent } = body;

    // Validate that at least one field is being updated
    if (offerLetterSent === undefined && completionLetterSent === undefined) {
      return NextResponse.json(
        { success: false, error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    // Build update object
    const updateData = {};
    if (offerLetterSent !== undefined) {
      updateData.offerLetterSent = offerLetterSent;
    }
    if (completionLetterSent !== undefined) {
      updateData.completionLetterSent = completionLetterSent;
    }

    const registration = await Registration.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )
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
      message: 'Registration updated successfully',
    });
  } catch (error) {
    console.error('Update registration error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
