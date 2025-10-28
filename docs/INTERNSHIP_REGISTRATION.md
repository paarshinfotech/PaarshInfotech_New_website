# Internship Registration System

A complete internship registration system for **Paarsh Infotech Pvt. Ltd.** built with Next.js, MongoDB, and TypeScript.

## Features

### Public Features
- **Registration Form** (`/register`)
  - Personal information (name, email, contact, address)
  - Dynamic dropdowns for college, internship type, attendance mode, and duration
  - File uploads for resume and payment screenshot
  - Real-time validation and upload progress
  - Automatic registration number generation (PI-YYYY-XXXX)

### Admin Features
- **Settings Page** (`/admin/internship-settings`)
  - Manage colleges (add, edit, delete)
  - Manage internship types (add, edit, delete)
  - Manage durations (add, edit, delete)
  - Manage attendance modes (add, edit, delete)
  - Tab-based interface for easy navigation

- **Registrations View** (`/admin/registrations`)
  - View all internship registrations
  - Search by name, email, registration number, or college
  - Pagination support
  - Detailed view of each registration
  - Access to uploaded documents (resume & payment screenshot)

## Database Models

### 1. College
- `name`: College name
- `location`: College location (optional)
- `isActive`: Active status
- `timestamps`: Created/Updated dates

### 2. InternshipType
- `name`: Internship type name
- `description`: Type description (optional)
- `isActive`: Active status
- `timestamps`: Created/Updated dates

### 3. Duration
- `name`: Duration name (e.g., "3 Months")
- `durationInMonths`: Duration value
- `isActive`: Active status
- `timestamps`: Created/Updated dates

### 4. Mode
- `name`: Attendance mode (Online/Offline/Hybrid)
- `description`: Mode description (optional)
- `isActive`: Active status
- `timestamps`: Created/Updated dates

### 5. Registration
- Personal info: fullName, email, contactNumber, address
- References: college, internshipType, attendanceMode, internshipDuration
- Details: joiningDate, hasLaptop, referralName, internshipNote
- Documents: resumeUrl, paymentScreenshotUrl
- Auto-generated: registrationNumber
- `isActive`: Active status
- `timestamps`: Created/Updated dates

### 6. File
- File metadata: fileName, originalName, fileUrl
- File details: fileType, fileSize, category
- `isActive`: Active status
- `timestamps`: Created/Updated dates

## API Endpoints

### Registration
- `POST /api/register` - Create new registration
- `GET /api/register` - Get all registrations (with pagination)

### Settings
- `GET /api/colleges` - Get all active colleges
- `POST /api/colleges` - Create new college
- `PUT /api/colleges` - Update college
- `DELETE /api/colleges?id={id}` - Soft delete college

- `GET /api/internship-types` - Get all active internship types
- `POST /api/internship-types` - Create new internship type
- `PUT /api/internship-types` - Update internship type
- `DELETE /api/internship-types?id={id}` - Soft delete internship type

- `GET /api/durations` - Get all active durations
- `POST /api/durations` - Create new duration
- `PUT /api/durations` - Update duration
- `DELETE /api/durations?id={id}` - Soft delete duration

- `GET /api/modes` - Get all active attendance modes
- `POST /api/modes` - Create new attendance mode
- `PUT /api/modes` - Update attendance mode
- `DELETE /api/modes?id={id}` - Soft delete attendance mode

### File Upload
- `POST /api/upload` - Upload file (resume or payment screenshot)
  - Accepts `multipart/form-data`
  - Fields: `file`, `category` (resume/payment)
  - Returns: `{ url, fileName, fileId }`

## File Storage

Files are stored in the following directories:
- `/public/resumes/` - Resume files (.pdf, .doc, .docx)
- `/public/payments/` - Payment screenshots (images)

## Setup Instructions

### 1. Seed Initial Data

Run the seed script to populate the database with initial colleges, internship types, durations, and modes:

```bash
node scripts/seed-internship-data.js
```

### 2. Access the System

- **Registration Page**: Navigate to `/register`
- **Admin Settings**: Navigate to `/admin/internship-settings`
- **View Registrations**: Navigate to `/admin/registrations`

### 3. Environment Variables

Ensure your `.env` file includes:
```
MONGODB_URI=your_mongodb_connection_string
```

## Registration Flow

1. **User fills the registration form** at `/register`
2. **Uploads resume and payment screenshot** (files upload automatically on selection)
3. **Submits the form** (all fields are validated)
4. **System generates unique registration number** (e.g., PI-2025-0001)
5. **Registration is saved** to the database
6. **Admin can view** all registrations at `/admin/registrations`

## Admin Workflow

### Managing Settings
1. Go to `/admin/internship-settings`
2. Select the appropriate tab (Colleges, Types, Durations, Modes)
3. Click "Add New" to create entries
4. Click edit/delete icons to modify existing entries

### Viewing Registrations
1. Go to `/admin/registrations`
2. Use search to filter registrations
3. Click "View Details" to see complete registration information
4. Click "View Resume" or "View Payment" to see uploaded documents

## Key Features

✅ **Dynamic Dropdowns** - All dropdowns read from database settings
✅ **File Management** - Unified file upload system for resumes and payment screenshots
✅ **Auto Registration Number** - Automatic generation with format PI-YYYY-XXXX
✅ **Real-time Validation** - Client-side and server-side validation
✅ **Responsive Design** - Mobile-friendly interface
✅ **Search & Filter** - Easy searching and filtering of registrations
✅ **Pagination** - Efficient handling of large datasets
✅ **Soft Delete** - All deletions are soft (data preserved with isActive flag)

## Future Enhancements

- Email notifications on registration
- Export registrations to Excel/CSV
- Bulk upload of colleges/settings
- Registration status workflow
- Payment verification system
- SMS notifications
- Analytics dashboard

## Tech Stack

- **Framework**: Next.js 15.3.3
- **Database**: MongoDB with Mongoose
- **UI Components**: Shadcn/UI
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Icons**: Lucide React
- **Date Handling**: date-fns

---

Built with ❤️ for Paarsh Infotech Pvt. Ltd.
