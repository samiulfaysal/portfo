'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Lock, User, Terminal, ShieldCheck, ArrowRight, Activity } from 'lucide-react';

// Animation variants for the terminal boot sequence
const formVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: 0.2
    } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('SYSTEM_READY');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('ESTABLISHING_SECURE_LINK...');
    
    // Logic for authentication goes here
    setTimeout(() => {
      setLoading(false);
      setStatus('ACCESS_DENIED_LOGGED');
    }, 2000);
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full max-w-md mx-auto z-10"
    >
      {/* 1. External Frame with Gradient Border */}
      <div className="relative p-[1px] bg-gradient-to-b from-white/20 via-transparent to-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="relative bg-[#050505]/90 backdrop-blur-3xl p-8 md:p-10 rounded-[2.4rem] border border-white/5">
          
          {/* Header Metadata (Similar to Hero Status) */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <Terminal size={14} className="text-cyan-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Auth_Node</span>
                <span className="text-[9px] font-mono text-cyan-500/60 uppercase">{status}</span>
              </div>
            </div>
            <Activity size={16} className="text-white/10 animate-pulse" />
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants} className="group relative">
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-2 ml-1">
                Identity_ID
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors" size={18} />
                <input 
                  type="text" 
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white font-mono text-sm placeholder:text-white/5 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.05] transition-all"
                  placeholder="USERNAME"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group relative">
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-2 ml-1">
                Access_Key
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-purple-400 transition-colors" size={18} />
                <input 
                  type="password" 
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white font-mono text-sm placeholder:text-white/5 focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.05] transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="group/btn relative w-full flex items-center justify-center gap-3 py-4 bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <>
                    Initialize_Login
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
                {/* Subtle internal glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              </button>
            </motion.div>
          </form>

          {/* Footer Metadata */}
          <motion.div 
            variants={itemVariants}
            className="mt-10 flex items-center justify-between opacity-20"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={12} />
              <span className="text-[8px] font-mono uppercase tracking-widest">Encrypted_Bridge</span>
            </div>
            <span className="text-[8px] font-mono uppercase">Node_v2.0.26</span>
          </motion.div>

          {/* Decorative Technical Crosshairs */}
          <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/20" />
          <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/20" />
        </div>
      </div>
      
      {/* Background Glow Ring */}
      <div className="absolute -inset-10 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl -z-10 animate-pulse" />
    </motion.div>
  );
}