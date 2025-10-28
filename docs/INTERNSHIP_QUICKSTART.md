# Internship Registration System - Quick Start Guide

## 🚀 Getting Started

### Step 1: Seed the Database

Before using the system, populate it with initial data:

```bash
node scripts/seed-internship-data.js
```

This will create:
- 8 colleges (IIT Delhi, IIT Bombay, BITS Pilani, etc.)
- 8 internship types (Web Development, Mobile App Development, etc.)
- 5 durations (1 Month, 2 Months, 3 Months, 6 Months, 12 Months)
- 3 attendance modes (Online, Offline, Hybrid)

### Step 2: Access the System

Start your development server:
```bash
npm run dev
```

## 📍 Key URLs

- **Registration Form**: http://localhost:9002/register
- **Admin Settings**: http://localhost:9002/admin/internship-settings
- **View Registrations**: http://localhost:9002/admin/registrations

## 👤 For Interns (Registration)

### How to Register

1. Go to `/register`
2. Fill in all required fields:
   - Personal Information: Name, Email, Contact, Address
   - Academic Details: Select college from dropdown
   - Internship Details: Type, Mode, Duration, Joining Date
   - Laptop availability: Yes/No
   - Optional: Referral name, Additional notes
3. Upload documents:
   - Resume (PDF/DOC format)
   - Payment Screenshot (Image)
4. Click "Submit Registration"
5. You'll receive a unique registration number (e.g., PI-2025-0001)

### Required Documents

- **Resume**: .pdf, .doc, or .docx format
- **Payment Screenshot**: Any image format (proof of registration payment)

## 🛠️ For Admins

### Managing Settings

#### Add a New College
1. Go to `/admin/internship-settings`
2. Click "Colleges" tab
3. Click "Add New"
4. Enter college name and location
5. Click "Save"

#### Add a New Internship Type
1. Go to `/admin/internship-settings`
2. Click "Internship Types" tab
3. Click "Add New"
4. Enter type name and description
5. Click "Save"

#### Add a New Duration
1. Go to `/admin/internship-settings`
2. Click "Durations" tab
3. Click "Add New"
4. Enter duration name and months
5. Click "Save"

#### Add a New Attendance Mode
1. Go to `/admin/internship-settings`
2. Click "Attendance Modes" tab
3. Click "Add New"
4. Enter mode name and description
5. Click "Save"

### Viewing Registrations

#### Search Registrations
1. Go to `/admin/registrations`
2. Use the search bar to filter by:
   - Name
   - Email
   - Registration number
   - College name
   - Contact number

#### View Full Details
1. Click "View Details" on any registration
2. See complete information including:
   - Personal details
   - Academic information
   - Internship preferences
   - Uploaded documents

#### Access Documents
- Click "View Resume" to open the resume in a new tab
- Click "View Payment" to view the payment screenshot

## 🔑 Key Features

### Auto-Generated Registration Number
Format: `PI-YYYY-XXXX`
- PI: Paarsh Infotech
- YYYY: Current year
- XXXX: Sequential number (0001, 0002, etc.)

### Dynamic Dropdowns
All dropdowns (colleges, types, durations, modes) are:
- Managed from admin settings
- Automatically updated across the system
- Sorted alphabetically/numerically

### File Upload System
- Files upload automatically when selected
- Progress indicator shows upload status
- Success confirmation when complete
- Files stored in organized directories

### Validation
- All required fields must be filled
- Email format validation
- Documents must be uploaded before submission
- Duplicate email prevention

## 🗂️ File Storage Locations

- Resumes: `/public/resumes/`
- Payment Screenshots: `/public/payments/`

## 📊 Data Management

### Soft Deletes
- Deleted items are marked as `isActive: false`
- Data is preserved in the database
- Items won't appear in dropdowns or listings

### Pagination
- Registrations page shows 10 entries per page
- Navigate using Previous/Next buttons
- Total count displayed

## 🐛 Troubleshooting

### Problem: Dropdowns are empty
**Solution**: Run the seed script to populate initial data

### Problem: File upload fails
**Solution**: Check that `/public/resumes/` and `/public/payments/` directories exist

### Problem: Registration number not generated
**Solution**: Ensure MongoDB connection is active and the pre-save hook is working

### Problem: Can't see uploaded files
**Solution**: Files are stored in `/public/` directory - ensure proper permissions

## 📝 Best Practices

1. **Always seed data first** before testing registration
2. **Use real email formats** even in testing
3. **Upload actual files** (not empty files) for testing
4. **Check registration details** in admin panel after submission
5. **Regularly backup** uploaded files and database

## 🔄 Workflow Example

### Typical Admin Workflow

1. **Setup Phase**
   - Run seed script
   - Verify all settings are populated
   - Add any custom colleges/types needed

2. **Registration Phase**
   - Interns submit registrations via `/register`
   - System validates and stores data
   - Files are uploaded and saved

3. **Management Phase**
   - Admin reviews registrations at `/admin/registrations`
   - Search and filter as needed
   - View details and documents
   - Export or process registrations

### Typical Intern Workflow

1. Visit registration page
2. Fill all required information
3. Select from dropdown options
4. Upload resume and payment proof
5. Submit and receive registration number
6. Keep registration number for future reference

## 📧 Support

For issues or questions:
- Check the main documentation: `docs/INTERNSHIP_REGISTRATION.md`
- Review API endpoints in the documentation
- Check console logs for detailed error messages

---

**Version**: 1.0.0  
**Last Updated**: October 2025
