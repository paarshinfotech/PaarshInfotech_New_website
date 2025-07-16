
import { Code, Server, Smartphone, ShoppingCart, BrainCircuit, PenTool, Award, Zap, Gem, Users, Search, Rocket, LifeBuoy, TrendingUp, CheckCircle, BarChart } from 'lucide-react';
import type { LucideIcon } from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  overview: string;
  heroImage: string;
  offerings: {
    title: string;
    description: string;
  }[];
  whyChooseUs: {
    title: string;
    description: string;
    Icon: LucideIcon;
  }[];
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    tools: string[];
  };
  process: {
    title: string;
    description: string;
    Icon: LucideIcon;
  }[];
  impact: {
    title: string;
    metric: string;
    description: string;
    Icon: LucideIcon;
  }[];
  testimonial: {
    quote: string;
    name: string;
    role: string;
    avatar: string;
  };
  gallery: {
    src: string;
    alt: string;
    dataAiHint: string;
  }[];
  industries: string[];
}

export const servicesData: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    description: "Creating responsive, powerful, and user-friendly websites tailored to your business needs.",
    Icon: Code,
    overview: "We build high-performance websites that are not only visually stunning but also functionally robust. From corporate sites to complex web applications, our solutions are designed to engage your audience and drive business growth.",
    heroImage: "https://placehold.co/600x400.png",
    offerings: [
      { title: "Custom Web Applications", description: "Tailored solutions to meet your unique business requirements." },
      { title: "Content Management Systems (CMS)", description: "Easy-to-manage websites powered by platforms like WordPress or custom solutions." },
      { title: "Progressive Web Apps (PWAs)", description: "App-like experiences on the web for enhanced user engagement." },
      { title: "Website Maintenance & Support", description: "Ongoing support to keep your site secure and up-to-date." },
      { title: "API Development & Integration", description: "Connecting your website with third-party services and data sources." },
      { title: "Performance Optimization", description: "Ensuring your website is fast, reliable, and scalable." },
    ],
    whyChooseUs: [
        { title: "Expert Team", description: "Our developers are experts in modern web technologies.", Icon: Users },
        { title: "Scalable Architecture", description: "We build websites that grow with your business.", Icon: Gem },
        { title: "Fast Turnaround", description: "Efficient processes to deliver your project on time.", Icon: Zap },
        { title: "Proven Results", description: "A portfolio of successful web projects.", Icon: Award },
    ],
    techStack: {
      frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Python", "Django"],
      database: ["PostgreSQL", "MongoDB", "MySQL"],
      tools: ["Docker", "Git", "Webpack"],
    },
    process: [
      { title: "Discover", description: "Understanding your vision, goals, and requirements.", Icon: Search },
      { title: "Design", description: "Crafting intuitive UI/UX and technical architecture.", Icon: PenTool },
      { title: "Develop", description: "Writing clean, efficient, and scalable code.", Icon: Code },
      { title: "Deploy", description: "Seamless deployment with rigorous testing.", Icon: Rocket },
      { title: "Dedicate", description: "Ongoing support and maintenance for long-term success.", Icon: LifeBuoy },
    ],
    impact: [
      { title: "Increased User Engagement", metric: "+45%", description: "With intuitive UI/UX and fast load times.", Icon: Users },
      { title: "Higher Conversion Rates", metric: "+30%", description: "Through optimized user journeys and clear CTAs.", Icon: CheckCircle },
    ],
    testimonial: {
      quote: "Paarsh Infotech transformed our online presence. Their web development team delivered a fast, beautiful, and highly functional website that our users love.",
      name: "Rohan Gupta",
      role: "Marketing Director, Creative Solutions",
      avatar: "https://placehold.co/100x100.png"
    },
    gallery: [
        { src: "https://placehold.co/600x400.png", alt: "E-commerce dashboard", dataAiHint: "dashboard analytics" },
        { src: "https://placehold.co/600x400.png", alt: "Corporate website homepage", dataAiHint: "website homepage" },
        { src: "https://placehold.co/600x400.png", alt: "Booking system interface", dataAiHint: "calendar booking" },
    ],
    industries: ["E-commerce", "Healthcare", "Education", "Real Estate", "Finance"],
  },
  {
    slug: "software-development",
    title: "Software Development",
    description: "Custom software solutions to streamline your operations and drive efficiency.",
    Icon: Server,
    overview: "We engineer custom software solutions that solve complex business challenges. Our process focuses on scalability, reliability, and creating tools that empower your team and streamline your operations for maximum efficiency.",
    heroImage: "https://placehold.co/600x400.png",
    offerings: [
      { title: "Enterprise Software", description: "Large-scale applications to manage business operations." },
      { title: "SaaS Product Development", description: "Building market-ready Software-as-a-Service products from scratch." },
      { title: "System Integration", description: "Connecting disparate systems for seamless data flow." },
      { title: "Legacy System Modernization", description: "Updating outdated software with modern technology." },
      { title: "Cloud Application Development", description: "Building and deploying applications on AWS, Google Cloud, and Azure." },
      { title: "Quality Assurance & Testing", description: "Ensuring your software is bug-free and performs flawlessly." },
    ],
    whyChooseUs: [
      { title: "Agile Methodology", description: "Iterative development for flexibility and faster delivery.", Icon: Zap },
      { title: "Domain Expertise", description: "Deep understanding of various industry verticals.", Icon: Award },
      { title: "Secure & Compliant", description: "Adherence to security best practices and industry standards.", Icon: Gem },
      { title: "Dedicated Teams", description: "A focused team of experts for your project.", Icon: Users },
    ],
    techStack: {
      frontend: ["React", "Electron", "WPF"],
      backend: ["Python", "Django", ".NET", "Java"],
      database: ["PostgreSQL", "Microsoft SQL Server", "Oracle"],
      tools: ["Jira", "Jenkins", "Kubernetes", "Azure DevOps"],
    },
    process: [
      { title: "Analysis", description: "In-depth requirement gathering and feasibility analysis.", Icon: Search },
      { title: "Architecture", description: "Designing a robust and scalable software blueprint.", Icon: PenTool },
      { title: "Implementation", description: "Coding the application with best practices.", Icon: Code },
      { title: "Deployment", description: "Smooth rollout into your production environment.", Icon: Rocket },
      { title: "Dedicate", description: "Continuous support and evolution of the software.", Icon: LifeBuoy },
    ],
    impact: [
      { title: "Operational Efficiency", metric: "+40%", description: "By automating workflows and reducing manual tasks.", Icon: TrendingUp },
      { title: "Reduced IT Costs", metric: "-25%", description: "Through modernization and cloud-native solutions.", Icon: CheckCircle },
    ],
    testimonial: {
      quote: "The custom software built by Paarsh Infotech is the backbone of our operations. It's reliable, fast, and has significantly improved our team's productivity.",
      name: "Anjali Mehta",
      role: "COO, Global Logistics",
      avatar: "https://placehold.co/100x100.png"
    },
    gallery: [
      { src: "https://placehold.co/600x400.png", alt: "CRM Dashboard", dataAiHint: "crm dashboard" },
      { src: "https://placehold.co/600x400.png", alt: "Inventory Management System", dataAiHint: "warehouse inventory" },
      { src: "https://placehold.co/600x400.png", alt: "Analytics Platform", dataAiHint: "data analytics" },
    ],
    industries: ["Logistics", "Manufacturing", "Finance", "Healthcare", "Enterprise"],
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    description: 'Building native and cross-platform mobile apps for both iOS and Android platforms.',
    Icon: Smartphone,
    overview: 'We create engaging and high-performance mobile applications for iOS and Android. Whether native or cross-platform, our apps deliver seamless user experiences, drive user retention, and help you connect with your customers on their favorite devices.',
    heroImage: 'https://placehold.co/600x400.png',
    offerings: [
      { title: 'iOS App Development', description: 'Custom iPhone and iPad apps built with Swift.' },
      { title: 'Android App Development', description: 'Powerful and scalable Android apps built with Kotlin.' },
      { title: 'Cross-Platform Development', description: 'Using React Native or Flutter for a unified codebase.' },
      { title: 'App Store Submission', description: 'Handling the entire submission process for Apple App Store and Google Play Store.' },
      { title: 'App Maintenance', description: 'Providing ongoing updates and support for your mobile app.' },
      { title: 'Mobile UI/UX Design', description: 'Designing beautiful and intuitive interfaces for mobile.' },
    ],
    whyChooseUs: [
      { title: 'User-Centric Design', description: 'Apps designed with the end-user in mind.', Icon: Users },
      { title: 'Performance Focus', description: 'Optimized for speed and responsiveness.', Icon: Zap },
      { title: 'Expert Developers', description: 'Experienced in the latest mobile technologies.', Icon: Award },
      { title: 'End-to-End Service', description: 'From idea to launch and beyond.', Icon: Gem },
    ],
    techStack: {
      frontend: ['Swift (iOS)', 'Kotlin (Android)', 'React Native', 'Flutter'],
      backend: ['Node.js', 'Firebase', 'Python'],
      database: ['SQLite', 'Realm', 'Firebase Firestore'],
      tools: ['Xcode', 'Android Studio', 'Fastlane'],
    },
    process: [
      { title: 'Strategy', description: 'Defining the app\'s purpose and target audience.', Icon: Search },
      { title: 'Design', description: 'Creating wireframes, mockups, and prototypes.', Icon: PenTool },
      { title: 'Development', description: 'Building and testing the application.', Icon: Code },
      { title: 'Launch', description: 'Deploying the app to the app stores.', Icon: Rocket },
      { title: 'Dedicate', description: 'Analyzing usage and planning future updates.', Icon: LifeBuoy },
    ],
    impact: [
      { title: 'Increased Customer Reach', metric: '+50%', description: 'By being present on both iOS and Android platforms.', Icon: Users },
      { title: 'Higher Engagement', metric: '+60%', description: 'Through push notifications and mobile-first features.', Icon: TrendingUp },
    ],
    testimonial: {
      quote: 'The mobile app developed by Paarsh Infotech has been a game-changer for our business. It\'s intuitive, fast, and has received great feedback from our users.',
      name: 'Priya Singh',
      role: 'Founder, HealthFirst',
      avatar: 'https://placehold.co/100x100.png',
    },
    gallery: [
      { src: 'https://placehold.co/600x400.png', alt: 'Fitness tracking app', dataAiHint: 'mobile fitness' },
      { src: 'https://placehold.co/600x400.png', alt: 'Food delivery app interface', dataAiHint: 'mobile food' },
      { src: 'https://placehold.co/600x400.png', alt: 'Social media app profile', dataAiHint: 'social media' },
    ],
    industries: ['Healthcare', 'Social Networking', 'Retail', 'Travel', 'Entertainment'],
  },
  {
    slug: 'ecommerce-solutions',
    title: 'E-commerce Solutions',
    description: 'Develop feature-rich online stores to sell your products and services globally.',
    Icon: ShoppingCart,
    overview: 'We provide comprehensive e-commerce solutions that enable you to sell products and services online. From beautiful storefronts to secure payment gateways and inventory management, we build platforms that drive sales and provide a seamless shopping experience.',
    heroImage: 'https://placehold.co/600x400.png',
    offerings: [
      { title: 'Custom E-commerce Platforms', description: 'Tailor-made online stores for unique business needs.' },
      { title: 'Shopify & WooCommerce Dev', description: 'Expert development on popular e-commerce platforms.' },
      { title: 'Payment Gateway Integration', description: 'Securely process payments from customers worldwide.' },
      { title: 'Inventory Management', description: 'Systems to track stock and manage products efficiently.' },
      { title: 'Subscription & Recurring Billing', description: 'Set up automated billing for your services.' },
      { title: 'Marketplace Development', description: 'Build multi-vendor platforms like Amazon or Etsy.' },
    ],
    whyChooseUs: [
        { title: 'Conversion-Focused', description: 'Designs and features aimed at maximizing sales.', Icon: TrendingUp },
        { title: 'Secure & Reliable', description: 'Protecting your business and customer data.', Icon: Gem },
        { title: 'Scalable Platforms', description: 'Stores that can handle high traffic and large catalogs.', Icon: Zap },
        { title: 'Expert Guidance', description: 'Navigating the complexities of online retail.', Icon: Users },
    ],
    techStack: {
      frontend: ['React', 'Vue.js', 'Liquid (Shopify)'],
      backend: ['Node.js', 'PHP', 'Python'],
      database: ['MySQL', 'PostgreSQL', 'MongoDB'],
      tools: ['Shopify CLI', 'Stripe', 'PayPal', 'Google Analytics'],
    },
    process: [
      { title: 'Planning', description: 'Mapping out your e-commerce strategy and features.', Icon: Search },
      { title: 'Design', description: 'Creating a visually appealing and user-friendly storefront.', Icon: PenTool },
      { title: 'Development', description: 'Building the store and integrating all necessary features.', Icon: Code },
      { title: 'Launch', description: 'Going live and setting up marketing tools.', Icon: Rocket },
      { title: 'Dedicate', description: 'Analyzing data to improve conversions and performance.', Icon: LifeBuoy },
    ],
    impact: [
      { title: 'Increased Online Sales', metric: '+70%', description: 'Through a seamless and optimized shopping experience.', Icon: TrendingUp },
      { title: 'Improved Customer Retention', metric: '+35%', description: 'With features like loyalty programs and personalized offers.', Icon: Users },
    ],
    testimonial: {
      quote: 'Our new e-commerce site from Paarsh Infotech has seen a massive increase in sales. The team was fantastic to work with and understood our vision perfectly.',
      name: 'Vikram Patel',
      role: 'CEO, Urban Apparel',
      avatar: 'https://placehold.co/100x100.png',
    },
    gallery: [
      { src: 'https://placehold.co/600x400.png', alt: 'Fashion e-commerce site', dataAiHint: 'ecommerce fashion' },
      { src: 'https://placehold.co/600x400.png', alt: 'Product detail page', dataAiHint: 'product page' },
      { src: 'https://placehold.co/600x400.png', alt: 'Shopping cart view', dataAiHint: 'shopping cart' },
    ],
    industries: ['Fashion', 'Electronics', 'Home Goods', 'Food & Beverage', 'Digital Products'],
  },
  {
    slug: 'ai-and-ml',
    title: 'AI and ML',
    description: 'Leveraging Artificial Intelligence and Machine Learning to build smart applications.',
    Icon: BrainCircuit,
    overview: 'Harness the power of Artificial Intelligence and Machine Learning to unlock new possibilities. We build intelligent systems that can automate tasks, provide predictive insights, and create personalized experiences for your users.',
    heroImage: 'https://placehold.co/600x400.png',
    offerings: [
      { title: 'Predictive Analytics', description: 'Forecast trends and behaviors using your data.' },
      { title: 'Natural Language Processing (NLP)', description: 'Build chatbots and analyze text data.' },
      { title: "Computer Vision", description: "Analyze images and videos for object detection and recognition." },
      { title: 'Recommendation Engines', description: 'Provide personalized suggestions to your users.' },
      { title: 'Data Warehousing', description: 'Structure and manage your data for ML applications.' },
      { title: 'AI Model Deployment', description: 'Integrate and deploy machine learning models into production.' },
    ],
    whyChooseUs: [
      { title: 'Data-Driven Insights', description: 'Turn your data into actionable intelligence.', Icon: BarChart },
      { title: 'Innovative Solutions', description: 'Apply cutting-edge AI techniques to solve your problems.', Icon: Gem },
      { title: 'Expert Data Scientists', description: 'A team of experienced ML engineers and data scientists.', Icon: Users },
      { title: 'Ethical AI', description: 'Building fair, transparent, and responsible AI systems.', Icon: Award },
    ],
    techStack: {
      frontend: ['React', 'Vue.js'],
      backend: ['Python'],
      database: ['BigQuery', 'Snowflake', 'PostgreSQL'],
      tools: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Jupyter'],
    },
    process: [
      { title: 'Data Exploration', description: 'Understanding and preparing your data.', Icon: Search },
      { title: 'Model Prototyping', description: 'Building and training initial models.', Icon: PenTool },
      { title: 'Development', description: 'Refining models and integrating them into applications.', Icon: Code },
      { title: 'Deployment', description: 'Making the AI system available to users.', Icon: Rocket },
      { title: 'Dedicate', description: 'Continuously tracking model performance and retraining.', Icon: LifeBuoy },
    ],
    impact: [
      { title: 'Smarter Decision-Making', metric: '90%', description: 'of decisions are now data-driven and automated.', Icon: CheckCircle },
      { title: 'Personalized Experiences', metric: '+50%', description: 'increase in user satisfaction with recommendation engines.', Icon: Users },
    ],
    testimonial: {
      quote: 'The AI solution from Paarsh Infotech has revolutionized how we approach our data. The predictive models are incredibly accurate and have given us a real competitive edge.',
      name: 'Sunita Sharma',
      role: 'Head of Analytics, Market Insights Inc.',
      avatar: 'https://placehold.co/100x100.png',
    },
    gallery: [
      { src: 'https://placehold.co/600x400.png', alt: 'Data visualization dashboard', dataAiHint: 'data dashboard' },
      { src: 'https://placehold.co/600x400.png', alt: 'Chatbot interface', dataAiHint: 'chatbot interface' },
      { src: 'https://placehold.co/600x400.png', alt: 'Predictive analytics graph', dataAiHint: 'analytics graph' },
    ],
    industries: ['Finance', 'Healthcare', 'E-commerce', 'Marketing', 'Logistics'],
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Crafting intuitive and beautiful user interfaces that enhance user experience.',
    Icon: PenTool,
    overview: 'We design digital experiences that are not only beautiful but also intuitive and user-friendly. Our UI/UX process is centered around understanding your users to create products that are engaging, easy to use, and aligned with your business goals.',
    heroImage: 'https://placehold.co/600x400.png',
    offerings: [
      { title: 'User Research & Personas', description: 'Understanding your audience to inform design decisions.' },
      { title: 'Wireframing & Prototyping', description: 'Creating interactive blueprints of your application.' },
      { title: 'User Interface (UI) Design', description: 'Designing visually stunning interfaces and design systems.' },
      { title: 'User Experience (UX) Design', description: 'Crafting seamless and logical user flows.' },
      { title: 'Usability Testing', description: 'Validating designs with real users to ensure effectiveness.' },
      { title: 'Mobile & Web Design', description: 'Creating cohesive experiences across all platforms.' },
    ],
    whyChooseUs: [
      { title: 'User-First Approach', description: 'Every design decision is backed by user research.', Icon: Users },
      { title: 'Collaborative Process', description: 'Working closely with you to bring your vision to life.', Icon: Gem },
      { title: 'Modern Aesthetics', description: 'Designs that are clean, modern, and on-brand.', Icon: Award },
      { title: 'Business-Driven Design', description: 'Aligning user needs with your business objectives.', Icon: TrendingUp },
    ],
    techStack: {
      frontend: [],
      backend: [],
      database: [],
      tools: ['Figma', 'Sketch', 'Adobe XD', 'InVision', 'Maze'],
    },
    process: [
      { title: 'Empathize', description: 'Conducting research to understand user needs.', Icon: Search },
      { title: 'Define', description: 'Identifying user problems and design goals.', Icon: PenTool },
      { title: 'Ideate', description: 'Brainstorming and creating low-fidelity designs.', Icon: Code },
      { title: 'Prototype', description: 'Building interactive models for testing.', Icon: Rocket },
      { title: 'Dedicate', description: 'Gathering feedback to refine the final design.', Icon: LifeBuoy },
    ],
    impact: [
      { title: 'Improved User Satisfaction', metric: '+65%', description: 'leading to higher retention and loyalty.', Icon: Users },
      { title: 'Reduced Development Rework', metric: '-40%', description: 'by validating designs before coding begins.', Icon: CheckCircle },
    ],
    testimonial: {
      quote: 'The UI/UX team at Paarsh is exceptional. They took our complex requirements and turned them into a simple, elegant, and user-friendly design.',
      name: 'Anita Desai',
      role: 'Product Manager, Innovate Corp',
      avatar: 'https://placehold.co/100x100.png',
    },
    gallery: [
      { src: 'https://placehold.co/600x400.png', alt: 'Mobile app wireframes', dataAiHint: 'app wireframe' },
      { src: 'https://placehold.co/600x400.png', alt: 'Web application design system', dataAiHint: 'design system' },
      { src: 'https://placehold.co/600x400.png', alt: 'User journey map', dataAiHint: 'journey map' },
    ],
    industries: ['SaaS', 'Startups', 'Enterprise', 'Mobile Apps', 'E-commerce'],
  },
];
