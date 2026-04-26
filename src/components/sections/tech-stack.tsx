'use client';

// 1. Import 'Variants' from framer-motion
import { motion, Variants } from 'framer-motion'; 
import {
  SiReact, SiProcesswire, SiNextdotjs, SiTypescript, SiTailwindcss, SiWordpress, 
  SiHubspot, SiNodedotjs, SiDocker, SiGit, SiPhp, 
  SiPostgresql, SiMongodb, SiShopify, SiCloudflare, 
  SiAnthropic, SiFigma, SiVercel, SiReadthedocs
} from 'react-icons/si';

const techStack = [
  { name: 'WordPress', icon: SiWordpress, color: 'text-blue-500' },
  { name: 'ProcessWire', icon: SiProcesswire, color: 'text-indigo-400' },
  { name: 'Shopify', icon: SiShopify, color: 'text-green-500' },
  { name: 'Figma', icon: SiFigma, color: 'text-pink-400' },
  { name: 'Tutor LMS', icon: SiReadthedocs, color: 'text-blue-500' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'text-white' },
  { name: 'React', icon: SiReact, color: 'text-blue-400' },
  { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600' },
  { name: 'Tailwind', icon: SiTailwindcss, color: 'text-cyan-400' },
  { name: 'HubSpot', icon: SiHubspot, color: 'text-orange-500' },
  { name: 'n8n / Node', icon: SiNodedotjs, color: 'text-red-500' },
  { name: 'Cloudflare', icon: SiCloudflare, color: 'text-orange-400' },
  { name: 'Claude AI', icon: SiAnthropic, color: 'text-[#D97757]' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-400' },
  { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
  { name: 'Docker', icon: SiDocker, color: 'text-blue-500' },
  { name: 'Git Engine', icon: SiGit, color: 'text-orange-600' },
  { name: 'Vercel', icon: SiVercel, color: 'text-white' },
];

export default function TechStack() {
  // 2. Explicitly type your variant objects
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <span className="text-cyan-500 font-mono text-[10px] uppercase tracking-[0.4em] block mb-4">
            // Core Infrastructure Stack
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
            System Arsenal.
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            A specialized overview of the technologies I use to engineer high-performance systems, e-commerce architectures, and automated workflows.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative"
              >
                <div className="flex flex-col items-center justify-center p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] group-hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-xl min-h-[140px]">
                  <Icon className={`w-10 h-10 ${tech.color} mb-3 transition-all group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]`} />
                  <p className="text-white/70 text-[10px] font-mono uppercase tracking-widest text-center">
                    {tech.name}
                  </p>
                </div>
                
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg" />
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-8 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
            <h3 className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest mb-4">Enterprise Development</h3>
            <p className="text-white/50 text-sm font-light leading-relaxed">
              Engineering complex e-commerce and education systems using Shopify, ProcessWire, and Tutor LMS.
            </p>
          </div>
          <div className="p-8 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
            <h3 className="text-[10px] font-mono text-purple-500 uppercase tracking-widest mb-4">AI & Infrastructure</h3>
            <p className="text-white/50 text-sm font-light leading-relaxed">
              Leveraging Cloudflare for security and Claude AI to enhance automated infrastructure and branding strategy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}