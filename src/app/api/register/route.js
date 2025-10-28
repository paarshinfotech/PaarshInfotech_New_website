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
    
    // Build filter query
    const filter = { isActive: true };
    
    // Search query (name, email, registration number)
    // Note: We'll filter by college name client-side since it's a populated field
    const search = searchParams.get('search');
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { contactNumber: { $regex: search, $options: 'i' } },
        { registrationNumber: { $regex: search, $options: 'i' } },
      ];
    }
    
    // Filter by college
    const college = searchParams.get('college');
    if (college) {
      filter.college = college;
    }
    
    // Filter by internship type
    const internshipType = searchParams.get('internshipType');
    if (internshipType) {
      filter.internshipType = internshipType;
    }
    
    // Filter by attendance mode
    const attendanceMode = searchParams.get('attendanceMode');
    if (attendanceMode) {
      filter.attendanceMode = attendanceMode;
    }
    
    // Filter by duration
    const duration = searchParams.get('duration');
    if (duration) {
      filter.internshipDuration = duration;
    }
    
    // Filter by hasLaptop
    const hasLaptop = searchParams.get('hasLaptop');
    if (hasLaptop) {
      filter.hasLaptop = hasLaptop === 'true';
    }
    
    // Filter by joining date range
    const joiningDateFrom = searchParams.get('joiningDateFrom');
    const joiningDateTo = searchParams.get('joiningDateTo');
    if (joiningDateFrom || joiningDateTo) {
      filter.joiningDate = {};
      if (joiningDateFrom) {
        filter.joiningDate.$gte = new Date(joiningDateFrom);
      }
      if (joiningDateTo) {
        // Set to end of day for the "to" date
        const endDate = new Date(joiningDateTo);
        endDate.setHours(23, 59, 59, 999);
        filter.joiningDate.$lte = endDate;
      }
    }
    
    let registrations = await Registration.find(filter)
      .populate('college')
      .populate('internshipType')
      .populate('attendanceMode')
      .populate('internshipDuration')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    // If search query exists, also filter by college name after population
    if (search && !college) {
      const searchLower = search.toLowerCase();
      registrations = registrations.filter(reg => 
        reg.fullName.toLowerCase().includes(searchLower) ||
        reg.email.toLowerCase().includes(searchLower) ||
        reg.contactNumber.includes(searchLower) ||
        reg.registrationNumber.toLowerCase().includes(searchLower) ||
        (reg.college && reg.college.name && reg.college.name.toLowerCase().includes(searchLower))
      );
    }
    
    const total = await Registration.countDocuments(filter);
    
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
