'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { getProjects, type PortfolioProject } from '@/server-actions/projects';
import { SiGithub } from 'react-icons/si';

export default function ProjectShowcase() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    const result = await getProjects();
    if (result.success) {
      setProjects(result.projects.filter((project) => project.featured).slice(0, 6));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchProjects();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchProjects]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Determine grid layout based on project count
  const getGridClass = (index: number, total: number) => {
    if (total === 0) return '';
    if (total === 1) return 'md:col-span-2 md:row-span-2';
    if (total === 2) return index === 0 ? 'md:col-span-2' : 'md:col-span-2';
    
    // For 3+ projects, create a varied bento layout
    const layouts = [
      'md:col-span-2 md:row-span-2',
      'md:col-span-1',
      'md:col-span-1',
      'md:col-span-1 md:row-span-2',
      'md:col-span-1',
      'md:col-span-2',
    ];
    return layouts[index % layouts.length] || '';
  };

  if (loading) {
    return (
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white/60">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-white/60 text-lg max-w-2xl">
            A selection of my recent work showcasing my expertise in full-stack development, system design, and product thinking.
          </p>
        </motion.div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                className={`group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm ${getGridClass(idx, projects.length)}`}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative h-full p-6 md:p-8 flex flex-col justify-between z-10">
                  {/* Top Section */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <p className="text-white/60 text-sm md:text-base line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Section */}
                  <div className="space-y-4">
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-2">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all text-sm"
                      >
                        <ArrowUpRight size={16} />
                        Details
                      </Link>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all text-sm"
                        >
                          <SiGithub size={16} />
                          Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white transition-all text-sm"
                        >
                          <ExternalLink size={16} />
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-20 rounded-lg bg-white/5 border border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-white/60 text-lg">No featured projects yet. Check back soon!</p>
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link href="/projects">
            <motion.button
              className="px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
