'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient blob 1 */}
        <motion.div
          className="absolute w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
          }}
          style={{ top: '20%', left: '10%' }}
        />
        {/* Gradient blob 2 */}
        <motion.div
          className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
          }}
          style={{ top: '40%', right: '10%' }}
        />
        {/* Gradient blob 3 */}
        <motion.div
          className="absolute w-80 h-80 bg-pink-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, 100, -50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
          }}
          style={{ bottom: '10%', left: '50%', transform: 'translateX(-50%)' }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 py-12 text-center max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Subtitle Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium backdrop-blur-sm">
            ✨ Welcome to My Portfolio
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
        >
          Full-Stack Engineer &{' '}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Product Builder
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-white/70 mb-12 leading-relaxed max-w-2xl mx-auto"
        >
          Crafting exceptional digital experiences with modern technologies. From concept to deployment, I build scalable, performant, and beautiful applications.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/projects">
            <motion.button
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold transition-all shadow-lg hover:shadow-blue-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore My Work
            </motion.button>
          </Link>

          <Link href="/contact">
            <motion.button
              className="px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-white/40 text-sm mb-2">Scroll to explore</p>
          <svg
            className="w-6 h-6 mx-auto text-white/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
