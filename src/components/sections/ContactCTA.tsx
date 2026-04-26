'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { Terminal, Cpu, ArrowRight } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const glowVariants: Variants = {
  animate: {
    opacity: [0.3, 0.6, 0.3],
    scale: [1, 1.05, 1],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  }
};

export default function ContactCTA() {
  return (
    <section className="py-32 bg-[#030303] relative overflow-hidden">
      {/* 1. Background Infrastructure: Faded Tech Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* 2. Floating Ambient Orbs */}
      <motion.div 
        variants={glowVariants}
        animate="animate"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative group p-1 bg-gradient-to-b from-white/10 via-transparent to-white/5 rounded-[3rem] overflow-hidden"
        >
          {/* Internal Glass Panel */}
          <div className="relative p-8 md:p-20 rounded-[2.9rem] bg-[#050505] border border-white/5 backdrop-blur-3xl overflow-hidden text-center">
            
            {/* Top Status Indicators */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-30">
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-cyan-400" />
                <span className="text-[10px] font-mono text-white tracking-[0.2em] uppercase">Ready_To_Deploy</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-2">
                <Cpu size={12} className="text-purple-400" />
                <span className="text-[10px] font-mono text-white tracking-[0.2em] uppercase">Latency_Optimal</span>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-8">
                // Final_Initialization
              </span>
              
              <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-none">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 italic">Architect</span> <br/>
                your next system?
              </h2>

              <p className="text-white/40 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                Whether it&apos;s a complex LMS migration, a custom automation pipeline, or a premium hi-tech brand identity—let&apos;s engineer something impressive.
              </p>

              {/* The "Power-On" Button */}
              <div className="flex flex-col items-center gap-6">
                <Link href="/contact" className="group/btn relative inline-flex items-center gap-3 px-12 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  <span>Initialize Sequence</span>
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  
                  {/* Subtle outer ring animation on button */}
                  <div className="absolute -inset-1 rounded-full border border-white/20 scale-100 group-hover/btn:scale-110 opacity-0 group-hover/btn:opacity-100 transition-all duration-500" />
                </Link>

                <div className="flex items-center gap-4 text-white/20 font-mono text-[10px] uppercase tracking-widest">
                  <span className="w-8 h-px bg-white/10" />
                  <span>Secure_Encryption_Active</span>
                  <span className="w-8 h-px bg-white/10" />
                </div>
              </div>
            </div>

            {/* Interactive Corner Crosshairs */}
            <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-white/20" />
            <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-white/20" />
            <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-white/20" />
            <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-white/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}