import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Box, Torus, Icosahedron } from '@react-three/drei';

const FloatingElements = () => (
  <group>
    <Float speed={3} rotationIntensity={0.8} floatIntensity={1.5}>
      <Box args={[1, 1, 1]} position={[-3, 2, 0]}>
        <meshStandardMaterial color="#2563eb" wireframe />
      </Box>
    </Float>

    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Torus args={[1, 0.3, 16, 32]} position={[3, -1, 0]}>
        <MeshDistortMaterial color="#FF6C39" distort={0.3} speed={2} />
      </Torus>
    </Float>

    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <Icosahedron args={[0.8, 0]} position={[0, 0, 2]}>
        <MeshDistortMaterial color="#2563eb" distort={0.4} speed={3} />
      </Icosahedron>
    </Float>
  </group>
);

const ExperiencesHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#2563eb" />
          <pointLight position={[-10, -10, 5]} intensity={0.8} color="#FF6C39" />
          <FloatingElements />
        </Canvas>
      </div>

      {/* Overlay */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-background/80 dark:bg-gradient-to-b dark:from-background dark:via-transparent dark:to-background z-10"
      />

      {/* Content */}
      <motion.div
        style={{ scale }}
        className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium">
              Experience Library
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mt-6 mb-8">
              <span className="block text-foreground">Curated</span>
              <span className="block text-secondary dark:text-gradient">
                Experiences
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg">
              Explore our comprehensive collection of experiential technologies,
              from immersive AR/VR to cutting-edge gaming installations.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExperiencesHero;
