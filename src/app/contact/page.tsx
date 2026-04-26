'use client';

import { motion, Variants } from "framer-motion";
import { Mail, MessageSquare, Terminal, ShieldCheck, Cpu, ArrowRight } from "lucide-react";
import { SiGithub, SiLogmein, SiFiverr } from "react-icons/si";
import Navbar from "@/components/shared/navbar";
import ContactForm from "@/components/shared/contact-form";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#030303] pt-32 px-6 pb-20 relative overflow-hidden">
        {/* Background Infrastructure */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* System Header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
              <span className="text-cyan-500 font-mono text-[10px] uppercase tracking-[0.4em]">
                // Establish_Connection.exe
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6">
              Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Architect</span>
            </h1>
            <p className="text-white/40 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
              System ready for new project initialization. Whether it&apos;s complex LMS infrastructure, 
              n8n automation, or premium brand strategy, let&apos;s establish a link.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form - Main Terminal */}
            <motion.div
              className="lg:col-span-2 relative group"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative p-px bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem] overflow-hidden">
                <div className="p-8 md:p-12 rounded-[2.4rem] bg-[#050505]/90 backdrop-blur-3xl border border-white/5 relative overflow-hidden">
                  {/* Status Metadata */}
                  <div className="flex justify-between items-center mb-10 opacity-20">
                    <div className="flex items-center gap-2">
                      <Terminal size={12} />
                      <span className="text-[9px] font-mono tracking-widest uppercase">Comm_Link_Secure</span>
                    </div>
                    <span className="text-[9px] font-mono tracking-widest uppercase italic">Latency: 24ms</span>
                  </div>

                  <ContactForm />

                  {/* Corner Crosshairs */}
                  <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-white/20" />
                  <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-white/20" />
                </div>
              </div>
            </motion.div>

            {/* Sidebar - System Meta */}
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Social Channels Node */}
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Cpu size={14} /> // Registry
                </h3>
                <div className="space-y-3">
                  <a href="https://fiverr.com/samiulfaysal" target="_blank" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-green-500/30 transition-all group/link">
                    <div className="flex items-center gap-3">
                      <SiFiverr size={24} className="group-hover/link:text-green-500 transition-colors" />
                      <span className="text-sm font-medium text-white/70">Fiverr Pro</span>
                    </div>
                    <ArrowRight size={14} className="text-white/20 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                  <a href="https://github.com" target="_blank" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/30 transition-all group/link">
                    <div className="flex items-center gap-3">
                      <SiGithub size={18} className="group-hover/link:text-white transition-colors" />
                      <span className="text-sm font-medium text-white/70">Source Logs</span>
                    </div>
                    <ArrowRight size={14} className="text-white/20 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>

              {/* Direct Link Node */}
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl">
                <h3 className="text-xs font-mono text-purple-500 uppercase tracking-widest mb-4 italic">// Direct_Comms</h3>
                <p className="text-white/40 text-xs font-light leading-relaxed mb-6">
                  Typical response latency is &lt; 24 hours. For enterprise infrastructure emergencies, prioritize the subject line.
                </p>
                <a href="mailto:contact@samiulfaysal.com" className="block text-sm font-mono text-white hover:text-cyan-400 transition-colors break-all">
                  contact@sami.org.es
                </a>
              </motion.div>

              {/* System Availability */}
              <motion.div
                variants={itemVariants}
                className="p-8 rounded-3xl bg-gradient-to-br from-cyan-600/10 to-purple-600/10 border border-white/5 backdrop-blur-xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck size={14} className="text-green-500" />
                  <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">Active_Uptime</span>
                </div>
                <div className="space-y-3 text-[10px] font-mono text-white/30 uppercase tracking-tighter">
                  <div className="flex justify-between">
                    <span>Mon—Fri</span>
                    <span className="text-white">09:00—18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sat—Sun</span>
                    <span className="text-white">Standby_Mode</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}