'use client';

import { motion } from 'framer-motion';
import { Server, Zap, Globe, Layers } from 'lucide-react';

const services = [
  {
    title: 'LMS Infrastructure',
    description: 'Engineering complex medical and photography education platforms with Tutor LMS Pro and LearnDash, featuring custom quiz logic and global payment integration.',
    icon: <Server className="w-8 h-8 text-purple-400" />,
    accent: 'group-hover:border-purple-500/50',
    glow: 'bg-purple-500/10'
  },
  {
    title: 'Self-Hosted Automation',
    description: 'Designing resilient infrastructure using n8n and OpenClaw to automate business logic and scale enterprise operations without subscription overhead.',
    icon: <Zap className="w-8 h-8 text-cyan-400" />,
    accent: 'group-hover:border-cyan-500/50',
    glow: 'bg-cyan-500/10'
  },
  {
    title: 'Enterprise Migrations',
    description: 'Managing large-scale multi-phase infrastructure projects, specializing in HubSpot CRM centralizations and complex ProcessWire site migrations.',
    icon: <Globe className="w-8 h-8 text-blue-400" />,
    accent: 'group-hover:border-blue-500/50',
    glow: 'bg-blue-500/10'
  },
  {
    title: 'Brand Systems',
    description: 'Developing "hi-tech" modern visual identities for software startups like Codorax, ensuring a minimalist and impressive digital presence.',
    icon: <Layers className="w-8 h-8 text-indigo-400" />,
    accent: 'group-hover:border-indigo-500/50',
    glow: 'bg-indigo-500/10'
  }
];

export default function Services() {
  return (
    <section className="py-32 bg-[#030303] relative border-t border-white/5 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan-500 font-mono text-xs uppercase tracking-[0.4em] block mb-4">
              // Professional Solutions
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
              Engineering Excellence.
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 transition-all duration-500 hover:-translate-y-2 backdrop-blur-2xl ${service.accent}`}
            >
              {/* Internal Glow Effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-2xl -z-10 ${service.glow}`} />

              <div className="mb-6 p-4 w-fit rounded-2xl bg-white/[0.03] border border-white/10 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                {service.title}
              </h3>
              
              <p className="text-white/50 leading-relaxed font-light text-sm">
                {service.description}
              </p>

              {/* Monospace "Status" Indicator */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Protocol 0{i + 1}</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse"></div>
                  <div className="w-1 h-1 rounded-full bg-cyan-500/30"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}