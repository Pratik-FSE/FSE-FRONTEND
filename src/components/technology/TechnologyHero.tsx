import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Octahedron } from '@react-three/drei';
import { useTheme } from '@/contexts/ThemeContext';

const TechOrbs = ({ theme }: { theme: 'light' | 'dark' }) => {
  const primary = theme === 'dark' ? '#8b5cf6' : '#2563eb';
  const secondary = theme === 'dark' ? '#06b6d4' : '#f97316';
  const accent = theme === 'dark' ? '#ec4899' : '#fb923c';

  return (
    <group>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <Sphere args={[2, 64, 64]}>
          <MeshDistortMaterial
            color={primary}
            emissive={primary}
            emissiveIntensity={0.35}
            distort={0.3}
            speed={2}
            roughness={0.15}
            metalness={0.6}
          />
        </Sphere>
      </Float>

      <Float speed={3} rotationIntensity={0.6} floatIntensity={1}>
        <Octahedron args={[0.5]} position={[3, 1, 0]}>
          <meshStandardMaterial
            color={secondary}
            emissive={secondary}
            emissiveIntensity={0.4}
            wireframe
          />
        </Octahedron>
      </Float>

      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <Torus args={[0.6, 0.2, 16, 32]} position={[-3, -1, 1]}>
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={0.35}
            metalness={0.5}
            roughness={0.3}
          />
        </Torus>
      </Float>

      {/* Perfectly aligned dots */}
      <group rotation={[Math.PI / 3, 0, 0]}>
        {[...Array(24)].map((_, i) => {
          const angle = (i / 24) * Math.PI * 2;
          const radius = 4;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                0,
              ]}
            >
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial
                color={primary}
                emissive={primary}
                emissiveIntensity={0.6}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

const TechnologyHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={theme === 'dark' ? 0.35 : 0.8} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={theme === 'dark' ? 1 : 1.4}
            color="#ffffff"
          />
          <pointLight position={[-10, -10, 5]} intensity={1} />
          <TechOrbs theme={theme} />
        </Canvas>
      </div>

      {/* Overlay */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background z-10"
      />

      {/* Content */}
      <motion.div
        style={{ y }}
        className="relative z-20 text-center px-4 max-w-5xl mx-auto"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm mb-8">
          Powered by Innovation
        </span>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] mb-8 text-foreground">
          The Tech Behind <br />
          <span className={theme === 'dark' ? 'text-gradient' : 'text-primary'}>
            The Magic
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto">
          Cutting-edge technologies powering next-generation experiential installations
        </p>
      </motion.div>
    </section>
  );
};

export default TechnologyHero;
