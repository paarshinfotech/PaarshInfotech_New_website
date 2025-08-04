"use client";

import { motion } from "framer-motion";
import { 
  FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaAws,
  FaGoogle
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiDjango, SiPostgresql, 
         SiMongodb, SiFirebase, SiTailwindcss, SiSpringboot, SiKotlin, 
         SiKubernetes} from "react-icons/si";

const technologies = [
  { name: "React", icon: FaReact, color: "text-blue-500" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-black" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
  { name: "Python", icon: FaPython, color: "text-yellow-500" },
  { name: "Django", icon: SiDjango, color: "text-green-600" },
  { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-700" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
  { name: "Docker", icon: FaDocker, color: "text-blue-500" },
  { name: "Kubernetes", icon: SiKubernetes, color: "text-blue-400" },
  { name: "AWS", icon: FaAws, color: "text-orange-500" },
  { name: "Google Cloud", icon: FaGoogle, color: "text-blue-400" },
  { name: "Firebase", icon: SiFirebase, color: "text-orange-500" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-500" },
  { name: "Java", icon: FaJava, color: "text-red-600" },
  { name: "Spring Boot", icon: SiSpringboot, color: "text-green-600" },
  { name: "Kotlin", icon: SiKotlin, color: "text-purple-500" }
];

// Split the array into two halves
const midPoint = Math.ceil(technologies.length / 2);
const firstRow = technologies.slice(0, midPoint);
const secondRow = technologies.slice(midPoint);

export default function TechStackShowcase() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Powering Innovation with a Modern Tech Stack
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We leverage cutting-edge technologies to build solutions that are not just powerful and scalable, but also future-proof.
          </p>
        </motion.div>
        
        <div className="relative flex flex-col gap-8 overflow-hidden py-4">
          {/* Left-to-Right Scrolling Row */}
          <div className="flex space-x-8 animate-scroll-left">
            {[...firstRow, ...firstRow].map((tech, index) => (
              <motion.div
                key={`first-${index}-${tech.name}`}
                className="flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.2,
                  y: -10,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex flex-col items-center justify-center p-4">
                  <tech.icon className={`w-10 h-10 ${tech.color} transition-all duration-300 group-hover:scale-110`} />
                  <span className="mt-3 text-xs font-medium text-gray-600">{tech.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Right-to-Left Scrolling Row */}
          <div className="flex space-x-8 animate-scroll-right">
            {[...secondRow, ...secondRow].map((tech, index) => (
              <motion.div
                key={`second-${index}-${tech.name}`}
                className="flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.2,
                  y: -10,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex flex-col items-center justify-center p-4">
                  <tech.icon className={`w-10 h-10 ${tech.color} transition-all duration-300 group-hover:scale-110`} />
                  <span className="mt-3 text-xs font-medium text-gray-600">{tech.name}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gradient overlays for fade effect */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
        
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}