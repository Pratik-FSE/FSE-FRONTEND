import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, ArrowRight } from 'lucide-react';

interface ExperienceCategoryProps {
  title: string;
  description: string;
  items: string[];
  gradient: string;
  index: number;
}

const ExperienceCategory = ({ title, description, items, gradient, index }: ExperienceCategoryProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -100 : 100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const isReversed = index % 2 !== 0;

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background gradient blob */}
      <motion.div
        style={{ x }}
        className={`absolute ${isReversed ? '-left-64' : '-right-64'} top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-[100px]`}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={isReversed ? 'lg:order-2' : ''}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-primary uppercase tracking-[0.2em] text-sm font-medium"
            >
              Category
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-lg mb-8"
            >
              {description}
            </motion.p>

            {/* Items list */}
            <div className="space-y-4">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  onMouseEnter={() => setHoveredItem(i)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="group flex items-center justify-between py-4 border-b border-border/30 cursor-pointer"
                >
                  <span className="font-medium group-hover:text-primary transition-colors">
                    {item}
                  </span>
                  <motion.div
                    animate={{ x: hoveredItem === i ? 5 : 0 }}
                    className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="text-sm">View</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`relative h-[400px] md:h-[500px] ${isReversed ? 'lg:order-1' : ''}`}
          >
            {/* Main card */}
            <div className={`absolute inset-0 glass rounded-3xl overflow-hidden bg-gradient-to-br ${gradient} bg-opacity-10`}>
              {/* Animated patterns */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              {/* Center play button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-24 h-24 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center cursor-pointer group"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
                  />
                  <Play className="w-10 h-10 text-foreground relative z-10 group-hover:scale-110 transition-transform ml-1" />
                </motion.div>
              </motion.div>

              {/* Corner accents */}
              <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-primary/50 rounded-tl-lg" />
              <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-primary/50 rounded-br-lg" />
            </div>

            {/* Floating label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-full"
            >
              <span className="text-sm font-medium">{items.length} Experiences</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ExperienceCategory;
