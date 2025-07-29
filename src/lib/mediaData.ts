


export const mediaCategories = ["All", "Office Culture", "Sports", "Parties", "Celebrations"] as const;

export interface MediaItem {
  src: string;
  alt: string;
  category: typeof mediaCategories[number] | "All";
  hint: string;
}

export interface PhotoSliderImage {
  id: number;
  src: string;
  alt: string;
  hint: string;
}

export interface BehindTheScenesItem {
  id: number;
  image: string;
  hint: string;
  title: string;
  description: string;
}

export interface EventRecap {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  hint: string;
  gallery: { src: string; alt: string; hint: string }[];
}

export interface EmployeeSpotlightItem {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  hint: string;
}


export const mediaGalleryItems: MediaItem[] = [
  { src: "https://placehold.co/600x600.png", alt: "Team Meeting", category: "Office Culture", hint: "team meeting" },
  { src: "https://placehold.co/600x600.png", alt: "Cricket Match", category: "Sports", hint: "cricket sport" },
  { src: "https://placehold.co/600x600.png", alt: "Diwali Celebration", category: "Celebrations", hint: "diwali celebration" },
  { src: "https://placehold.co/600x600.png", alt: "New Year Party", category: "Parties", hint: "office party" },
  { src: "https://placehold.co/600x600.png", alt: "Collaborative Session", category: "Office Culture", hint: "team collaboration" },
  { src: "https://placehold.co/600x600.png", alt: "Team Lunch", category: "Parties", hint: "team lunch" },
  { src: "https://placehold.co/600x600.png", alt: "Annual Sports Day", category: "Sports", hint: "sports day" },
  { src: "https://placehold.co/600x600.png", alt: "Independence Day", category: "Celebrations", hint: "independence day" },
  { src: "https://placehold.co/600x600.png", alt: "Project Launch Party", category: "Parties", hint: "launch party" },
  { src: "https://placehold.co/600x600.png", alt: "Coding Session", category: "Office Culture", hint: "developer coding" },
  { src: "https://placehold.co/600x600.png", alt: "Holi Festival", category: "Celebrations", hint: "holi festival" },
  { src: "https://placehold.co/600x600.png", alt: "Foosball Game", category: "Sports", hint: "foosball game" },
];

export const photoSliderImages: PhotoSliderImage[] = [
    { id: 1, src: "https://placehold.co/600x400.png", alt: "Company Anniversary", hint: "company anniversary" },
    { id: 2, src: "https://placehold.co/600x400.png", alt: "Team Outing", hint: "team outing" },
    { id: 3, src: "https://placehold.co/600x400.png", alt: "Awards Night", hint: "award ceremony" },
    { id: 4, src: "https://placehold.co/600x400.png", alt: "Hackathon Winners", hint: "hackathon event" },
    { id: 5, src: "https://placehold.co/600x400.png", alt: "Birthday Celebration", hint: "birthday cake" },
    { id: 6, src: "https://placehold.co/600x400.png", alt: "Workshop Session", hint: "workshop collaboration" },
];

export const behindTheScenesData: BehindTheScenesItem[] = [
  {
    id: 1,
    image: "https://placehold.co/600x400.png",
    hint: "team brainstorming",
    title: "Daily Standups & Brainstorms",
    description: "Where great ideas are born. Our daily huddles are collaborative, energetic, and focused on solving challenges together."
  },
  {
    id: 2,
    image: "https://placehold.co/600x400.png",
    hint: "developer coding",
    title: "Deep Focus Work",
    description: "We value focused time to code, design, and create. Our workspace is designed to help everyone do their best work without distractions."
  },
  {
    id: 3,
    image: "https://placehold.co/600x400.png",
    hint: "client presentation",
    title: "Client Collaboration",
    description: "Partnership is key. We work closely with our clients, involving them in the process to ensure we build solutions that truly meet their needs."
  }
];


export const eventRecaps: EventRecap[] = [
  {
    id: 1,
    title: "Annual Tech Conference 2023",
    date: "December 15, 2023",
    description: "Our team attended and presented at the annual tech conference, sharing insights on modern web development.",
    image: "https://placehold.co/600x400.png",
    hint: "tech conference",
    gallery: [
      { src: "https://placehold.co/800x600.png", alt: "Speaker on stage", hint: "conference speaker" },
      { src: "https://placehold.co/800x600.png", alt: "Team at the conference", hint: "conference team" },
      { src: "https://placehold.co/800x600.png", alt: "Networking session", hint: "professional networking" },
    ],
  },
  {
    id: 2,
    title: "Foundation Day Celebration",
    date: "November 05, 2023",
    description: "We celebrated another year of growth and success with our amazing team and their families.",
    image: "https://placehold.co/600x400.png",
    hint: "company celebration",
    gallery: [
      { src: "https://placehold.co/800x600.png", alt: "Cake cutting ceremony", hint: "cake celebration" },
      { src: "https://placehold.co/800x600.png", alt: "Group photo of the team", hint: "team photo" },
      { src: "https://placehold.co/800x600.png", alt: "Fun activities", hint: "office games" },
    ],
  },
  {
    id: 3,
    title: "Interns Graduation Day",
    date: "September 30, 2023",
    description: "Bidding farewell to our talented batch of interns with a day of presentations, awards, and celebrations.",
    image: "https://placehold.co/600x400.png",
    hint: "graduation ceremony",
    gallery: [
      { src: "https://placehold.co/800x600.png", alt: "Interns giving presentations", hint: "student presentation" },
      { src: "https://placehold.co/800x600.png", alt: "Receiving certificates", hint: "certificate award" },
      { src: "https://placehold.co/800x600.png", alt: "Celebratory lunch", hint: "team lunch" },
    ],
  }
];

export const mediaTestimonials = [
  {
    quote: "The culture at Paarsh is incredible. There's a real sense of family, and everyone is always willing to help each other out.",
    name: "Amit Patel",
    role: "Senior Software Engineer",
    avatar: "https://placehold.co/100x100.png",
    hint: "man portrait"
  },
  {
    quote: "I started as an intern, and the company has invested so much in my growth. The learning opportunities are endless.",
    name: "Sunita Reddy",
    role: "Full Stack Developer",
    avatar: "https://placehold.co/100x100.png",
    hint: "woman portrait"
  },
  {
    quote: "From team lunches to festival celebrations, there's always something happening. It's a fun and vibrant place to work.",
    name: "Rajesh Kumar",
    role: "DevOps Engineer",
    avatar: "https://placehold.co/100x100.png",
    hint: "professional man"
  },
];

export const employeeSpotlight: EmployeeSpotlightItem = {
  name: "Priya Sharma",
  role: "Lead UI/UX Designer",
  quote: "The best part about working here is the creative freedom and the supportive team. Every day brings a new opportunity to learn and create something amazing.",
  avatar: "https://placehold.co/400x400.png",
  hint: "professional woman"
};
