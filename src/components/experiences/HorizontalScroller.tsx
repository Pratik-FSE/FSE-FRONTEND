import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface ScrollItem {
  id: number;
  title: string;
  category: string;
  gradient: string;
}

const scrollItems: ScrollItem[] = [
  { id: 1, title: 'Anamorphic Displays', category: 'Visual Tech', gradient: 'from-primary to-accent' },
  { id: 2, title: 'Artist Intros', category: 'Event Production', gradient: 'from-secondary to-primary' },
  { id: 3, title: 'Brand Videos', category: 'Content Creation', gradient: 'from-accent to-secondary' },
  { id: 4, title: 'Chroma Studios', category: 'Production', gradient: 'from-neon-cyan to-secondary' },
  { id: 5, title: 'Destination Reveals', category: 'Brand Activation', gradient: 'from-primary to-neon-pink' },
  { id: 6, title: 'Logo Animations', category: 'Motion Design', gradient: 'from-accent to-primary' },
  { id: 7, title: 'Physical Setups', category: 'Installation', gradient: 'from-secondary to-accent' },
  { id: 8, title: 'Trophy Animations', category: 'Award Shows', gradient: 'from-neon-pink to-primary' },
];

const HorizontalScroller = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', '-50%']),
    { stiffness: 100, damping: 30 }
  );

  return (
    <section
      ref={containerRef}
      className="py-32 overflow-hidden"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-4 md:px-8 lg:px-16 mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
          Explore <span className="text-gradient">Categories</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl">
          Scroll to discover our full range of experiential technologies
        </p>
      </motion.div>

      {/* Horizontal scrolling cards */}
      <div className="relative">
        <motion.div
          style={{ x }}
          className="flex gap-8 pl-16"
        >
          {scrollItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="flex-shrink-0 w-[350px] h-[450px] relative group cursor-pointer"
            >
              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 rounded-3xl transition-opacity group-hover:opacity-40`} />
              
              <div className="absolute inset-0 glass rounded-3xl overflow-hidden">
                {/* Animated background */}
                <motion.div
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `radial-gradient(circle at center, hsl(var(--primary) / 0.3) 0%, transparent 70%)`,
                    backgroundSize: '200% 200%',
                  }}
                />

                {/* Content */}
                <div className="relative h-full p-8 flex flex-col justify-between z-10">
                  {/* Number */}
                  <div className="text-7xl font-display font-bold text-muted/20">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Text */}
                  <div>
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="text-sm text-primary uppercase tracking-widest mb-3 block"
                    >
                      {item.category}
                    </motion.span>
                    <h3 className="text-3xl font-display font-bold leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Hover border effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--primary) / 0.5) 0%, transparent 50%, hsl(var(--secondary) / 0.5) 100%)`,
                    padding: '2px',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMaskComposite: 'xor',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mt-12"
      >
        <div className="flex items-center gap-3 text-muted-foreground">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-10 h-px bg-gradient-to-r from-transparent to-primary"
          />
          <span className="text-sm">Scroll to explore</span>
          <motion.div
            animate={{ x: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-10 h-px bg-gradient-to-l from-transparent to-primary"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HorizontalScroller;
