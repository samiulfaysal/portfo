'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { getProjects, type PortfolioProject } from '@/server-actions/projects';

export default function ProjectShowcase() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    const result = await getProjects();
    if (result.success) {
      // Prioritize featured projects, but if empty, just show the latest 3 projects
      const featured = result.projects.filter(p => p.featured);
      const displayProjects = featured.length > 0 
        ? featured.slice(0, 3) 
        : result.projects.slice(0, 3);
      
      setProjects(displayProjects);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <section className="py-32 bg-[#030303] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
              <span className="text-purple-500 font-mono text-[10px] uppercase tracking-[0.4em]">
                // Deployment_Logs
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">Live Blueprints.</h2>
          </div>
          <Link href="/projects" className="px-6 py-2 border border-white/10 rounded-full text-xs font-mono text-white/50 hover:text-cyan-400 hover:border-cyan-500/50 transition-all uppercase tracking-widest">
            View_Registry [→]
          </Link>
        </div>

        {loading ? (
          <div className="text-center font-mono text-xs text-white/30 py-20 uppercase tracking-widest animate-pulse">
            Fetching Remote Nodes...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center font-mono text-xs text-white/30 py-20 uppercase tracking-widest">
            Node Registry Empty. Please initialize projects in Admin.
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-1 bg-gradient-to-b from-white/10 to-transparent rounded-[2rem] group overflow-hidden"
              >
                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-8 rounded-[1.9rem] bg-[#050505] h-full flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-12">
                      <span className="font-mono text-[9px] text-cyan-400 border border-cyan-500/30 px-2 py-1 rounded">
                        {project.featured ? 'ACTIVE_NODE' : 'DEPLOYED'}
                      </span>
                      <div className="w-8 h-px bg-white/20 mt-3" />
                    </div>
                    <Link href={`/projects/${project.slug}`}>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    </Link>
                    <span className="font-mono text-[10px] text-white/30 block mb-6 uppercase tracking-widest">
                        {project.techStack[0] || 'SYSTEM_BUILD'}_v{i+1}.0
                    </span>
                    <p className="text-white/50 text-sm font-light leading-relaxed line-clamp-3">{project.description}</p>
                  </div>
                  
                  <div className="mt-12 flex gap-1">
                    {[1, 2, 3].map(bit => (
                      <div key={bit} className={`w-4 h-1 transition-colors ${bit === 1 ? 'bg-cyan-500/50' : 'bg-white/10 group-hover:bg-cyan-500/50'}`} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}