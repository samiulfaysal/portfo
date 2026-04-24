'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/shared/navbar';
import { getProjects, deleteProject, type PortfolioProject } from '@/server-actions/projects';
import { getMessages, deleteMessage, markMessageAsRead } from '@/server-actions/messages';
import ProjectForm from '@/components/shared/project-form';
import { Trash2, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import type { ContactMessage } from '@prisma/client';

export default function AdminDashboard() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'messages'>('overview');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [projectsResult, messagesResult] = await Promise.all([
        getProjects(),
        getMessages(),
      ]);

      if (projectsResult.success) setProjects(projectsResult.projects);
      if (messagesResult.success) setMessages(messagesResult.messages);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchData();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchData]);

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
      setProjects((currentProjects) => currentProjects.filter((project) => project.id !== id));
    }
  };

  const handleDeleteMessage = async (id: string) => {
    await deleteMessage(id);
    setMessages((currentMessages) => currentMessages.filter((message) => message.id !== id));
  };

  const handleMarkAsRead = async (id: string) => {
    await markMessageAsRead(id);
    setMessages((currentMessages) =>
      currentMessages.map((message) => (message.id === id ? { ...message, read: true } : message))
    );
  };

  const handleFormSuccess = async () => {
    setShowProjectForm(false);
    setSelectedProject(null);
    await fetchData();
  };

  // Mock Analytics
  const analytics = {
    totalProjects: projects.length,
    totalMessages: messages.length,
    unreadMessages: messages.filter(m => !m.read).length,
    visitors: '2,547',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-dark/80 pt-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-pulse text-white/60">Loading dashboard...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-dark/80 pt-24 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/60">Manage your portfolio projects and inquiries</p>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 mb-8 border-b border-white/10">
            {(['overview', 'projects', 'messages'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium transition-all border-b-2 ${
                  activeTab === tab
                    ? 'text-white border-blue-500'
                    : 'text-white/60 hover:text-white border-transparent'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Stats Grid */}
              <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Projects', value: analytics.totalProjects },
                  { label: 'Total Messages', value: analytics.totalMessages },
                  { label: 'Unread Messages', value: analytics.unreadMessages },
                  { label: 'Visitors', value: analytics.visitors },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="p-6 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition"
                  >
                    <p className="text-white/60 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Quick Actions */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h2 className="text-xl font-bold text-white">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.button
                    onClick={() => {
                      setSelectedProject(null);
                      setShowProjectForm(true);
                      setActiveTab('projects');
                    }}
                    className="p-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    + Add New Project
                  </motion.button>
                  <motion.a
                    href="/admin/signin"
                    className="p-4 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition border border-white/10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign Out
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
              {!showProjectForm ? (
                <>
                  <motion.button
                    onClick={() => setShowProjectForm(true)}
                    className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    + Add New Project
                  </motion.button>

                  {/* Projects Table */}
                  <motion.div
                    variants={itemVariants}
                    className="rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
                  >
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-white/10 bg-white/[0.02]">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Title</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Slug</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Tech Stack</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Featured</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projects.map((project, idx) => (
                            <motion.tr
                              key={project.id}
                              className="border-b border-white/5 hover:bg-white/[0.02] transition"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <td className="px-6 py-4 text-sm text-white">{project.title}</td>
                              <td className="px-6 py-4 text-sm text-white/60">{project.slug}</td>
                              <td className="px-6 py-4 text-sm text-white/60">
                                <div className="flex gap-2 flex-wrap">
                                  {project.techStack.slice(0, 2).map((tech) => (
                                    <span key={tech} className="px-2 py-1 rounded bg-blue-500/20 text-blue-200 text-xs">
                                      {tech}
                                    </span>
                                  ))}
                                  {project.techStack.length > 2 && (
                                    <span className="px-2 py-1 rounded bg-white/10 text-white/60 text-xs">
                                      +{project.techStack.length - 2}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm">
                                <span className={`px-2 py-1 rounded text-xs ${
                                  project.featured
                                    ? 'bg-yellow-500/20 text-yellow-200'
                                    : 'bg-white/5 text-white/60'
                                }`}>
                                  {project.featured ? 'Yes' : 'No'}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm">
                                <div className="flex gap-3">
                                  {project.liveUrl && (
                                    <a
                                      href={project.liveUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-400 hover:text-blue-300 transition"
                                    >
                                      <ExternalLink size={16} />
                                    </a>
                                  )}
                                  {project.githubUrl && (
                                    <a
                                      href={project.githubUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-white/60 hover:text-white transition"
                                    >
                                    <SiGithub size={16} />
                                    </a>
                                  )}
                                  <button
                                    onClick={() => setSelectedProject(project)}
                                    className="text-white/60 hover:text-white transition"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProject(project.id)}
                                    className="text-red-400 hover:text-red-300 transition"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {projects.length === 0 && (
                      <div className="p-6 text-center text-white/60">No projects yet. Create your first one!</div>
                    )}
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.button
                    onClick={() => {
                      setShowProjectForm(false);
                      setSelectedProject(null);
                    }}
                    className="text-white/60 hover:text-white transition"
                    variants={itemVariants}
                  >
                    ← Back to Projects
                  </motion.button>
                  <motion.div variants={itemVariants}>
                    <ProjectForm
                      initialData={selectedProject ?? undefined}
                      onSuccess={handleFormSuccess}
                    />
                  </motion.div>
                </>
              )}
            </motion.div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} className="space-y-4">
                {messages.length === 0 ? (
                  <div className="p-8 text-center rounded-lg bg-white/5 border border-white/10 text-white/60">
                    No messages yet.
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <motion.div
                      key={msg.id}
                      className={`p-6 rounded-lg border transition ${
                        msg.read
                          ? 'bg-white/[0.02] border-white/5'
                          : 'bg-blue-500/10 border-blue-500/30'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white">{msg.name}</h3>
                          <p className="text-sm text-white/60">{msg.email}</p>
                          {msg.subject && <p className="text-sm text-white/80 mt-1">Subject: {msg.subject}</p>}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleMarkAsRead(msg.id)}
                            className="p-2 rounded hover:bg-white/10 transition text-white/60 hover:text-white"
                            title={msg.read ? 'Mark as unread' : 'Mark as read'}
                          >
                            {msg.read ? <Eye size={16} /> : <EyeOff size={16} />}
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-2 rounded hover:bg-red-500/20 transition text-red-400"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-white/80 mb-3">{msg.message}</p>
                      <p className="text-xs text-white/40">
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
