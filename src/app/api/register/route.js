import { NextResponse } from 'next/server';
import _db from '../../../lib/utils/db';
import Registration from '../../../../models/Registration.model';

await _db();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    const registrations = await Registration.find({ isActive: true })
      .populate('college')
      .populate('internshipType')
      .populate('attendanceMode')
      .populate('internshipDuration')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Registration.countDocuments({ isActive: true });
    
    return NextResponse.json({ 
      success: true, 
      data: registrations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
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
    
    // Validate required fields
    const requiredFields = [
      'fullName', 'email', 'contactNumber', 'address',
      'college', 'internshipType', 'attendanceMode',
      'joiningDate', 'internshipDuration', 'resumeUrl', 'paymentScreenshotUrl'
    ];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    
    // Check for duplicate email
    const existingRegistration = await Registration.findOne({ 
      email: body.email,
      isActive: true 
    });
    
    if (existingRegistration) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      );
    }
    
    const registration = await Registration.create(body);
    
    // Populate references for response
    await registration.populate([
      { path: 'college' },
      { path: 'internshipType' },
      { path: 'attendanceMode' },
      { path: 'internshipDuration' }
    ]);
    
    return NextResponse.json({ 
      success: true, 
      data: registration,
      message: 'Registration successful! Your registration number is ' + registration.registrationNumber
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
