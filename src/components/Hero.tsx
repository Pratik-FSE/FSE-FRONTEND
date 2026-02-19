import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';

const words = ['Events', 'Brands', 'Experiences', 'Fashion'];

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentWord, setCurrentWord] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 2,
        y: (clientY / innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] as const },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden noise-overlay"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-primary/20 via-background to-background dark:from-primary/20"
        style={{
          transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`,
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      />

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-[-20%] left-[-20%] w-[400px] h-[400px] rounded-full bg-primary/10 dark:bg-gradient-to-br dark:from-primary/10 dark:to-transparent blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-[-15%] right-[-15%] w-[350px] h-[350px] rounded-full bg-secondary/10 dark:bg-gradient-to-br dark:from-secondary/10 dark:to-transparent blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        animate={{ scale: [1, 1.3, 1], rotate: [0, -60, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-20 min-h-screen flex items-center"
        style={{ opacity, scale }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            {/* Heading */}
            <motion.h1
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-6"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="block text-foreground overflow-hidden">
                {'Immersive Tech'.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </span>

              <span className="block mt-2">
                <span className="text-foreground">for </span>
                <span className="relative inline-block">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentWord}
                      className={`
                        inline-block
                        ${currentWord % 2 === 0 ? 'text-primary' : 'text-secondary'}
                        dark:text-gradient
                      `}
                      initial={{ y: 40, opacity: 0, rotateX: -90 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -40, opacity: 0, rotateX: 90 }}
                      transition={{ duration: 0.5 }}
                    >
                      {words[currentWord]}
                    </motion.span>
                  </AnimatePresence>

                  <motion.div
                    className="
                      absolute -bottom-2 left-0 right-0 h-1
                      bg-secondary
                      dark:bg-gradient-neon
                      rounded-full
                    "
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
                </span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mb-10"
            >
              We craft immersive AR experiences, AI-powered installations,
              and interactive tech that transform events into unforgettable
              digital journeys.
            </motion.p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                onClick={() => navigate('/services')}
                className="
                  px-8 py-4 rounded-full
                  bg-primary text-primary-foreground
                  hover:bg-secondary hover:text-secondary-foreground
                  dark:bg-gradient-neon dark:text-foreground
                  transition-colors
                "
                whileHover={{ scale: 1.05 }}
              >
                View Experiences
              </motion.button>

              <motion.button
                onClick={() => navigate('/contact')}
                className="
                  px-8 py-4 rounded-full border
                  border-primary text-primary
                  hover:border-secondary hover:text-secondary
                  dark:glass dark:text-foreground
                  transition-colors
                "
                whileHover={{ scale: 1.05 }}
              >
                Book for Your Event
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ArrowDown className="w-5 h-5 text-primary" />
      </motion.div>
    </section>
  );
};

export default Hero;
