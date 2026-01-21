import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Camera, Gamepad2, Sparkles, MonitorPlay, Users, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Experience {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  gradient: string;
}

const experiences: Experience[] = [
  {
    icon: <Camera className="w-8 h-8" />,
    title: "AR Photo Booth",
    description: "Immersive augmented reality experiences with instant sharing, custom filters, and branded overlays.",
    color: "primary",
    gradient: "from-primary to-accent",
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "AI Snap Art Booth",
    description: "AI-powered photo transformation that turns guests into art pieces in real-time.",
    color: "secondary",
    gradient: "from-secondary to-primary",
  },
  {
    icon: <Gamepad2 className="w-8 h-8" />,
    title: "Gaming & Esports Zone",
    description: "Premium PlayStation, Xbox setups, racing simulators, and competitive gaming stations.",
    color: "accent",
    gradient: "from-accent to-secondary",
  },
  {
    icon: <MonitorPlay className="w-8 h-8" />,
    title: "Motion & Gesture Games",
    description: "Interactive body-tracking games and experiences that engage crowds of all ages.",
    color: "primary",
    gradient: "from-primary to-secondary",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Live Social Wall",
    description: "Real-time social media aggregation displayed on stunning LED installations.",
    color: "secondary",
    gradient: "from-secondary to-accent",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Interactive LED Wall",
    description: "Touch-responsive LED displays for immersive brand activations and visual experiences.",
    color: "accent",
    gradient: "from-accent to-primary",
  },
];

interface TiltCardProps {
  experience: Experience;
  index: number;
}

const TiltCard = ({ experience, index }: TiltCardProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -15;
    const rotateYValue = ((x - centerX) / centerX) * 15;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="tilt-card group h-full"
      data-cursor-hover
    >
      <motion.div
        className="relative h-full p-8 rounded-2xl glass border border-border/50 overflow-hidden transition-all duration-300 group-hover:border-primary/50"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Animated gradient overlay on hover */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${experience.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />
        
        {/* Floating particles on hover */}
        {isHovered && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                initial={{ 
                  x: Math.random() * 100 - 50, 
                  y: 100,
                  opacity: 0 
                }}
                animate={{ 
                  y: -50, 
                  opacity: [0, 1, 0],
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
                style={{ left: `${20 + i * 15}%` }}
              />
            ))}
          </>
        )}
        
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative z-10 space-y-4 h-full flex flex-col" style={{ transform: 'translateZ(30px)' }}>
          {/* Icon with animated background */}
          <motion.div
            className={`relative inline-flex p-4 rounded-xl bg-gradient-to-br ${experience.gradient} overflow-hidden`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={isHovered ? { x: ['-100%', '100%'] } : {}}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
            />
            <span className="relative text-foreground">{experience.icon}</span>
          </motion.div>

          {/* Title */}
          <h3 className="font-display text-xl font-bold text-foreground group-hover:text-gradient transition-all duration-300">
            {experience.title}
          </h3>

          {/* Description */}
          <p className="font-body text-muted-foreground leading-relaxed flex-grow">
            {experience.description}
          </p>

          {/* Learn more link */}
          <motion.div
            className="flex items-center gap-2 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
            initial={{ x: -10 }}
            whileHover={{ x: 5 }}
          >
            Learn more
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </motion.div>
  );
};

const Experiences = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Parallax background decoration */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"
        style={{ y: backgroundY }}
      />
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6"
          >
            Our Experiences
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-foreground">Tech That</span>
            <br />
            <span className="text-gradient">Transforms Events</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg text-muted-foreground"
          >
            From AR photo booths to AI-powered installations, we bring cutting-edge 
            technology to fashion shows, brand activations, and premium events.
          </motion.p>
        </div>

        {/* Experience cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {experiences.map((experience, index) => (
            <TiltCard key={experience.title} experience={experience} index={index} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <motion.button
            onClick={() => navigate('/experiences')}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full glass border border-primary/30 hover:border-primary transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-hover
          >
            <span className="font-display font-semibold text-foreground">
              Explore All Experiences
            </span>
            <motion.div
              className="group-hover:translate-x-1 transition-transform"
            >
              <ArrowRight className="w-5 h-5 text-primary" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Experiences;
