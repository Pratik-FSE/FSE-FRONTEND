import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const manifestoLines = [
  { text: 'To build immersive experiences that make brands unforgettable.', highlight: true },
  { text: 'This is experiential art.', highlight: true },
  { text: 'This is Fullscreen Experiences.', highlight: true },
];

const BrandManifesto = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--secondary) / 0.2) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">Our Manifesto</span>
          </motion.div>

          {/* Manifesto text with scroll-triggered animations */}
          <div className="space-y-4 md:space-y-6 text-center">
            {manifestoLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="overflow-hidden perspective-1000"
              >
                <span
                  className={`font-display text-3xl md:text-5xl lg:text-6xl font-bold block ${
                    line.highlight
                      ? 'text-gradient'
                      : 'text-muted-foreground'
                  }`}
                >
                  {line.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandManifesto;
