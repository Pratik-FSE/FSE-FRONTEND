import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Box, Torus, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const FloatingElements = () => {
  return (
    <group>
      <Float speed={3} rotationIntensity={0.8} floatIntensity={1.5}>
        <Box args={[1, 1, 1]} position={[-3, 2, 0]}>
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </Box>
      </Float>
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Torus args={[1, 0.3, 16, 32]} position={[3, -1, 0]}>
          <MeshDistortMaterial
            color="#06b6d4"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Torus>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
        <Icosahedron args={[0.8, 0]} position={[0, 0, 2]}>
          <MeshDistortMaterial
            color="#ec4899"
            distort={0.4}
            speed={3}
            roughness={0.3}
            metalness={0.7}
          />
        </Icosahedron>
      </Float>
    </group>
  );
};

const ExperiencesHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
          <pointLight position={[-10, -10, 5]} intensity={0.8} color="#06b6d4" />
          <FloatingElements />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10"
      />

      {/* Parallax layers */}
      <div className="absolute inset-0 z-5 overflow-hidden">
        {/* Layer 1 */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/20 blur-3xl"
        />
        {/* Layer 2 */}
        <motion.div
          style={{ y: y2 }}
          className="absolute top-40 right-20 w-48 h-48 rounded-full bg-secondary/20 blur-3xl"
        />
        {/* Layer 3 */}
        <motion.div
          style={{ y: y3 }}
          className="absolute bottom-40 left-1/3 w-64 h-64 rounded-full bg-accent/20 blur-3xl"
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ scale }}
        className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium">
                Experience Library
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-8"
            >
              <span className="block">Curated</span>
              <span className="block text-gradient">Experiences</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-muted-foreground max-w-lg"
            >
              Explore our comprehensive collection of experiential technologies, 
              from immersive AR/VR to cutting-edge gaming installations.
            </motion.p>
          </div>

          {/* Right - Floating categories preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[500px] hidden lg:block"
          >
            {['Anamorphic', 'Gaming', 'AR/VR', 'Photo Booth'].map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="absolute glass rounded-2xl px-6 py-4 cursor-pointer"
                style={{
                  top: `${20 + i * 25}%`,
                  left: `${10 + (i % 2) * 30}%`,
                  transform: `rotate(${-5 + i * 3}deg)`,
                }}
              >
                <span className="text-lg font-display font-semibold">{cat}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ height: ['20%', '80%', '20%'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ExperiencesHero;
