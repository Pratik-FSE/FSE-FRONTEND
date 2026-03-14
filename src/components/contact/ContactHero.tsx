import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ContactHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block z-canvas">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
      </div>

      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent z-overlay"
      />

      <motion.div
        style={{ y }}
        className="relative z-content w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16"
      >
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-hero">
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary"
              />
              Available for New Projects
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] mb-8 text-hero"
          >
            Let&apos;s Create
            <br />
            <span className="text-gradient">Magic</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-hero-muted"
          >
            Ready to transform your next event into an unforgettable experience?
            We&apos;d love to hear about your vision.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactHero;
