import { Lightbulb, Code, Users, Rocket } from 'lucide-react';
import type { LucideIcon } from "lucide-react";

export const jobOpenings = {
  fullTime: [
    {
      title: "Senior React Developer",
      experience: "3-5 years",
      location: "Nashik, India (Remote options)",
      description: "Design and build scalable, high-performance web applications using the latest frontend technologies.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      posted: "1 month ago",
    },
    {
      title: "Lead Python/Django Engineer",
      experience: "5+ years",
      location: "Nashik, India",
      description: "Lead our backend team, architect robust systems, and drive the technical direction of our core products.",
      skills: ["Python", "Django", "PostgreSQL", "DRF"],
      posted: "2 weeks ago",
    },
    {
      title: "UI/UX Designer",
      experience: "2-4 years",
      location: "Remote",
      description: "Craft beautiful, intuitive, and user-centered designs for our web and mobile applications.",
      skills: ["Figma", "Adobe XD", "User Research"],
      posted: "3 days ago",
    },
    {
      title: "DevOps Engineer",
      experience: "3+ years",
      location: "Nashik, India",
      description: "Manage and scale our cloud infrastructure, ensuring reliability, security, and performance.",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      posted: "1 month ago",
    },
  ],
  internships: [
    {
      title: "Frontend Development Intern",
      experience: "0-1 years",
      location: "Nashik, India",
      description: "An exciting opportunity to learn and contribute to live frontend projects using React and modern web tools.",
      skills: ["HTML", "CSS", "JavaScript", "React"],
      posted: "1 week ago",
    },
    {
      title: "Backend Development Intern",
      experience: "0-1 years",
      location: "Nashik, India",
      description: "Dive into backend development, working with Python, Django, and SQL under expert mentorship.",
      skills: ["Python", "Django", "SQL"],
      posted: "1 week ago",
    },
    {
      title: "Graphic Design Intern",
      experience: "0-1 years",
      location: "Remote",
      description: "Create compelling visual assets for our marketing campaigns, social media, and product interfaces.",
      skills: ["Adobe Photoshop", "Illustrator", "Canva"],
      posted: "2 months ago",
    },
  ],
};

export const lifeAtPaarshImages = [
  { src: "https://placehold.co/600x400.png", alt: "Team collaborating in a meeting", hint: "team meeting" },
  { src: "https://placehold.co/600x400.png", alt: "Celebrating a project launch", hint: "office celebration" },
  { src: "https://placehold.co/600x400.png", alt: "Annual company picnic", hint: "company picnic" },
  { src: "https://placehold.co/600x400.png", alt: "Interns receiving certificates", hint: "certificate ceremony" },
  { src: "https://placehold.co/600x400.png", alt: "Hackathon event in progress", hint: "hackathon event" },
  { src: "https://placehold.co/600x400.png", alt: "Casual Friday team lunch", hint: "team lunch" },
];

export const successStoriesData = [
  {
    quote: "My internship at Paarsh Infotech was a turning point. Working on real projects gave me the confidence and skills I needed to start my career as a full-stack developer.",
    name: "Priya Sharma",
    role: "Former Intern, now Software Engineer at TechCorp",
    avatar: "https://placehold.co/100x100.png",
    hint: "professional woman"
  },
  {
    quote: "The mentorship and support I received were incredible. The senior developers are always ready to help and guide you. It’s a fantastic learning environment.",
    name: "Rajesh Kumar",
    role: "Former Intern, now Backend Developer",
    avatar: "https://placehold.co/100x100.png",
    hint: "professional man"
  },
  {
    quote: "Paarsh Infotech doesn't just give you tasks; they give you ownership. I felt like a valued member of the team from day one.",
    name: "Anjali Mehta",
    role: "Former UI/UX Intern",
    avatar: "https://placehold.co/100x100.png",
    hint: "woman developer"
  },
];

export const growthOpportunitiesData: { title: string; description: string; Icon: LucideIcon }[] = [
    { title: "Live Project Experience", description: "Gain invaluable hands-on experience by contributing to real-world client projects from day one.", Icon: Code },
    { title: "Expert Mentorship", description: "Learn from the best. Our senior developers provide dedicated mentorship and guidance.", Icon: Users },
    { title: "Skill Development Workshops", description: "Participate in regular training sessions on the latest technologies and industry best practices.", Icon: Lightbulb },
    { title: "Clear Career Pathways", description: "We provide a clear roadmap for growth, from intern to junior and senior roles within the company.", Icon: Rocket },
];

export const faqsData = [
    {
        question: "What is the interview process like?",
        answer: "Our interview process typically consists of three stages: an initial screening call, a technical assessment or portfolio review, and a final interview with the team lead. We aim to make it a transparent and positive experience."
    },
    {
        question: "Are remote work options available?",
        answer: "Yes, we offer remote and hybrid work options for many of our roles. Please check the specific job description for details on the location requirements for each position."
    },
    {
        question: "What is the duration of the internship program?",
        answer: "Our standard internship program runs for 3 to 6 months. This duration allows interns to get deeply involved in projects and gain substantial experience."
    },
    {
        question: "What kind of projects will I work on as an intern?",
        answer: "Interns at Paarsh Infotech work on live client projects under the guidance of a mentor. This provides real-world experience and a chance to contribute to meaningful work."
    },
    {
        question: "Do you offer full-time positions to interns?",
        answer: "We have a strong track record of hiring our top-performing interns for full-time positions. We believe in nurturing talent from within."
    }
];

export const introSectionData = {
    ceoQuote: "We are not just building software; we are building careers. Our focus is on creating an environment where talent can thrive, innovate, and grow with us.",
    ceoName: "Kantilal Pagare",
    ceoTitle: "Founder & Chairman",
    imageSrc: "https://placehold.co/600x400.png",
    imageHint: "team discussion"
}
