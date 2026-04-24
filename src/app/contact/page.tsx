'use client';

import Navbar from "@/components/shared/navbar";
import ContactForm from "@/components/shared/contact-form";
import { motion } from "framer-motion";
import { Mail, MessageSquare } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

export default function Contact() {
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
          {/* Header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Let&apos;s Connect
            </h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Have a project in mind or just want to chat about tech? I&apos;d love to hear from you.
              Fill out the form below or reach out through any of my social channels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form - Main Column */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6">Send Me a Message</h2>
                <ContactForm />
              </div>
            </motion.div>

            {/* Side Info */}
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Quick Info */}
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <MessageSquare size={20} />
                  Quick Response
                </h3>
                <p className="text-white/60 text-sm">
                  I typically respond to messages within 24 hours. For urgent matters, please use the subject line to indicate priority.
                </p>
              </motion.div>

              {/* Email */}
              <motion.a
                href="mailto:your.email@example.com"
                variants={itemVariants}
                className="p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 backdrop-blur-sm transition group"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Mail size={20} className="group-hover:text-blue-400 transition" />
                  Email
                </h3>
                <p className="text-blue-400 hover:text-blue-300 transition break-all">
                  your.email@example.com
                </p>
              </motion.a>

              {/* Social Links */}
              <motion.div
                variants={itemVariants}
                className="space-y-3"
              >
                <h3 className="text-lg font-bold text-white">Connect on Social</h3>
                <div className="space-y-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition group"
                  >
                    <SiGithub size={20} className="group-hover:text-white transition" />
                    <span className="text-white/70 group-hover:text-white transition">GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition group"
                  >
                    <FaLinkedin size={20} className="group-hover:text-blue-400 transition" />
                    <span className="text-white/70 group-hover:text-white transition">LinkedIn</span>
                  </a>
                </div>
              </motion.div>

              {/* Office Hours */}
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 backdrop-blur-sm"
              >
                <h3 className="text-lg font-bold text-white mb-3">Response Times</h3>
                <div className="space-y-2 text-sm text-white/70">
                  <div className="flex justify-between">
                    <span>Weekdays:</span>
                    <span className="text-white">24-48h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekends:</span>
                    <span className="text-white">48-72h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Holidays:</span>
                    <span className="text-white">Up to 1 week</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
