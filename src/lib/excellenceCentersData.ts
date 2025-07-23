
import {
  LuBookOpen,
  LuAward,
  LuUsers,
  LuLightbulb,
  LuCode2,
  LuClipboardCheck,
  LuBriefcase,
  LuFlag,
  LuTrophy,
  LuBrainCircuit,
  LuBarChart,
  LuTrendingUp,
} from "react-icons/lu";
import type { IconType } from "react-icons";

export const partnerColleges = [
  {
    name: "Sandip University",
    logo: "https://placehold.co/200x200.png",
    state: "Maharashtra",
  },
  {
    name: "K. K. Wagh College",
    logo: "https://placehold.co/200x200.png",
    state: "Maharashtra",
  },
  {
    name: "MET College",
    logo: "https://placehold.co/200x200.png",
    state: "Maharashtra",
  },
  {
    name: "NDMVP College",
    logo: "https://placehold.co/200x200.png",
    state: "Maharashtra",
  },
  {
    name: "JIT College",
    logo: "https://placehold.co/200x200.png",
    state: "Maharashtra",
  },
];

export const studentBenefits = [
  {
    title: "Real-World Project Experience",
    description:
      "Work on live projects that solve actual business challenges, giving you a portfolio of work before you even graduate.",
  },
  {
    title: "Expert Mentorship",
    description:
      "Receive direct guidance and support from our experienced industry professionals and senior developers.",
  },
  {
    title: "Industry-Recognized Certifications",
    description:
      "Earn certifications in high-demand technologies that are valued by employers worldwide.",
  },
  {
    title: "Enhanced Placement Opportunities",
    description:
      "Gain a significant advantage in the job market with specialized skills and direct connections to our hiring partners.",
  },
];

export const programsOffered = [
  {
    title: "Full-Stack Web Development",
    description:
      "Master both front-end and back-end technologies to build complete web applications.",
    Icon: LuCode2,
    tags: ["React", "Node.js", "Python"],
  },
  {
    title: "AI & Machine Learning",
    description:
      "Dive into the world of artificial intelligence, data science, and predictive analytics.",
    Icon: LuBrainCircuit,
    tags: ["Python", "TensorFlow", "Analytics"],
  },
  {
    title: "Professional Internship Program",
    description:
      "A structured internship that provides deep, hands-on experience on enterprise-level projects.",
    Icon: LuBriefcase,
    tags: ["6-Month Program", "Live Projects"],
  },
];

export const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "Django",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Google Cloud",
  "Firebase",
  "Tailwind CSS",
  "Figma",
  "Git",
];

export const mediaGallery = [
  {
    src: "https://placehold.co/600x400.png",
    alt: "Inauguration Ceremony",
    hint: "ceremony event",
  },
  {
    src: "https://placehold.co/600x400.png",
    alt: "Students in a workshop",
    hint: "workshop students",
  },
  {
    src: "https://placehold.co/600x400.png",
    alt: "Code review session",
    hint: "code review",
  },
  {
    src: "https://placehold.co/600x400.png",
    alt: "Project presentation",
    hint: "student presentation",
  },
];

export const successStories = [
  {
    quote:
      "The program gave me the confidence to tackle complex problems. I landed a job at a top tech company right after graduation.",
    name: "Aarav Sharma",
    role: "Software Engineer, TechCorp",
    avatar: "https://placehold.co/100x100.png",
    hint: "man portrait",
  },
  {
    quote:
      "The hands-on experience was invaluable. I learned more in six months at the Center of Excellence than in my previous two years of college.",
    name: "Priya Singh",
    role: "Data Analyst, Innovate Inc.",
    avatar: "https://placehold.co/100x100.png",
    hint: "woman portrait",
  },
  {
    quote:
      "The mentorship I received was world-class. It helped me bridge the gap between theory and practical application perfectly.",
    name: "Rohan Gupta",
    role: "Full-Stack Developer, StartupX",
    avatar: "https://placehold.co/100x100.png",
    hint: "professional man",
  },
];

export const testimonials = [
  {
    quote:
      "This collaboration has transformed our curriculum, making our students significantly more employable.",
    name: "Dr. Meena Desai",
    role: "HOD, Computer Science Dept.",
    avatar: "https://placehold.co/100x100.png",
    hint: "professor portrait",
  },
  {
    quote:
      "An incredible opportunity to learn from industry experts without leaving campus. It's the best part of my college experience.",
    name: "Sneha Patil",
    role: "Final Year Student",
    avatar: "https://placehold.co/100x100.png",
    hint: "student portrait",
  },
  {
    quote:
      "Training these students is a joy. They are motivated, talented, and eager to learn the skills that matter in the real world.",
    name: "Rajesh Kumar",
    role: "Senior Trainer, Paarsh Infotech",
    avatar: "https://placehold.co/100x100.png",
    hint: "trainer portrait",
  },
];

export const milestones = [
  {
    date: "2021",
    title: "First Partnership",
    description: "Launched our first Center of Excellence with Sandip University.",
    Icon: LuFlag,
  },
  {
    date: "2022",
    title: "Program Expansion",
    description: "Expanded to five partner colleges across the region.",
    Icon: LuTrendingUp,
  },
  {
    date: "2023",
    title: "100+ Students Trained",
    description: "Successfully trained and certified over 100 students in advanced technologies.",
    Icon: LuUsers,
  },
  {
    date: "2024",
    title: "First Placement Drive",
    description: "Hosted our first exclusive placement drive for program graduates, achieving an 85% placement rate.",
    Icon: LuTrophy,
  },
];

export const upcomingEvents = [
  {
    title: "AI & Machine Learning Workshop",
    date: "October 15, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "K. K. Wagh College",
    type: "Workshop",
  },
  {
    title: "Hackathon: Build for the Future",
    date: "November 5-6, 2024",
    time: "24 Hours",
    location: "Sandip University",
    type: "Competition",
  },
  {
    title: "Industry Expert Talk: Cloud Computing",
    date: "December 1, 2024",
    time: "2:00 PM - 3:00 PM",
    location: "Online Webinar",
    type: "Webinar",
  },
];

export const awards = [
    { title: "Best Industry-Academia Collaboration", description: "Awarded by the National Education Council for our impactful partnership model.", Icon: LuAward, year: 2023 },
    { title: "Top 10 Skilling Initiative", description: "Recognized by TechSkills Forum for excellence in technology training.", Icon: LuBookOpen, year: 2023 },
    { title: "Innovation in Education Award", description: "Honored for our unique approach to live project-based learning.", Icon: LuLightbulb, year: 2024 },
];

export const faqs = [
    {
        question: "Who is eligible to join the programs?",
        answer: "The programs are primarily for students of our partner colleges. Eligibility criteria may vary based on the specific course or program. Please check with your college's placement cell."
    },
    {
        question: "Is there a fee for these programs?",
        answer: "Program fees and structures are decided in collaboration with our partner institutions. Some programs may be integrated into the college curriculum, while others might have a separate fee."
    },
    {
        question: "What is the duration of the internship program?",
        answer: "Our standard internship program runs for 6 months, providing an immersive, in-depth experience. The duration can sometimes be adjusted based on academic calendars."
    },
    {
        question: "Do you provide placement assistance?",
        answer: "Yes, a key benefit of our program is enhanced placement support. We host exclusive placement drives and connect our top-performing students with our network of hiring partners."
    }
];
