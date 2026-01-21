import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const showcaseItems = [
  {
    id: 1,
    title: 'AI Photo Generation',
    subtitle: 'Real-time Style Transfer',
    description: 'Transform photos into stunning artwork in seconds using custom-trained AI models.',
    gradient: 'from-primary via-accent to-secondary',
  },
  {
    id: 2,
    title: 'Holographic Displays',
    subtitle: 'Floating 3D Visuals',
    description: 'Pepper\'s ghost illusions and LED fan displays creating stunning floating visuals.',
    gradient: 'from-secondary via-primary to-accent',
  },
  {
    id: 3,
    title: 'Motion Tracking',
    subtitle: 'Full Body Capture',
    description: 'Real-time skeletal tracking for interactive installations and gaming experiences.',
    gradient: 'from-accent via-secondary to-primary',
  },
  {
    id: 4,
    title: 'Anamorphic Art',
    subtitle: '3D Optical Illusions',
    description: 'Mind-bending 3D visuals that appear to pop out of screens and billboards.',
    gradient: 'from-neon-cyan via-secondary to-primary',
  },
];

const TechShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
  };

  return (
    <section
      ref={containerRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/50 to-transparent" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-16"
        >
          <div>
            <span className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-4 block">
              In Action
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold">
              Tech <span className="text-gradient">Showcase</span>
            </h2>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="w-14 h-14 rounded-full glass flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="w-14 h-14 rounded-full glass flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>

        {/* Showcase slider */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 30 }}
              className="flex"
            >
              {showcaseItems.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex-shrink-0"
                >
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Visual */}
                    <div className={`relative h-[400px] md:h-[500px] bg-gradient-to-br ${item.gradient} rounded-3xl overflow-hidden`}>
                      {/* Animated pattern */}
                      <motion.div
                        animate={{
                          backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage: `radial-gradient(circle at 30% 30%, white 1px, transparent 1px)`,
                          backgroundSize: '30px 30px',
                        }}
                      />

                      {/* Play button */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer group">
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-full bg-white/20"
                          />
                          <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
                        </div>
                      </motion.div>

                      {/* Noise overlay */}
                      <div className="absolute inset-0 noise-overlay opacity-30" />
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-primary uppercase tracking-widest text-sm mb-4 block"
                      >
                        {item.subtitle}
                      </motion.span>
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-display font-bold mb-6"
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-muted-foreground text-lg mb-8"
                      >
                        {item.description}
                      </motion.p>
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-8 py-4 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {showcaseItems.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="relative h-2 rounded-full overflow-hidden"
                animate={{ width: currentIndex === index ? 40 : 12 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-muted" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: currentIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechShowcase;
