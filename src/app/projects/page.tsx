'use client';

import { useCallback, useEffect, useState } from 'react';
import Navbar from "@/components/shared/navbar";
import { getProjects, type PortfolioProject } from '@/server-actions/projects';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

export default function Projects() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const fetchProjects = useCallback(async () => {
    const result = await getProjects();
    if (result.success) {
      setProjects(result.projects);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchProjects();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchProjects]);

  const filteredProjects = filter === 'featured' 
    ? projects.filter(p => p.featured)
    : projects;

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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-dark via-dark to-dark/80 pt-24 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              My Projects
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              A collection of my professional work showcasing various technologies and problem-solving approaches.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            className="flex gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                filter === 'featured'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              Featured ({projects.filter(p => p.featured).length})
            </button>
          </motion.div>

          {/* Projects Grid */}
          {loading ? (
            <div className="text-center text-white/60 py-20">Loading projects...</div>
          ) : filteredProjects.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="group"
                  variants={itemVariants}
                >
                  <div className="relative h-full p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 hover:bg-white/10 overflow-hidden backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10 h-full flex flex-col">
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-2">
                          <Link href={`/projects/${project.slug}`} className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                            {project.title}
                          </Link>
                          {project.featured && (
                            <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-200 whitespace-nowrap ml-2">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-white/60 text-sm line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-200"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 4 && (
                            <span className="px-2 py-1 rounded text-xs bg-white/10 text-white/60">
                              +{project.techStack.length - 4}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-auto pt-4 border-t border-white/10 flex flex-wrap gap-2">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="flex items-center gap-2 px-3 py-2 rounded bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all text-sm"
                        >
                          Details
                        </Link>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 rounded bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all text-sm"
                          >
                            <SiGithub size={14} />
                            Code
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 rounded bg-blue-600/80 hover:bg-blue-600 text-white transition-all text-sm"
                          >
                            <ExternalLink size={14} />
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
              animate={{ opacity: 1 }}
            >
              <p className="text-white/60 text-lg">No projects found.</p>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}
