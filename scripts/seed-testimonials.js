const mongoose = require("mongoose");
const TestimonialModel = require("../models/Testimonial.model");

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/paarsh-infotech";

async function seedTestimonials() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing testimonials
    await TestimonialModel.deleteMany({});
    console.log("Cleared existing testimonials");

    const initialTestimonials = [
      {
        name: "Pooja Gharte",
        designation: "Full Stack Web Developer",
        rating: 5,
        feedback: "The internship program provided invaluable hands-on experience on live projects. The mentorship I received was top-notch and prepared me for a career in tech.",
        order: 10,
        isActive: true,
      },
      {
        name: "Amit Jadhav",
        designation: "Former Intern, now Software Engineer",
        rating: 5,
        feedback: "Paarsh Infotech's team is incredibly skilled and supportive. I learned more in six months here than in two years of college.",
        order: 20,
        isActive: true,
      },
      {
        name: "Sneha Patil",
        designation: "Data Science Intern",
        rating: 4,
        feedback: "A great place to start your career. The company culture fosters learning and growth, and the team is always willing to help.",
        order: 30,
        isActive: true,
      },
      {
        name: "Ravi Kumar",
        designation: "Project Lead, Tech Solutions Inc.",
        rating: 5,
        feedback: "The team's dedication to quality is evident in every project. They are not just developers; they are true partners in our success.",
        order: 40,
        isActive: true,
      },
      {
        name: "Priya Sharma",
        designation: "UI/UX Designer",
        rating: 4,
        feedback: "Working with Paarsh Infotech has been a fantastic experience. The collaborative environment and focus on user-centered design have helped me grow professionally.",
        order: 50,
        isActive: true,
      },
    ];

    const createdTestimonials = await TestimonialModel.insertMany(initialTestimonials);
    console.log(`Successfully seeded ${createdTestimonials.length} testimonials`);

    console.log("Sample testimonials created:");
    createdTestimonials.forEach((testimonial, index) => {
      console.log(`${index + 1}. ${testimonial.name} - ${testimonial.designation} (${testimonial.rating}/5 stars)`);
    });

  } catch (error) {
    console.error("Error seeding testimonials:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

// Run the seeding function
seedTestimonials(); 