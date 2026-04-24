'use client';

import { motion } from 'framer-motion';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiPrisma,
  SiGit,
  SiDocker,
  SiNodedotjs,
  SiMongodb,
  SiFramer,
  SiGraphql,
} from 'react-icons/si';

const techStack = [
  { name: 'React', icon: SiReact, color: 'text-blue-400' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'text-white' },
  { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-400' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-500' },
  { name: 'Prisma', icon: SiPrisma, color: 'text-blue-600' },
  { name: 'Git', icon: SiGit, color: 'text-orange-600' },
  { name: 'Docker', icon: SiDocker, color: 'text-blue-500' },
  { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-600' },
  { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
  { name: 'Framer Motion', icon: SiFramer, color: 'text-blue-500' },
  { name: 'GraphQL', icon: SiGraphql, color: 'text-pink-500' },
];

export default function TechStack() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tech Stack
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Tools and technologies I use to build modern, scalable applications.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {techStack.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm cursor-pointer min-h-[140px]">
                  {/* Icon */}
                  <Icon className={`w-10 h-10 md:w-12 md:h-12 ${tech.color} mb-3 transition-transform group-hover:scale-110`} />

                  {/* Name */}
                  <p className="text-white text-sm md:text-base font-semibold text-center">
                    {tech.name}
                  </p>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur" />
                </div>

                {/* Floating animation on hover */}
                <motion.div
                  className="absolute inset-0 rounded-xl border border-white/0 group-hover:border-white/20 transition-colors duration-300"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(59, 130, 246, 0)',
                      '0 0 40px rgba(59, 130, 246, 0.1)',
                      '0 0 20px rgba(59, 130, 246, 0)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: idx * 0.1,
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          className="mt-20 p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Frontend</h3>
              <p className="text-white/60">
                React, Next.js, TypeScript, Tailwind CSS, Framer Motion
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Backend</h3>
              <p className="text-white/60">
                Node.js, Express, GraphQL, REST APIs, Authentication
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Database & DevOps</h3>
              <p className="text-white/60">
                PostgreSQL, MongoDB, Prisma, Docker, Git
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
