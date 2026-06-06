
"use client";

import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "919075201035";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function Chatbot() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center h-14 w-14 rounded-full shadow-lg bg-[#25D366] hover:bg-[#20bd5a] transition-colors duration-200"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="h-8 w-8 text-white" />
      </a>
    </motion.div>
  );
}
