import { LuPhone, LuMail, LuLinkedin, LuTwitter, LuInstagram, LuFacebook } from 'react-icons/lu';
import type { IconType } from 'react-icons';

export const contactInfo = [
    {
        Icon: LuPhone,
        title: "Phone",
        value: "+91 90752 01035",
        href: "tel:+9190752 01035",
    },
    {
        Icon: LuMail,
        title: "Primary Email",
        value: "info@paarshinfotech.com",
        href: "mailto:info@paarshinfotech.com",
    },
    {
        Icon: LuMail,
        title: "Secondary Email",
        value: "paarshinfotech@gmail.com",
        href: "mailto:paarshinfotech@gmail.com",
    },
];

export const officeLocations = [
    {
        city: "Nashik Office (HQ)",
        address: "Business Plus, A Wing, 5th Floor, Office No. 505, 506, Near Sai Square, Mumbai Naka, Nashik, Maharashtra, India",
        pincode: "422009",
        mapUrl: "https://maps.app.goo.gl/saW7u7iZpXAMsTsy7"
    },
    {
        city: "Pune Office",
        address: "Second floor, Wisteriaa Fortune, Bhumkar Das Gugre Rd, Near Bhumkar Chowk, Wakad, Pune, Maharashtra, India",
        pincode: "411057",
        mapUrl: "https://maps.app.goo.gl/E6gmW2WiksXE3eDeA"
    },
    {
        city: "Sangli Office",
        address: "G1 Pragati Residency, Lane No. 4, Pragati Colony, Near Diamond Hotel, 100 Ft. Road, Sangli, Maharashtra, India",
        pincode: "416416",
        mapUrl: "https://maps.app.goo.gl/saW7u7iZpXAMsTsy7"
    },
    {
        city: "Surat Office",
        address: "Office No. 12, Exceluss Business Space, Bhimrad Canal Road, Althan, Surat, Gujarat, India",
        pincode: "395017",
        mapUrl: "https://maps.app.goo.gl/Fuyc2qENvXAssq1D6"
    },
    {
        city: "Jalgaon Office",
        address: "Gurukul Colony, near MJ College, Beside JDCC Bank, Jalgaon, Maharashtra, India",
        pincode: "425001",
        mapUrl: "https://maps.app.goo.gl/7AMoF7TMVWj9u23C6"
    },
    {
        city: "Dharwad Office",
        address: "Dharwad, Karnataka, India",
        pincode: "580001",
        mapUrl: "#"
    },
];

export const workingHours = [
    { day: "Monday - Saturday", hours: "09:30 AM – 06:30 PM" },
    { day: "Sunday", hours: "Closed" },
];

export const contactFAQs = [
    {
        question: "What is the typical response time?",
        answer: "We strive to respond to all inquiries within 24 business hours. For urgent matters, we recommend calling us directly."
    },
    {
        question: "How can I get a quote for my project?",
        answer: "The best way to get a quote is by filling out our detailed quote request form on the 'Get a Quote' page. This allows us to understand your requirements thoroughly and provide an accurate estimate."
    },
    {
        question: "Do you offer consultations?",
        answer: "Yes, we offer free initial consultations to discuss your project ideas and how we can help. Please contact us to schedule a call."
    },
    {
        question: "Where can I find information about careers?",
        answer: "All our job openings and internship opportunities are listed on our 'Careers' page. You can apply directly through the application forms provided there."
    }
];

export const socialLinks: { name: string, Icon: IconType, href: string }[] = [
    { name: "LinkedIn", Icon: LuLinkedin, href: "https://www.linkedin.com/company/paarsh-infotech-private-limited/" },
    { name: "Facebook", Icon: LuFacebook, href: "#" },
    { name: "Twitter", Icon: LuTwitter, href: "#" },
    { name: "Instagram", Icon: LuInstagram, href: "https://www.instagram.com/paarsh_infotech?igsh=MWw3cmc2OG1oc3hwZw==" },
];
