import { NextResponse } from "next/server";
import { knowledgeBase } from "@/lib/chatbot-knowledge-base";

// Build a simple keyword → answer lookup from the knowledge base sections
const responses = [
  {
    keywords: ["hello", "hi", "hey", "greet", "good morning", "good afternoon", "good evening"],
    reply: "Hi there! 👋 Welcome to Paarsh Infotech. How can I help you today?",
  },
  {
    keywords: ["about", "company", "paarsh", "who are you", "what is paarsh", "founded", "established"],
    reply:
      "Paarsh Infotech Pvt. Ltd. is a leading software development company based in Nashik, Maharashtra, India. Founded in 2018 and incorporated in March 2022, we specialize in web development, mobile apps, AI/ML, UI/UX design, and digital marketing. We have 120+ happy clients, 30+ completed projects, and 45+ dedicated team members.",
  },
  {
    keywords: ["service", "offer", "provide", "do you do", "what do you"],
    reply:
      "We offer a wide range of IT services:\n• Web Development\n• Software Development\n• Mobile App Development\n• E-commerce Solutions\n• AI and Machine Learning\n• UI/UX Design\n• Digital Marketing\n• Graphic & Logo Designing\n• Software Testing\n\nFeel free to ask about any specific service!",
  },
  {
    keywords: ["web", "website", "web development", "web app"],
    reply:
      "Our Web Development team builds responsive, high-performance websites and web applications including custom web apps, CMS platforms, progressive web apps (PWAs), and API integrations.",
  },
  {
    keywords: ["mobile", "app", "android", "ios", "flutter", "react native"],
    reply:
      "We develop both native (iOS & Android) and cross-platform mobile applications using React Native and Flutter, with a focus on intuitive UX, performance, and scalability.",
  },
  {
    keywords: ["software", "enterprise", "saas", "legacy", "integration"],
    reply:
      "Our Software Development team delivers custom enterprise software, SaaS products, system integrations, and legacy system modernization tailored to your business challenges.",
  },
  {
    keywords: ["ecommerce", "e-commerce", "shop", "shopify", "woocommerce", "online store"],
    reply:
      "We build feature-rich e-commerce platforms including custom stores, Shopify, and WooCommerce solutions with payment gateway integration, inventory management, and order tracking.",
  },
  {
    keywords: ["ai", "machine learning", "ml", "nlp", "chatbot", "prediction", "recommendation"],
    reply:
      "We develop intelligent AI/ML systems for predictive analytics, natural language processing (NLP), chatbots, computer vision, and recommendation engines.",
  },
  {
    keywords: ["ui", "ux", "design", "wireframe", "prototype", "figma"],
    reply:
      "Our UI/UX Design team creates intuitive and visually appealing interfaces through user research, wireframing, prototyping, and usability testing.",
  },
  {
    keywords: ["digital marketing", "seo", "social media", "marketing", "content"],
    reply:
      "We offer digital marketing services including SEO, social media marketing, and content marketing to enhance your online presence and reach.",
  },
  {
    keywords: ["product", "glowvita", "salon", "paarshedu", "nursery", "flagship"],
    reply:
      "Our flagship products include:\n• GlowvitaSalon – Complete salon management (bookings, inventory, customers)\n• PaarshEdu – Modern educational platform\n• Nursery Solutions – Management solution for plant nurseries",
  },
  {
    keywords: ["internship", "intern", "student", "training", "program"],
    reply:
      "We offer a 3-6 month internship program for BE, MCA, MCS, and IT students. You'll get hands-on experience on live projects, mentorship, full-stack training, and placement assistance with access to 200+ recruiters. Top interns are often hired full-time!",
  },
  {
    keywords: ["career", "job", "hire", "hiring", "vacancy", "opening", "work with"],
    reply:
      "We're always looking for talented individuals! We have opportunities in web development, mobile app development, UI/UX design, software testing, and digital marketing. Our hiring process includes a screening call, technical assessment, and a final interview. Visit our Careers page to see current openings.",
  },
  {
    keywords: ["contact", "reach", "email", "phone", "call", "get in touch"],
    reply:
      "You can reach us at:\n📧 info@paarshinfotech.com\n📧 paarshinfotech@gmail.com\n📞 +91 90752 01035\n📍 Office No. 1, Bhakti Apartment, Suchita Nagar, Mumbai Naka, Nashik, Maharashtra 422009\n\n🕐 Mon–Fri: 9:30 AM – 6:30 PM | Sat: 10:00 AM – 4:00 PM",
  },
  {
    keywords: ["location", "address", "office", "nashik", "pune", "surat", "sangli", "dharwad", "jalgaon"],
    reply:
      "We have offices across India:\n• Nashik (HQ): Suchita Nagar, Mumbai Naka\n• Pune, Maharashtra\n• Sangli: Pragati Colony, 100 Ft. Road\n• Surat: Exceluss Business Space, Althan\n• Dharwad: Shelke Complex, Mankilla\n• Jalgaon: Gurukul Colony, Near MJ College",
  },
  {
    keywords: ["quote", "price", "cost", "estimate", "how much", "pricing", "demo", "request"],
    reply:
      "Getting a quote is easy! Simply fill out our 'Get a Quote' form on the website with your project details. We offer a free initial consultation and typically respond within 24–48 hours. You can also visit our Quote page directly.",
  },
  {
    keywords: ["technology", "stack", "tech", "tools", "framework", "language"],
    reply:
      "Our technology stack includes:\n• Frontend: React, Next.js, HTML5, CSS3, JavaScript\n• Backend: Python, Django, Node.js\n• Databases: PostgreSQL, MongoDB\n• Mobile: React Native, Flutter, Swift, Kotlin\n• DevOps: Docker, AWS, Google Cloud, Firebase\n• Tools: Git, Jira, Figma",
  },
  {
    keywords: ["client", "review", "testimonial", "feedback", "rating", "glassdoor", "ambitionbox"],
    reply:
      "We have 120+ happy clients across retail, education, healthcare, salon management, and e-commerce. Our Glassdoor rating is 3.8/5 and AmbitionBox rating is 4.0/5, praised for our supportive environment and innovation focus.",
  },
  {
    keywords: ["thank", "thanks", "appreciate", "great", "awesome", "good"],
    reply:
      "You're welcome! 😊 Is there anything else I can help you with? Feel free to ask about our services, careers, or anything else about Paarsh Infotech.",
  },
  {
    keywords: ["bye", "goodbye", "see you", "later", "that's all"],
    reply:
      "Thank you for reaching out to Paarsh Infotech! Have a wonderful day. Feel free to come back anytime. 👋",
  },
];

const defaultReply =
  "Thank you for your message! I'm not sure I have specific information on that. For detailed inquiries, please contact us at info@paarshinfotech.com or call +91 90752 01035. Our team will be happy to assist you!";

function getReply(message) {
  const lower = message.toLowerCase().trim();

  for (const item of responses) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.reply;
    }
  }

  // Fallback: search the knowledge base for any partial match
  const words = lower.split(/\s+/).filter((w) => w.length > 3);
  const kbLower = knowledgeBase.toLowerCase();
  for (const word of words) {
    if (kbLower.includes(word)) {
      return `I found some information related to "${word}" in our knowledge base. For detailed information, please contact us at info@paarshinfotech.com or call +91 90752 01035. Our team will be happy to help!`;
    }
  }

  return defaultReply;
}

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const reply = getReply(message);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chatbot API error:", error);
    return NextResponse.json({ error: "An internal error occurred." }, { status: 500 });
  }
}
