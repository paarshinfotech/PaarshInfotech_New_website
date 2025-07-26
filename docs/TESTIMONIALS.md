# Testimonials Management System

## Overview

The Testimonials Management System allows you to collect, manage, and display testimonials from users, clients, and team members. It includes both admin management capabilities and a public feedback collection system.

## Features

### Admin Features
- **CRUD Operations**: Add, edit, delete, and reorder testimonials
- **Active/Inactive Toggle**: Control which testimonials are displayed publicly
- **Drag & Drop Reordering**: Easily reorder testimonials using drag and drop
- **Star Rating Display**: Visual representation of ratings (1-5 stars)
- **Bulk Management**: Manage all testimonials from a single interface

### Public Features
- **Feedback Form**: Public form for users to submit testimonials
- **Shareable Link**: Direct link to the feedback form
- **Auto-Review System**: New submissions are inactive by default for admin review
- **User-Friendly Interface**: Intuitive form with star rating selection

## Database Schema

### Testimonial Model
```javascript
{
  name: String (required, 2-100 chars),
  designation: String (required, 2-100 chars),
  rating: Number (required, 1-5),
  feedback: String (required, 10-1000 chars),
  order: Number (required, unique),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### GET `/api/testimonial`
- **Query Parameters**: `activeOnly=true` (optional)
- **Response**: Array of testimonials sorted by order
- **Usage**: Fetch testimonials for display or management

### POST `/api/testimonial`
- **Body**: `{ name, designation, rating, feedback, order, isActive }`
- **Response**: Created testimonial object
- **Usage**: Add new testimonial (admin or public form)

### PUT `/api/testimonial`
- **Body**: `{ _id, name, designation, rating, feedback, order, isActive }`
- **Response**: Updated testimonial object
- **Usage**: Update existing testimonial

### DELETE `/api/testimonial`
- **Body**: `{ _id }`
- **Response**: Deleted testimonial object
- **Usage**: Delete testimonial

### PATCH `/api/testimonial`
- **Body**: `{ testimonials: [{ _id, order }, ...] }`
- **Response**: Success message
- **Usage**: Reorder testimonials

## Setup Instructions

### 1. Database Setup
The testimonials collection will be created automatically when the first testimonial is added.

### 2. Seed Initial Data
Run the seeding script to add sample testimonials:
```bash
node scripts/seed-testimonials.js
```

### 3. Admin Panel Access
Navigate to `/admin/about` and click on the "Testimonials" tab to manage testimonials.

## Usage Guide

### Admin Management

1. **Adding Testimonials**:
   - Click "Add Testimonial" button
   - Fill in name, designation, rating, feedback, and order
   - Toggle active status as needed
   - Click "Add" to save

2. **Editing Testimonials**:
   - Click the edit (pencil) icon on any testimonial
   - Modify the fields as needed
   - Click "Update" to save changes

3. **Reordering Testimonials**:
   - Drag and drop testimonials using the grip handle
   - Order is automatically updated

4. **Activating/Deactivating**:
   - Use the toggle switch to control visibility
   - Inactive testimonials won't appear on the public page

5. **Testing Feedback Form**:
   - Click "Test Feedback Form" to open the public form
   - Submit test feedback to see how it appears in admin

### Public Feedback Collection

1. **Form Access**:
   - Users can access the form via direct link
   - Form includes all required fields with validation
   - Star rating system for easy rating selection

2. **Submission Process**:
   - User fills out the form
   - Rating is selected using interactive stars
   - Form validates all inputs
   - Submission creates testimonial with `isActive: false`
   - Admin can review and activate manually

3. **Admin Review**:
   - New submissions appear in admin panel
   - Admin can edit, activate, or delete submissions
   - Only active testimonials appear on public page

## Public Display

### Testimonials Component
The public testimonials section displays:
- Star ratings (1-5 stars)
- User feedback in quotes
- Name and designation
- Avatar with initials
- Smooth marquee animation

### Display Logic
- Only active testimonials are shown
- Testimonials are ordered by the `order` field
- Duplicated for seamless marquee effect
- Responsive design for all screen sizes

## File Structure

```
src/
├── app/api/testimonial/route.js          # API endpoints
├── components/
│   ├── admin/about/
│   │   ├── TestimonialsManagement.tsx    # Admin management interface
│   │   └── TestimonialForm.tsx           # Admin add/edit form
│   ├── about/
│   │   └── Testimonials.tsx              # Public display component
│   └── common/
│       └── FeedbackFormModal.tsx         # Public feedback form
├── services/api.js                       # RTK Query endpoints
└── models/Testimonial.model.js           # Database model

scripts/
└── seed-testimonials.js                  # Initial data seeding

docs/
└── TESTIMONIALS.md                       # This documentation
```

## Configuration

### Environment Variables
No additional environment variables are required. The system uses the existing MongoDB connection.

### Customization
- **Rating System**: Currently 1-5 stars, can be modified in the model
- **Validation Rules**: Adjust character limits in the schema
- **Display Order**: Uses gap-based ordering (10, 20, 30...) for flexibility
- **Auto-Activation**: New submissions are inactive by default for review

## Troubleshooting

### Common Issues

1. **Order Conflicts**:
   - The system uses a two-step update process to prevent conflicts
   - If conflicts occur, check for duplicate order numbers

2. **Form Validation**:
   - Ensure all required fields are filled
   - Rating must be between 1-5
   - Feedback must be at least 10 characters

3. **Display Issues**:
   - Check if testimonials are marked as active
   - Verify order numbers are set correctly
   - Ensure database connection is working

### Error Handling
- API endpoints include comprehensive error handling
- Form validation prevents invalid submissions
- Toast notifications provide user feedback
- Console logs help with debugging

## Future Enhancements

Potential improvements for the testimonials system:
- Email notifications for new submissions
- Bulk import/export functionality
- Advanced filtering and search
- Analytics and reporting
- Social media integration
- Automated approval workflows 