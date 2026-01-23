import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ServiceScene from '../3d/ServiceScene';

const ServicesHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* 3D Background */}
      <motion.div className="absolute inset-0 z-canvas" style={{ y }}>
        <ServiceScene />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 z-overlay bg-gradient-to-b from-background/90 via-background/70 to-background" />
      <div className="absolute inset-0 z-overlay bg-gradient-to-r from-background via-transparent to-background/70" />

      {/* Content */}
      <motion.div
        className="container mx-auto px-6 relative z-content"
        style={{ opacity }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="font-body text-sm tracking-[0.3em] uppercase text-primary">
              Our Services
            </span>
          </motion.div>

          {/* Main heading */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-hero"
            >
              What We
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95]"
            >
              <span className="text-gradient">Create</span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 text-xl md:text-2xl max-w-2xl mx-auto font-body leading-relaxed text-hero-muted"
          >
            From immersive AR experiences to stunning visual productions,
            we craft technology that transforms events into legends.
          </motion.p>

          {/* Service categories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 flex flex-wrap justify-center gap-4"
          >
            {[
              'Gaming',
              'AI Photo',
              'AR/VR',
              'Displays',
              'Video',
              'Tech Setup',
            ].map((category, index) => (
              <motion.span
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="
                  px-5 py-2 rounded-full text-sm font-body
                  glass text-hero-muted
                  hover:text-primary
                  border border-transparent
                  transition-all duration-300 cursor-default
                "
              >
                {category}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-content"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase text-hero-muted">
            Explore
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ServicesHero;
