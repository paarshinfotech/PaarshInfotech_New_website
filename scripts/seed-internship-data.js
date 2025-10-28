const mongoose = require('mongoose');
const College = require('../models/College.model').default;
const InternshipType = require('../models/InternshipType.model').default;
const Duration = require('../models/Duration.model').default;
const Mode = require('../models/Mode.model').default;
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Seed Colleges
    const colleges = [
      { name: 'IIT Delhi', location: 'New Delhi' },
      { name: 'IIT Bombay', location: 'Mumbai' },
      { name: 'BITS Pilani', location: 'Pilani' },
      { name: 'NIT Trichy', location: 'Tiruchirappalli' },
      { name: 'Delhi University', location: 'Delhi' },
      { name: 'Mumbai University', location: 'Mumbai' },
      { name: 'VIT Vellore', location: 'Vellore' },
      { name: 'Amity University', location: 'Noida' },
    ];

    await College.deleteMany({});
    await College.insertMany(colleges);
    console.log('✓ Colleges seeded');

    // Seed Internship Types
    const internshipTypes = [
      { name: 'Web Development', description: 'Full-stack web development internship' },
      { name: 'Mobile App Development', description: 'Android/iOS app development' },
      { name: 'Data Science', description: 'Data analysis and machine learning' },
      { name: 'UI/UX Design', description: 'User interface and experience design' },
      { name: 'Digital Marketing', description: 'SEO, SEM, and social media marketing' },
      { name: 'Content Writing', description: 'Technical and creative content writing' },
      { name: 'DevOps', description: 'Cloud infrastructure and deployment' },
      { name: 'AI/ML', description: 'Artificial Intelligence and Machine Learning' },
    ];

    await InternshipType.deleteMany({});
    await InternshipType.insertMany(internshipTypes);
    console.log('✓ Internship Types seeded');

    // Seed Durations
    const durations = [
      { name: '1 Month', durationInMonths: 1 },
      { name: '2 Months', durationInMonths: 2 },
      { name: '3 Months', durationInMonths: 3 },
      { name: '6 Months', durationInMonths: 6 },
      { name: '12 Months', durationInMonths: 12 },
    ];

    await Duration.deleteMany({});
    await Duration.insertMany(durations);
    console.log('✓ Durations seeded');

    // Seed Modes
    const modes = [
      { name: 'Online', description: 'Work from home, remote internship' },
      { name: 'Offline', description: 'Work from office' },
      { name: 'Hybrid', description: 'Combination of online and offline' },
    ];

    await Mode.deleteMany({});
    await Mode.insertMany(modes);
    console.log('✓ Attendance Modes seeded');

    console.log('\n✅ All seed data created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
