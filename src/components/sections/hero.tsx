'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

// --- 3D COMPONENT: The Global Web Node ---
function WebEarthNode() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Slow, constant Earth-like rotation
    groupRef.current.rotation.y += 0.002;
    groupRef.current.rotation.x += 0.0005;

    // Smooth mouse tracking (parallax tilt)
    const targetX = state.pointer.x * 0.5;
    const targetY = state.pointer.y * 0.5;
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <group ref={groupRef} scale={1.6}>

        {/* Layer 1: The Solid Earth Core (Absorbs light to create depth) */}
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            color="#020617"
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>

        {/* Layer 2: The Primary Data Web (Geodesic Cyan Network) */}
        <mesh scale={1.01}>
          <icosahedronGeometry args={[1, 4]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.8}
            wireframe={true}
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Layer 3: The Outer Orbit Web (Low-poly Purple Network) */}
        <mesh scale={1.04} rotation={[Math.PI / 4, 0, Math.PI / 6]}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.6}
            wireframe={true}
            transparent
            opacity={0.2}
          />
        </mesh>

      </group>
    </Float>
  );
}

// --- PROPS INTERFACE FOR CMS ---
interface HeroProps {
  content?: {
    status: string;
    title: string;
    subtitle: string;
  };
}

// Default fallback content just in case the database is unreachable
const defaultContent = {
  status: '> system.status === "ONLINE"',
  title: 'Architecting The Web.',
  subtitle: 'I am a Full-Stack Web Developer and Systems Architect. I engineer complex infrastructure into beautifully simple, high-performance digital experiences.',
};

// --- MAIN HERO COMPONENT ---
export default function Hero({ content = defaultContent }: HeroProps) {
  const [typedText, setTypedText] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Use CMS content or fallback
  const fullText = content?.status || defaultContent.status;
  const titleText = content?.title || defaultContent.title;
  const subtitleText = content?.subtitle || defaultContent.subtitle;

  // Typewriter effect & mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    let i = 0;
    // Clear typed text when status changes from CMS
    setTypedText('');

    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 80);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [fullText]);

// Split title using the '|' delimiter from the CMS
  const parts = titleText.split('|');
  
  // If there's no '|', default the whole title to the normal white part
  const normalPart = parts[0]?.trim() || titleText; 
  const gradientPart = parts[1]?.trim();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030303] selection:bg-cyan-500/30">

      {/* 1. R3F GLOBAL 3D SCENE */}
      {!isMobile ? (
        <div className="absolute inset-0 z-0 opacity-90">
          <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 2]}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.1} />
              <directionalLight position={[10, 10, 5]} intensity={2} color="#06b6d4" />
              <directionalLight position={[-10, -10, -5]} intensity={1} color="#a855f7" />

              {/* Shining Stars Background */}
              <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={2} />

              <WebEarthNode />
            </Suspense>
          </Canvas>
        </div>
      ) : (
        // Mobile Performance Fallback
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#030303] via-[#0891b2]/10 to-[#030303]" />
      )}

      {/* 2. UI OVERLAY */}
      <div className="relative z-10 px-6 py-12 max-w-7xl mx-auto w-full flex flex-col items-center text-center pointer-events-none">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center pointer-events-auto mt-12"
        >
          {/* Dynamic Status Badge */}
          <div className="flex items-center gap-4 mb-8 bg-[#030303]/50 p-2 pr-4 rounded-full backdrop-blur-md border border-white/5">
            <div className="flex h-2.5 w-2.5 relative ml-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 shadow-[0_0_12px_#06b6d4]"></span>
            </div>
            <span className="text-cyan-400/90 text-xs font-mono tracking-widest uppercase">
              {typedText}
              <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-1.5 h-3 bg-cyan-400 inline-block ml-1 align-middle" />
            </span>
          </div>

          {/* Dynamic Hero Typography */}

          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold text-white mb-6 tracking-tighter leading-[1.05] drop-shadow-2xl">
            {normalPart}
            {/* Only render the break and gradient if there is text after the '|' */}
            {gradientPart && (
              <>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500">
                  {gradientPart}
                </span>
              </>
            )}
          </h1>

          {/* Dynamic Subtitle */}
          <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light mb-12 max-w-2xl text-center">
            {subtitleText}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-300"></div>
              <Link href="/contact" className="relative flex items-center justify-center px-10 py-4 bg-white text-black font-semibold uppercase tracking-wider text-sm rounded-full transition-all hover:scale-105 active:scale-95">
                Initialize Sequence
              </Link>
            </div>

            <Link href="/projects" className="group px-8 py-4 border border-white/10 text-white font-mono text-sm uppercase tracking-wider hover:bg-white/5 rounded-full transition-all text-center flex items-center justify-center gap-3 backdrop-blur-md">
              View Architecture
              <motion.span
                className="text-cyan-500"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >→</motion.span>
            </Link>
          </div>
        </motion.div>
      </div>

    </div>
  );
}