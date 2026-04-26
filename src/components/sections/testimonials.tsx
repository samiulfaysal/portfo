'use client';

import { useState, useEffect } from 'react';
// 1. Import 'Variants' from framer-motion
import { motion, AnimatePresence, Variants } from 'framer-motion'; 
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "Sami successfully centralized our entire infrastructure into HubSpot CRM and ProcessWire. His expertise in managing complex deployments was critical.",
    author: "Andreas",
    role: "Enterprise Client",
    tags: ["HubSpot", "ProcessWire"]
  },
  {
    quote: "The brand identity Sami developed for our startup perfectly captures the premium, hi-tech feeling we needed. Minimalist and innovative.",
    author: "Codorax Internal",
    role: "Brand Lead",
    tags: ["Identity", "Branding"]
  },
  {
    quote: "The integration of Tutor LMS Pro was flawless. We now have a high-performance exam infrastructure that handles thousands of students.",
    author: "Edu-Tech Global",
    role: "LMS Partner",
    tags: ["Tutor LMS", "Architecture"]
  },
  {
    quote: "Excellent DevOps architect. He optimized our cloud infrastructure reducing latency by 40% using Cloudflare and specialized caching.",
    author: "Solaris Tech",
    role: "CTO",
    tags: ["Cloudflare", "DevOps"]
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const firstIndex = index;
  const secondIndex = (index + 1) % testimonials.length;

  const nextStep = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevStep = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextStep, 10000);
    return () => clearInterval(timer);
  }, [index]);

  // 2. Apply the 'Variants' type here to fix the VS Code error
  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 15 : -15,
      filter: "blur(8px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.3 },
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 15 : -15,
      filter: "blur(8px)",
      transition: { duration: 0.3 }
    })
  };

  return (
    <section className="py-32 bg-[#030303] relative border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 text-center md:text-left">
          <span className="text-cyan-500 font-mono text-xs uppercase tracking-[0.4em] block mb-4">
            // Client Validations
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">System Feedback.</h2>
        </div>

        <div className="relative h-[550px] md:h-[400px] flex items-center justify-center perspective-[1200px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid md:grid-cols-2 gap-6 w-full"
            >
              {[testimonials[firstIndex], testimonials[secondIndex]].map((item, i) => (
                <div 
                  key={i}
                  className="group relative p-8 md:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl flex flex-col justify-between overflow-hidden transition-all hover:border-cyan-500/30"
                >
                  <Quote className="w-12 h-12 text-cyan-500/10 absolute -top-2 -left-2" />
                  
                  <div className="relative z-10">
                    <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light mb-8 italic">
                      &quot;{item.quote}&quot;
                    </p>
                  </div>

                  <div className="flex flex-col gap-6 pt-8 border-t border-white/5">
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="text-white font-bold tracking-widest text-sm uppercase">
                          {item.author}
                        </span>
                        <span className="text-purple-400 font-mono text-[9px] uppercase tracking-widest">
                          {item.role}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[8px] font-mono text-white/30 uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-white/5 pt-8">
          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-12 bg-cyan-500' : 'w-3 bg-white/10 hover:bg-white/20'}`}
                />
              ))}
            </div>
            <div className="hidden md:block h-4 w-[1px] bg-white/10" />
            <span className="hidden md:block font-mono text-[10px] text-white/30 uppercase tracking-[0.2em]">
              Scanning logs... {index + 1}/{testimonials.length}
            </span>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={prevStep}
              className="group p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-500/50 text-white transition-all active:scale-95"
            >
              <ChevronLeft className="group-hover:-translate-x-1 transition-transform" size={18} />
            </button>
            <button 
              onClick={nextStep}
              className="group p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-500/50 text-white transition-all active:scale-95"
            >
              <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}