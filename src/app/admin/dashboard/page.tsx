'use client';

import { getHeroSettings, updateHeroSettings } from '@/server-actions/settings';
import { useCallback, useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { signOut } from 'next-auth/react';
import Navbar from '@/components/shared/navbar';
import ProjectForm from '@/components/shared/project-form';
import { getProjects, deleteProject, type PortfolioProject } from '@/server-actions/projects';
import { getMessages, deleteMessage, markMessageAsRead } from '@/server-actions/messages';
import type { ContactMessage } from '@prisma/client';

import { 
  Trash2, ExternalLink, Eye, EyeOff, Activity, Users, 
  Globe, Database, Save, Edit3, Terminal, LogOut 
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function AdminDashboard() {
  // --- USER FUNCTIONAL STATE ---
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'messages'>('overview');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // --- NEW CMS STATE (Hero Config) ---
  const [saving, setSaving] = useState(false);
  const [heroContent, setHeroContent] = useState({
    status: '> system.status === "ONLINE"',
    title: 'Architecting The Web.',
    subtitle: 'I am a Full-Stack Web Developer and Systems Architect. I engineer complex infrastructure into beautifully simple, high-performance digital experiences.',
  });

  // --- DATA FETCHING ---
const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [projectsResult, messagesResult, heroResult] = await Promise.all([
        getProjects(),
        getMessages(),
        getHeroSettings(), // Fetch current settings
      ]);

      if (projectsResult.success) setProjects(projectsResult.projects);
      if (messagesResult.success) setMessages(messagesResult.messages);
      if (heroResult) setHeroContent(heroResult); // Set CMS state
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

  // --- EVENT HANDLERS ---
  const handleDeleteProject = async (id: string) => {
    if (confirm('CRITICAL ACTION: Execute project deletion sequence?')) {
      await deleteProject(id);
      setProjects((current) => current.filter((p) => p.id !== id));
    }
  };

  const handleDeleteMessage = async (id: string) => {
    await deleteMessage(id);
    setMessages((current) => current.filter((m) => m.id !== id));
  };

  const handleMarkAsRead = async (id: string) => {
    await markMessageAsRead(id);
    setMessages((current) =>
      current.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  };

  const handleFormSuccess = async () => {
    setShowProjectForm(false);
    setSelectedProject(null);
    await fetchData();
  };

const handleSaveCMS = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateHeroSettings(heroContent);
      alert("System Architecture updated successfully. Live site reflects changes.");
    } catch (error) {
      alert("Failed to commit changes.");
    } finally {
      setSaving(false);
    }
  };

  // --- ANALYTICS COMPUTATION ---
  const analytics = {
    totalProjects: projects.length,
    totalMessages: messages.length,
    unreadMessages: messages.filter(m => !m.read).length,
    visitors: '2,547',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center flex-col gap-6">
        <Activity className="text-cyan-500 animate-spin" size={48} />
        <span className="text-cyan-500 font-mono uppercase tracking-[0.3em] text-xs animate-pulse">Initializing System Architecture...</span>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#030303] text-white pt-24 px-6 md:px-12 pb-20 font-sans relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header */}
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-white/5"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Terminal size={16} className="text-cyan-500" />
                <span className="text-cyan-500 font-mono text-xs uppercase tracking-[0.3em]">Root_Access_Granted</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">System Overview.</h1>
            </div>
            
            <button 
              onClick={() => signOut({ callbackUrl: '/admin/signin' })}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-red-500/10 text-white/60 hover:text-red-400 border border-white/5 hover:border-red-500/30 rounded-xl transition-all text-xs font-mono uppercase tracking-widest"
            >
              <LogOut size={14} /> End_Session
            </button>
          </motion.header>

          {/* Navigation Tabs */}
          <div className="flex gap-4 mb-10 border-b border-white/5 overflow-x-auto pb-px">
            {(['overview', 'projects', 'messages'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setShowProjectForm(false);
                }}
                className={`px-6 py-3 font-mono text-xs uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-cyan-400 border-cyan-400 bg-cyan-500/5'
                    : 'text-white/40 hover:text-white/80 border-transparent hover:border-white/20'
                }`}
              >
                // {tab}
                {tab === 'messages' && analytics.unreadMessages > 0 && (
                  <span className="ml-2 bg-purple-500 text-white px-2 py-0.5 rounded-full text-[9px]">{analytics.unreadMessages}</span>
                )}
              </button>
            ))}
          </div>

          {/* --- OVERVIEW TAB --- */}
          {activeTab === 'overview' && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Telemetry Column */}
              <div className="lg:col-span-4 space-y-6">
                <h2 className="text-xs font-mono text-white/40 uppercase tracking-[0.2em] flex items-center gap-2 mb-6">
                  <Activity size={14} /> Live Telemetry
                </h2>
                
                <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50" />
                  <div className="flex justify-between items-start mb-2">
                    <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400"><Database size={18} /></span>
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-1">{analytics.totalProjects}</h3>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Active_Projects</span>
                </motion.div>

                <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-purple-500/50" />
                  <div className="flex justify-between items-start mb-2">
                    <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400"><Users size={18} /></span>
                    {analytics.unreadMessages > 0 && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                      </span>
                    )}
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-1">{analytics.totalMessages}</h3>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Incoming_Comms</span>
                </motion.div>

                <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500/50" />
                  <div className="mb-2">
                    <span className="inline-block p-2 rounded-lg bg-green-500/10 text-green-400"><Globe size={18} /></span>
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-1">{analytics.visitors}</h3>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Node_Visitors (30d)</span>
                </motion.div>
              </div>

              {/* CMS Configuration Column */}
              <div className="lg:col-span-8 space-y-6">
                <h2 className="text-xs font-mono text-white/40 uppercase tracking-[0.2em] flex items-center gap-2 mb-6">
                  <Edit3 size={14} /> Content Architecture
                </h2>

                <motion.div variants={itemVariants} className="p-8 md:p-10 rounded-[2rem] bg-[#050505]/90 border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                  <form onSubmit={handleSaveCMS} className="space-y-6 relative z-10">
                    <div className="flex justify-between items-center pb-6 border-b border-white/5">
                      <h3 className="text-xl font-bold text-white tracking-tight">Hero Configuration</h3>
                      <span className="text-[9px] font-mono text-cyan-500/60 uppercase border border-cyan-500/20 px-2 py-1 rounded">Primary_Node</span>
                    </div>

                    <div className="group">
                      <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">System Status Tag</label>
                      <input 
                        type="text" value={heroContent.status} onChange={(e) => setHeroContent({...heroContent, status: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 px-4 text-white font-mono text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">Main Headline</label>
                      <input 
                        type="text" value={heroContent.title} onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 px-4 text-white font-sans font-bold text-xl focus:outline-none focus:border-cyan-500/50 transition-all"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">Architecture Description</label>
                      <textarea 
                        rows={4} value={heroContent.subtitle} onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 px-4 text-white/70 font-light focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                      />
                    </div>

                    <div className="pt-6 border-t border-white/5 flex justify-end">
                      <button type="submit" disabled={saving} className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50">
                        {saving ? <span className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" /> Committing...</span> : <span className="flex items-center gap-2"><Save size={14} /> Commit Changes</span>}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* --- PROJECTS TAB --- */}
          {activeTab === 'projects' && (
            <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
              {!showProjectForm ? (
                <>
                  <motion.button
                    onClick={() => { setSelectedProject(null); setShowProjectForm(true); }}
                    className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs uppercase tracking-widest transition shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    + Initialize_New_Project
                  </motion.button>

                  <motion.div variants={itemVariants} className="rounded-[2rem] bg-white/[0.02] backdrop-blur-xl border border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-white/5 bg-white/[0.01]">
                          <tr>
                            <th className="px-6 py-5 text-left text-[10px] font-mono uppercase tracking-widest text-white/40">Title</th>
                            <th className="px-6 py-5 text-left text-[10px] font-mono uppercase tracking-widest text-white/40">Tech Stack</th>
                            <th className="px-6 py-5 text-left text-[10px] font-mono uppercase tracking-widest text-white/40">Status</th>
                            <th className="px-6 py-5 text-left text-[10px] font-mono uppercase tracking-widest text-white/40">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projects.map((project, idx) => (
                            <motion.tr
                              key={project.id}
                              className="border-b border-white/5 hover:bg-white/[0.02] transition"
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}
                            >
                              <td className="px-6 py-4 text-sm font-medium text-white">{project.title}</td>
                              <td className="px-6 py-4">
                                <div className="flex gap-2 flex-wrap">
                                  {project.techStack.slice(0, 2).map((tech) => (
                                    <span key={tech} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-cyan-200 text-[10px] font-mono uppercase">{tech}</span>
                                  ))}
                                  {project.techStack.length > 2 && (
                                    <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-white/40 text-[10px] font-mono">+{project.techStack.length - 2}</span>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded text-[10px] font-mono uppercase border ${project.featured ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' : 'bg-white/5 border-white/10 text-white/40'}`}>
                                  {project.featured ? 'Featured' : 'Standard'}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex gap-4">
                                  {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-cyan-400 transition"><ExternalLink size={16} /></a>}
                                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition"><SiGithub size={16} /></a>}
                                  <button onClick={() => { setSelectedProject(project); setShowProjectForm(true); }} className="text-white/40 hover:text-cyan-400 transition"><Edit3 size={16} /></button>
                                  <button onClick={() => handleDeleteProject(project.id)} className="text-white/40 hover:text-red-400 transition"><Trash2 size={16} /></button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {projects.length === 0 && <div className="p-10 text-center font-mono text-xs text-white/40 uppercase">System Error: No projects found in registry.</div>}
                  </motion.div>
                </>
              ) : (
                <motion.div variants={itemVariants}>
                  <button onClick={() => { setShowProjectForm(false); setSelectedProject(null); }} className="mb-6 font-mono text-xs text-white/40 hover:text-cyan-400 transition uppercase tracking-widest flex items-center gap-2">
                    ← Abort_Configuration
                  </button>
                  <ProjectForm initialData={selectedProject ?? undefined} onSuccess={handleFormSuccess} />
                </motion.div>
              )}
            </motion.div>
          )}

          {/* --- MESSAGES TAB --- */}
          {activeTab === 'messages' && (
            <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
              {messages.length === 0 ? (
                <div className="p-10 text-center rounded-[2rem] bg-white/[0.02] border border-white/5 font-mono text-xs text-white/40 uppercase">
                  Log Empty: No incoming communications.
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    className={`p-8 rounded-[2rem] border transition-all ${msg.read ? 'bg-white/[0.01] border-white/5' : 'bg-cyan-500/5 border-cyan-500/30'}`}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
                  >
                    <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-white">{msg.name}</h3>
                          {!msg.read && <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded text-[9px] font-mono uppercase tracking-widest">Unread</span>}
                        </div>
                        <p className="text-xs font-mono text-white/40">{msg.email}</p>
                        {msg.subject && <p className="text-sm text-white/60 mt-2">Subj: {msg.subject}</p>}
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => handleMarkAsRead(msg.id)} className={`p-2 rounded-xl transition ${msg.read ? 'bg-white/5 text-white/40 hover:text-white' : 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20'}`} title={msg.read ? 'Mark as unread' : 'Mark as read'}>
                          {msg.read ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button onClick={() => handleDeleteMessage(msg.id)} className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 transition">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-white/70 leading-relaxed font-light mb-6">{msg.message}</p>
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                      Timestamp: {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

        </div>
      </div>
    </>
  );
}