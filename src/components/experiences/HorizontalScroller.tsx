import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { experienceCategories } from '@/data/experienceCategories';

interface ScrollItem {
  id: number;
  title: string;
  category: string;
  gradient: string;
}

const scrollItems: ScrollItem[] = [
  { id: 1, title: 'Quiz Game AV LinkedIn', category: 'Gaming & Interactive', gradient: 'from-primary to-accent' },
  { id: 2, title: 'LED Wall Installation Reel', category: 'Visual Displays', gradient: 'from-primary to-accent' },
  { id: 3, title: 'Brand Reveal — Pepsi', category: 'Brand Activations', gradient: 'from-secondary to-primary' },
  { id: 4, title: 'AR Photo Booth Reel', category: 'AR & Visual Experiences', gradient: 'from-primary to-neon-pink' },
  { id: 5, title: 'Projection Mapping Event', category: 'Visual Displays', gradient: 'from-primary to-accent' },
  { id: 6, title: 'AI Video Booth Video', category: 'AR & Visual Experiences', gradient: 'from-accent to-primary' },
];

const HorizontalScroller = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  function handleCardClick(categoryTitle: string) {
    const cat = experienceCategories.find((c) => c.title === categoryTitle);
    if (!cat) return;
    const el = document.getElementById(cat.sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Ask the target section to play a random video for this section
    try {
      window.dispatchEvent(new CustomEvent(`playRandomVideo:${cat.sectionId}`));
    } catch {
      // ignore
    }
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', '-50%']),
    { stiffness: 100, damping: 30 }
  );

  return (
    <section ref={containerRef} className="py-32 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-4 md:px-8 lg:px-16 mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
          Explore{' '}
          <span className="text-primary dark:text-gradient">
            Categories
          </span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl">
          Scroll to discover our full range of experiential technologies
        </p>
      </motion.div>

      {/* Cards */}
      <div className="relative">
        <motion.div style={{ x }} className="flex gap-8 pl-16">
          {scrollItems.map((item, index) => {
            const isBlue = index % 2 === 0;
            const accentText = isBlue ? 'text-primary' : 'text-secondary';
            const accentBg = isBlue ? 'bg-primary/10' : 'bg-secondary/10';
            const accentBorder = isBlue ? 'border-primary/40' : 'border-secondary/40';
            const hoverSwap = isBlue
              ? 'group-hover:bg-secondary/15 group-hover:border-secondary/60'
              : 'group-hover:bg-primary/15 group-hover:border-primary/60';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="flex-shrink-0 w-[350px] h-[450px] relative group cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() => handleCardClick(item.category)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCardClick(item.category); }}
              >
                {/* Background */}
                <div
                  className={`
                    absolute inset-0 rounded-3xl transition-all
                    ${accentBg} ${accentBorder} border
                    ${hoverSwap}
                    dark:bg-gradient-to-br ${item.gradient}
                    dark:border-transparent
                  `}
                />

                <div className="absolute inset-0 glass rounded-3xl overflow-hidden">
                  <div className="relative h-full p-8 flex flex-col justify-between z-10">
                    {/* Index */}
                    <div className="text-7xl font-display font-bold text-muted/20">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Text */}
                    <div>
                      <span
                        className={`text-sm uppercase tracking-widest mb-3 block ${accentText}`}
                      >
                        {item.category}
                      </span>
                      <h3 className="text-3xl font-display font-bold leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
            className="w-10 h-px bg-primary"
          />
          <span className="text-sm">Scroll to explore</span>
          <motion.div
            animate={{ x: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-10 h-px bg-secondary"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HorizontalScroller;
