import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface SlideItem {
  id: number;
  title: string;
  category: string;
  gradient: string;
}

const slides: SlideItem[] = [
  { id: 1, title: 'Fashion Week Mumbai', category: 'AR Experience', gradient: 'from-primary via-accent to-secondary' },
  { id: 2, title: 'Tech Summit Delhi', category: 'Gaming Zone', gradient: 'from-secondary via-primary to-accent' },
  { id: 3, title: 'Sunburn Festival', category: 'AI Photo Booth', gradient: 'from-accent via-secondary to-primary' },
  { id: 4, title: 'Product Launch', category: 'Holographic Display', gradient: 'from-neon-cyan via-secondary to-primary' },
  { id: 5, title: 'Music Awards', category: 'LED Installation', gradient: 'from-primary via-neon-pink to-accent' },
];

const PortfolioSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const { theme } = useTheme();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), {
    stiffness: 100,
    damping: 30,
  });

  const goToSlide = (index: number) => {
    const newIndex = Math.max(0, Math.min(slides.length - 1, index));
    setCurrentSlide(newIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
      if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Background parallax text */}
      <motion.div
        style={{ x }}
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap pointer-events-none"
      >
        <span className="text-[20vw] font-display font-bold text-muted/5 uppercase tracking-tighter">
          Experiences • Portfolio • Experiences • Portfolio •
        </span>
      </motion.div>

      <div className="relative z-10 px-4 md:px-8 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-16"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold">
              Cinematic{' '}
              <span className={theme === 'dark' ? 'text-gradient' : 'text-primary'}>
                Showcase
              </span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md">
              Drag or use arrows to explore our featured installations
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="hidden md:flex gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goToSlide(currentSlide - 1)}
              disabled={currentSlide === 0}
              className="w-14 h-14 rounded-full glass flex items-center justify-center disabled:opacity-30"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goToSlide(currentSlide + 1)}
              disabled={currentSlide === slides.length - 1}
              className="w-14 h-14 rounded-full glass flex items-center justify-center disabled:opacity-30"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <motion.div
            ref={sliderRef}
            drag="x"
            dragConstraints={{ left: -((slides.length - 1) * 600), right: 0 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            animate={{
              x: -currentSlide * (typeof window !== 'undefined' && window.innerWidth < 768 ? 320 : 600),
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 30 }}
            className="flex gap-8 cursor-grab active:cursor-grabbing"
          >
            {slides.map((slide, index) => {
              const activeGradient =
                theme === 'dark'
                  ? slide.gradient
                  : 'from-primary to-secondary';

              return (
                <motion.div
                  key={slide.id}
                  className="flex-shrink-0 w-[300px] md:w-[560px] h-[400px] md:h-[600px] relative group"
                  animate={{
                    scale: currentSlide === index ? 1 : 0.9,
                    opacity: currentSlide === index ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.5 }}
                  onClick={() => !isDragging && goToSlide(index)}
                >
                  {/* Card background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${activeGradient} opacity-30 rounded-3xl`} />

                  <div className="absolute inset-0 glass rounded-3xl overflow-hidden">
                    {/* Animated circles */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                      transition={{ duration: 20, repeat: Infinity }}
                      className={`absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br ${activeGradient} opacity-30 rounded-full blur-3xl`}
                    />
                    <motion.div
                      animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
                      transition={{ duration: 15, repeat: Infinity }}
                      className={`absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br ${activeGradient} opacity-20 rounded-full blur-3xl`}
                    />

                    {/* Content */}
                    <div className="relative h-full p-8 md:p-12 flex flex-col justify-end z-10">
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-sm text-primary uppercase tracking-widest mb-4"
                      >
                        {slide.category}
                      </motion.span>
                      <motion.h3 className="text-3xl md:text-5xl font-display font-bold leading-tight">
                        {slide.title}
                      </motion.h3>
                    </div>

                    {/* Hover border glow */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 rounded-3xl border-2 border-primary/40 pointer-events-none"
                      style={{ boxShadow: '0 0 40px hsl(var(--primary) / 0.25)' }}
                    />
                  </div>

                  {/* Slide number */}
                  <div className="absolute -bottom-6 left-8 text-8xl font-display font-bold text-muted/20">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-3 mt-16">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative h-2 rounded-full overflow-hidden"
              animate={{ width: currentSlide === index ? 40 : 12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-muted" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: currentSlide === index ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSlider;
