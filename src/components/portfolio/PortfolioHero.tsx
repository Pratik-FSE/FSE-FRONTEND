import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { useTheme } from '@/contexts/ThemeContext';

const FloatingOrb = () => {
  const { theme } = useTheme();

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          color={theme === 'dark' ? '#8b5cf6' : '#2563eb'} // purple → blue
        />
      </Sphere>
    </Float>
  );
};

const PortfolioHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);

  const letterVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.6, 0.01, 0.05, 0.95] as const,
      },
    }),
  };

  const title = 'PORTFOLIO';

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />

          {/* Lights change only in light mode */}
          <pointLight
            position={[10, 10, 10]}
            intensity={1}
            color={theme === 'dark' ? '#8b5cf6' : '#2563eb'}
          />
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.5}
            color={theme === 'dark' ? '#06b6d4' : '#f97316'}
          />

          <FloatingOrb />
        </Canvas>
      </div>

      {/* Background overlay */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 z-10
          bg-gradient-to-b
          from-background
          via-transparent
          to-background
        "
      />

      {/* Animated grid lines */}
      <div className="absolute inset-0 z-[5] opacity-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`
              absolute h-px w-full
              bg-gradient-to-r
              from-transparent
              ${
                theme === 'dark'
                  ? 'via-primary'
                  : i % 2 === 0
                  ? 'via-primary'
                  : 'via-secondary'
              }
              to-transparent
            `}
            style={{ top: `${(i + 1) * 5}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.35 }}
            transition={{ delay: i * 0.08, duration: 1.4 }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ y, scale }}
        className="relative z-20 text-center px-4"
      >
        {/* Split title */}
        <div className="overflow-hidden mb-8">
          <div className="flex justify-center flex-nowrap">
            {title.split('').map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className={`
                  text-5xl md:text-7xl lg:text-[10rem]
                  font-display font-bold
                  ${
                    theme === 'dark'
                      ? 'text-gradient'
                      : i % 2 === 0
                      ? 'text-primary'
                      : 'text-secondary'
                  }
                `}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          Immersive experiences crafted for the world's most iconic events
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`
              w-6 h-10 rounded-full border-2
              ${
                theme === 'dark'
                  ? 'border-primary/50'
                  : 'border-secondary/50'
              }
              flex items-start justify-center p-2
            `}
          >
            <motion.div
              animate={{ height: ['20%', '80%', '20%'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`
                w-1 rounded-full
                ${
                  theme === 'dark'
                    ? 'bg-primary'
                    : 'bg-secondary'
                }
              `}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PortfolioHero;
