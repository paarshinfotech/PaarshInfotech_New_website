const mongoose = require("mongoose");
const JourneyMilestoneModel = require("../models/JourneyMilestone.model");

// MongoDB connection string - update this with your actual connection string
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/paarsh-infotech";

const initialMilestones = [
  {
    year: "2018",
    title: "Foundation Laid",
    description: "Paarsh Infotech was founded with a vision to provide world-class IT solutions and build lasting client relationships.",
    icon: "LuFlag",
    order: 10,
    isActive: true,
  },
  {
    year: "2019",
    title: "First Major Project",
    description: "Successfully delivered our first large-scale enterprise software, setting a benchmark for quality and performance.",
    icon: "LuBriefcase",
    order: 20,
    isActive: true,
  },
  {
    year: "2021",
    title: "Team Expansion",
    description: "Grew our team of passionate experts, bringing in diverse talent to expand our service offerings.",
    icon: "LuBuilding2",
    order: 30,
    isActive: true,
  },
  {
    year: "2023",
    title: "100+ Projects Milestone",
    description: "Celebrated the completion of over 100 successful projects, empowering businesses across various industries.",
    icon: "LuRocket",
    order: 40,
    isActive: true,
  },
  {
    year: "2024",
    title: "Expanding Globally",
    description: "Began serving international clients, marking our entry into the global software development landscape.",
    icon: "LuGlobe",
    order: 50,
    isActive: true,
  },
];

async function seedJourneyMilestones() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing milestones
    await JourneyMilestoneModel.deleteMany({});
    console.log("Cleared existing journey milestones");

    // Insert new milestones
    const result = await JourneyMilestoneModel.insertMany(initialMilestones);
    console.log(`Successfully seeded ${result.length} journey milestones`);

    // Display the seeded data
    console.log("\nSeeded Journey Milestones:");
    result.forEach((milestone, index) => {
      console.log(`${index + 1}. ${milestone.year} - ${milestone.title}`);
    });

  } catch (error) {
    console.error("Error seeding journey milestones:", error);
  } finally {
    // Close the connection
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

// Run the seeding function
seedJourneyMilestones(); 