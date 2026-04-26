'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
// 1. Only import functional icons from Lucide
import { Globe, Cpu, ArrowUpCircle } from 'lucide-react';
// 2. Import ALL brand logos from react-icons/si for consistency
import { SiFiverr, SiGithub, SiLogmein } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#030303] pt-24 pb-12 border-t border-white/5 overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="group flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center font-black text-xl group-hover:bg-cyan-500 transition-colors">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold tracking-tighter text-xl uppercase">Sami Ul Faysal</span>
                <span className="text-cyan-500 font-mono text-[10px] uppercase tracking-[0.3em]">CEO @ Codorax</span>
              </div>
            </Link>
            <p className="text-white/40 text-sm font-light max-w-sm leading-relaxed mb-8">
              Engineering high-performance web systems and hi-tech brand identities for the modern digital frontier. Built for scale, designed for impact.
            </p>
            
            {/* SOCIAL LINKS: Updated to use Si icons */}
            <div className="flex gap-4">
              <Link href="https://github.com/samiulfaysal" target="_blank" className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all">
                <SiGithub size={18} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all">
                <SiLogmein size={18} />
              </Link>
              <Link href="https://www.fiverr.com/samiulfaysal" target="_blank" className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all">
                <SiFiverr size={22} />
              </Link>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs font-mono text-white/20 uppercase tracking-[0.2em] mb-8">// Registry</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="text-white/60 hover:text-cyan-400 text-sm font-light transition-colors uppercase tracking-widest">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* System Metadata Column */}
          <div>
            <h4 className="text-xs font-mono text-white/20 uppercase tracking-[0.2em] mb-8">// System_Info</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/40">
                <Cpu size={14} className="text-purple-500" />
                <span className="text-[10px] font-mono uppercase tracking-wider">Engine: Next.js 16.2</span>
              </div>
              <div className="flex items-center gap-3 text-white/40">
                <Globe size={14} className="text-cyan-500" />
                <span className="text-[10px] font-mono uppercase tracking-wider">Region: BD_HQ</span>
              </div>
              <div className="mt-8">
                <button 
                  onClick={scrollToTop}
                  className="flex items-center gap-2 text-[10px] font-mono text-white/20 hover:text-white transition-colors uppercase group"
                >
                  <ArrowUpCircle size={14} className="group-hover:-translate-y-1 transition-transform" />
                  Scroll_to_Top
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-[10px] font-mono text-white/20 uppercase tracking-widest">
            <span>© {currentYear} ALL_RIGHTS_RESERVED</span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span>BUILD_V2.0.26</span>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                <span className="text-[10px] font-mono text-green-500/70 uppercase tracking-widest">System_Active</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}