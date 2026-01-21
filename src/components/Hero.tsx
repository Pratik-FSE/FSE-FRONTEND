import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroScene from './HeroScene';
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

  // Word rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToExperiences = () => {
    navigate('/experiences');
  };

  // Text reveal animation
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.01, 0.05, 0.95] as const,
      },
    },
  };

  const title = "Immersive Tech";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden noise-overlay"
    >
      {/* Animated gradient background - Moved further away */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-primary/20 via-background to-background"
        style={{
          transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`,
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      />

      {/* Animated grid - Moved further away */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.05) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
          }}
        />
      </div>

      {/* Floating orbs with parallax - MOVED FURTHER AWAY */}
      <motion.div
        className="absolute top-[-20%] left-[-20%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-[-15%] right-[-15%] w-[350px] h-[350px] rounded-full bg-gradient-to-br from-secondary/10 to-transparent blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -60, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-[20%] right-[-10%] w-[250px] h-[250px] rounded-full bg-gradient-to-br from-accent/10 to-transparent blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
        animate={{
          scale: [1, 1.1, 1],
          x: [-20, 20, -20],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* 3D Scene - MOVED TO BACKGROUND WITH LOWER OPACITY */}
      <div className="absolute inset-0 z-0 opacity-20">
        <HeroScene />
      </div>

      {/* Content overlay */}
      <motion.div
        className="relative z-20 min-h-screen flex items-center"
        style={{ opacity, scale }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">

            {/* Main headline with letter animation */}
            <motion.h1
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-6"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="block text-foreground overflow-hidden">
                {title.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    variants={letterVariants}
                    className="inline-block"
                    style={{ display: letter === ' ' ? 'inline' : 'inline-block' }}
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
                      className="text-gradient inline-block"
                      initial={{ y: 40, opacity: 0, rotateX: -90 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -40, opacity: 0, rotateX: 90 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                      {words[currentWord]}
                    </motion.span>
                  </AnimatePresence>
                  
                  {/* Animated underline */}
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-neon rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
                </span>
              </span>
            </motion.h1>

            {/* Description with fade-in */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="font-body text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10"
            >
              We craft immersive AR experiences, AI-powered installations, 
              and interactive tech that transform events into unforgettable 
              digital journeys.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              {/* Primary CTA */}
              <motion.button
                onClick={scrollToExperiences}
                className="group relative px-8 py-4 rounded-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor-hover
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-neon"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: '0 0 40px hsl(270 100% 60% / 0.5)',
                  }}
                />
                
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                
                <span className="relative font-display font-semibold text-foreground">
                  View Experiences
                </span>
              </motion.button>
              
              {/* Secondary CTA */}
              <motion.button
                onClick={() => navigate('/contact')}
                className="group relative px-8 py-4 rounded-full glass border border-primary/30 overflow-hidden"
                whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary))' }}
                whileTap={{ scale: 0.95 }}
                data-cursor-hover
              >
                <motion.div
                  className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative font-display font-semibold text-foreground">
                  Book for Your Event
                </span>
              </motion.button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-border/30"
            >
              {[
                { value: '500+', label: 'Events' },
                { value: '50M+', label: 'Engagements' },
                { value: '100+', label: 'Brands' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                >
                  <motion.div
                    className="font-display text-3xl md:text-4xl font-bold text-gradient"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="font-body text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-8 h-12 rounded-full border-2 border-muted-foreground/50 flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowDown className="w-4 h-4 text-primary" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
