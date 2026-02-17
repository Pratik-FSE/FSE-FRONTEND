import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const AboutHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50 z-10" />

      {/* Content */}
      <motion.div 
        className="container mx-auto px-6 relative z-20"
        style={{ opacity }}
      >
        <div className="max-w-4xl">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-16 bg-gradient-to-r from-primary to-transparent" />
            <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">About Us</span>
          </motion.div>

          {/* Main heading with split animation */}
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9]"
            >
              <span className="block text-gradient">The Brand</span>
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9]"
            >
              <span className="block text-foreground">Behind The</span>
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9]"
            >
              <span className="block text-glow-cyan text-secondary">Experience</span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-xl md:text-2xl text-muted-foreground max-w-2xl font-body leading-relaxed"
          >
            Where fashion meets technology. We craft immersive experiences that 
            transform events into unforgettable moments of wonder.
          </motion.p>

          {/* Stats preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 flex gap-12 md:gap-20"
          >
            {[
              { value: '500+', label: 'Events' },
              { value: '50+', label: 'Brands' },
              { value: '1M+', label: 'Experiences' },
            ].map((stat, index) => (
              <div key={stat.label} className="group">
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient group-hover:text-glow transition-all duration-300">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm mt-2 font-body tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-muted-foreground text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutHero;
