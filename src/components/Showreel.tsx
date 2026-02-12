import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Play, Volume2, Pause } from 'lucide-react';

const brands = ['Microsoft', 'Google', 'TATA', 'Schneider', 'P&G', 'PepsiCo'];

const Showreel = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);
  const textX = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background effects with parallax */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/10"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
      />
      
      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
      />
      <motion.div
        className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Video frame with parallax scale */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ scale: videoScale, opacity: videoOpacity }}
            className="relative aspect-video rounded-3xl overflow-hidden group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-cursor-hover
          >
            {/* Animated gradient border */}
            <motion.div 
              className="absolute -inset-1 bg-gradient-neon rounded-3xl blur-sm"
              animate={{
                opacity: isHovered ? 1 : 0.5,
                scale: isHovered ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Video container */}
            <div className="relative h-full rounded-3xl overflow-hidden glass">
              {/* Placeholder / video thumbnail */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-secondary/30" />
              
              {/* Animated grid overlay */}
              <motion.div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                                    linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
                animate={{ 
                  backgroundPosition: isHovered ? ['0px 0px', '40px 40px'] : '0px 0px'
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />

              {/* Play button with ripple effect */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="relative"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Pulse rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/30"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/20"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/10"
                    animate={{ scale: [1, 2.2, 1], opacity: [0.2, 0, 0.2] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                  />
                  
                  {/* Play/Pause button */}
                  <motion.div 
                    className="relative w-20 h-20 rounded-full bg-gradient-neon flex items-center justify-center shadow-lg shadow-primary/40"
                    animate={{ 
                      boxShadow: isHovered 
                        ? '0 0 60px hsl(270 100% 60% / 0.6)' 
                        : '0 0 30px hsl(270 100% 60% / 0.4)'
                    }}
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-foreground" fill="currentColor" />
                    ) : (
                      <Play className="w-8 h-8 text-foreground ml-1" fill="currentColor" />
                    )}
                  </motion.div>
                </motion.button>
              </motion.div>

              {/* Video info overlay */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-red-500"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    />
                    <span className="text-sm font-medium text-foreground">2024 Showreel</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Volume2 className="w-4 h-4" />
                    <span className="text-sm">2:34</span>
                  </div>
                </div>
              </motion.div>

              {/* Corner decorations with animation */}
              <motion.div 
                className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/50"
                animate={{ opacity: isHovered ? 1 : 0.5 }}
              />
              <motion.div 
                className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/50"
                animate={{ opacity: isHovered ? 1 : 0.5 }}
              />
              <motion.div 
                className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/50"
                animate={{ opacity: isHovered ? 1 : 0.5 }}
              />
              <motion.div 
                className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/50"
                animate={{ opacity: isHovered ? 1 : 0.5 }}
              />
            </div>
          </motion.div>

          {/* Content with parallax */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.span 
                className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-secondary"
                whileHover={{ scale: 1.05 }}
              >
                Watch Our Work
              </motion.span>
              
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                <motion.span 
                  className="block text-foreground"
                  style={{ x: useTransform(scrollYProgress, [0.3, 0.7], [30, 0]) }}
                >
                  We Design
                </motion.span>
                <motion.span 
                  className="block text-gradient"
                  style={{ x: useTransform(scrollYProgress, [0.3, 0.7], [50, 0]) }}
                >
                  Digital Dreams
                </motion.span>
              </h2>
            </div>

            <motion.p 
              className="font-body text-lg text-muted-foreground leading-relaxed"
              style={{ opacity: useTransform(scrollYProgress, [0.2, 0.4], [0.5, 1]) }}
            >
              From high-fashion runway shows to exclusive brand launches, we've transformed 
              hundreds of events into immersive digital experiences. Our technology doesn't 
              just enhance events—it creates moments that guests never forget.
            </motion.p>

            {/* Animated Stats */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { number: '500+', label: 'Events' },
                { number: '50M+', label: 'Engagements' },
                { number: '100+', label: 'Brands' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="font-display text-3xl md:text-4xl font-bold text-gradient"
                    whileHover={{ 
                      textShadow: '0 0 30px hsl(270 100% 60% / 0.8)'
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="font-body text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Client logos with hover animation */}
            <div className="flex items-center gap-4 pt-4">
              <span className="text-sm text-muted-foreground">Trusted by:</span>
              <div className="flex gap-6 overflow-hidden">
                {brands.map((brand, index) => (
                  <motion.span
                    key={brand}
                    className="font-display text-sm font-bold text-muted-foreground/50 hover:text-foreground transition-colors whitespace-nowrap"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.1, color: 'hsl(var(--foreground))' }}
                  >
                    {brand}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Showreel;
