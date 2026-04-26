'use client';

import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      // FIX: Hardcode internal WebGL resolution so the map dots NEVER fail to render
      width: 1000, 
      height: 1000,
      phi: 0,
      theta: 0.3,
      dark: 1, 
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.1], 
      markerColor: [1, 1, 1],
      glowColor: [0.6, 0.2, 0.9],
      markers: [
        { location: [23.6850, 90.3563], size: 0.1 }, // Bangladesh
        { location: [40.7128, -74.0060], size: 0.05 }, // New York
        { location: [51.5074, -0.1278], size: 0.05 }, // London
      ],
      // The `as any` bypasses the TypeScript COBEOptions bug
      onRender: (state: Record<string, any>) => {
        if (!pointerInteracting.current) {
          phi += 0.005; // Auto-rotation speed
        }
        state.phi = phi + pointerInteractionMovement.current;
      },
    } as any); 

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="w-full h-full max-w-[600px] max-h-[600px] aspect-square flex items-center justify-center m-auto">
      <motion.canvas
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          canvasRef.current!.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = 'grab';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta / 200;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta / 100;
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          contain: 'layout paint size',
        }}
      />
    </div>
  );
}