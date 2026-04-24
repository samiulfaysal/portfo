'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/shared/navbar';
import { getProjects, type PortfolioProject } from '@/server-actions/projects';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

export default function ProjectDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [allProjects, setAllProjects] = useState<PortfolioProject[]>([]);

  const fetchProject = useCallback(async () => {
    const result = await getProjects();
    if (result.success) {
      setAllProjects(result.projects);
      const found = result.projects.find((item) => item.slug === slug);
      setProject(found || null);
    }
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchProject();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchProject]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-dark/80 pt-24 px-6 flex items-center justify-center">
          <p className="text-white/60">Loading project...</p>
        </div>
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-dark/80 pt-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Project not found</h1>
            <p className="text-white/60 mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/projects">
              <motion.button
                className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Projects
              </motion.button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Get related projects (featured, excluding current)
  const relatedProjects = allProjects
    .filter((item) => item.featured && item.id !== project.id)
    .slice(0, 3);

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
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <Link href="/projects" className="flex items-center gap-2 text-white/60 hover:text-white transition">
              <ArrowLeft size={20} />
              Back to Projects
            </Link>
          </motion.div>

          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {project.featured && (
                    <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-200 font-medium">
                      Featured Project
                    </span>
                  )}
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-white/70 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium transition"
                  >
                    <SiGithub size={20} />
                    View Source Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium transition"
                  >
                    <ExternalLink size={20} />
                    View Live Project
                  </a>
                )}
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              variants={itemVariants}
              className="p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-200 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Project Details */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Project Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Production-ready codebase with best practices</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Optimized performance and scalability</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Clean, maintainable architecture</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Comprehensive error handling and validation</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white mb-3">My Role</h3>
                  <p className="text-white/70 leading-relaxed">
                    As the full-stack developer, I designed and implemented the complete solution, including architecture decisions, frontend development, backend APIs, and deployment optimization.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-6 pt-12 border-t border-white/10">
                <h2 className="text-2xl font-bold text-white">Related Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedProjects.map((relatedProject) => (
                    <Link key={relatedProject.id} href={`/projects/${relatedProject.slug}`}>
                      <motion.div
                        className="group h-full p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all cursor-pointer backdrop-blur-sm"
                        whileHover={{ y: -5 }}
                      >
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                          {relatedProject.title}
                        </h3>
                        <p className="text-white/60 text-sm line-clamp-3 mb-4">
                          {relatedProject.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {relatedProject.techStack.slice(0, 2).map((tech) => (
                            <span key={tech} className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-200">
                              {tech}
                            </span>
                          ))}
                          {relatedProject.techStack.length > 2 && (
                            <span className="px-2 py-1 rounded text-xs bg-white/10 text-white/60">
                              +{relatedProject.techStack.length - 2}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
}
