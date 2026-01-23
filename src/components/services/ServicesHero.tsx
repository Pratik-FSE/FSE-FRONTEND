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
      className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-background"
    >
      {/* 3D Background (unchanged) */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <ServiceScene />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-white/90 dark:bg-gradient-to-b dark:from-background/70 dark:via-background/40 dark:to-background z-10" />
      <div className="absolute inset-0 bg-white/60 dark:bg-gradient-to-r dark:from-background dark:via-transparent dark:to-background/70 z-10" />

      {/* Content */}
      <motion.div
        className="container mx-auto px-6 relative z-20"
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
            <span className="font-body text-sm tracking-[0.3em] uppercase text-blue-600 dark:text-primary">
              Our Services
            </span>
          </motion.div>

          {/* Main heading */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95]"
            >
              <span className="text-black dark:text-foreground">
                What We
              </span>
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
              <span className="text-blue-600 dark:text-gradient">
                Create
              </span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 text-xl md:text-2xl max-w-2xl mx-auto font-body leading-relaxed text-gray-600 dark:text-muted-foreground"
          >
            From immersive AR experiences to stunning visual productions,
            we craft technology that transforms events into legends.
          </motion.p>

          {/* Service categories preview */}
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
                  bg-gray-100 text-gray-600
                  hover:bg-orange-100 hover:text-orange-600
                  dark:glass dark:text-muted-foreground
                  dark:hover:text-primary
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
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase text-gray-500 dark:text-muted-foreground">
            Explore
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-blue-600 to-transparent dark:from-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ServicesHero;
