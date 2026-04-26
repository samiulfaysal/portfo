'use client';

import { motion, Variants } from 'framer-motion';
import { Cpu, Code2, Palette, Database, ShieldCheck, Terminal, ArrowRight } from 'lucide-react';
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/ui/footer";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#030303] pt-32 pb-20 relative overflow-hidden">
        {/* Background Mesh */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-24"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
              <span className="text-purple-500 font-mono text-[10px] uppercase tracking-[0.4em]">
                // Identity_System_v2
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-8">
              Sami Ul <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Faysal.</span>
            </h1>
            <p className="text-white/40 text-xl md:text-2xl font-light max-w-3xl leading-relaxed">
              Full-Stack Architect and Professional Brand Designer. I bridge the gap between 
              <span className="text-white"> aesthetic precision</span> and <span className="text-white">technical performance</span>.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
            {/* Left Column: The Story */}
            <div className="lg:col-span-7 space-y-12">
              <motion.div variants={itemVariants} className="relative p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl">
                <Terminal className="text-cyan-500 mb-6" size={24} />
                <h2 className="text-2xl font-bold text-white mb-6">The Philosophy</h2>
                <div className="space-y-6 text-white/50 leading-relaxed font-light">
                  <p>
                    Since founding <span className="text-white font-medium">Codorax</span>, my mission has been to treat digital products as living ecosystems. Whether I am architecting a multi-site HubSpot migration for enterprise clients or building a medical education platform, I prioritize clean, modular logic.
                  </p>
                  <p>
                    I believe that great design is not just how it looks, but how it scales. My background as a brand designer allows me to see the "soul" of a project, while my experience in DevOps and full-stack development gives me the tools to build its "engine."
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/10">
                  <Code2 className="text-cyan-400 mb-4" />
                  <h3 className="text-white font-bold mb-2">The Engineer</h3>
                  <p className="text-white/40 text-xs leading-relaxed font-mono uppercase tracking-tight">
                    Specializing in ProcessWire, LMS architecture, and automated enterprise pipelines.
                  </p>
                </div>
                <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/10">
                  <Palette className="text-purple-400 mb-4" />
                  <h3 className="text-white font-bold mb-2">The Designer</h3>
                  <p className="text-white/40 text-xs leading-relaxed font-mono uppercase tracking-tight">
                    Creating modern, hi-tech brand identities that define the visual language of software.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column: System Specs & Timeline */}
            <div className="lg:col-span-5 space-y-8">
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10"><Database size={80} /></div>
                 <h3 className="text-xs font-mono text-white/20 uppercase tracking-[0.2em] mb-8">// Experience_Logs</h3>
                 <div className="space-y-8">
                    <div className="relative pl-6 border-l border-cyan-500/30">
                       <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
                       <span className="text-[10px] font-mono text-cyan-400 block mb-1">2026 — PRESENT</span>
                       <h4 className="text-white font-bold text-sm uppercase">CEO @ Codorax</h4>
                       <p className="text-white/30 text-[10px] mt-1">Directing full-stack architecture and brand strategy.</p>
                    </div>
                    <div className="relative pl-6 border-l border-white/10">
                       <span className="text-[10px] font-mono text-white/20 block mb-1">2025 — 2026</span>
                       <h4 className="text-white font-bold text-sm uppercase">Enterprise Systems Specialist</h4>
                       <p className="text-white/30 text-[10px] mt-1">Managed multi-phase HubSpot & ProcessWire migrations for international clients.</p>
                    </div>
                    <div className="relative pl-6 border-l border-white/10">
                       <span className="text-[10px] font-mono text-white/20 block mb-1">2024 — 2025</span>
                       <h4 className="text-white font-bold text-sm uppercase">LMS Infrastructure Architect</h4>
                       <p className="text-white/30 text-[10px] mt-1">Developed high-performance exam portals for amcsuccess.com and photography platforms.</p>
                    </div>
                 </div>
              </motion.div>

              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl">
                 <h3 className="text-xs font-mono text-white/20 uppercase tracking-[0.2em] mb-6">// Infrastructure_Uptime</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 text-center">
                       <span className="text-2xl font-bold text-white block">5.0</span>
                       <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Fiverr_Rating</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 text-center">
                       <span className="text-2xl font-bold text-white block">25</span>
                       <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Day_Avg_Deploy</span>
                    </div>
                 </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Final Verification Badge */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 flex flex-col items-center justify-center text-center py-12 border-y border-white/5"
          >
            <ShieldCheck className="text-cyan-500 mb-4" size={32} />
            <h3 className="text-sm font-mono text-white/40 uppercase tracking-[0.5em] mb-4">Integrity_Check_Passed</h3>
            <div className="flex gap-2">
               {[1, 2, 3, 4, 5].map(i => (
                 <div key={i} className="w-1 h-1 rounded-full bg-cyan-500 shadow-[0_0_5px_#06b6d4]" />
               ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}