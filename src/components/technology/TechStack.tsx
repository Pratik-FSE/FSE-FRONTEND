import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Cpu, Eye, Gamepad2, Camera, Sparkles, Zap, Box, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const technologies = [
  {
    icon: Eye,
    title: 'AR/VR Technology',
    description:
      'Immersive augmented and virtual reality experiences using Meta Quest, Apple Vision Pro, and custom AR solutions.',
    gradientLight: 'from-blue-600 to-orange-500',
    gradientDark: 'from-primary to-accent',
  },
  {
    icon: Cpu,
    title: 'AI & Machine Learning',
    description:
      'Real-time AI-powered photo transformations, face detection, and generative art installations.',
    gradientLight: 'from-orange-500 to-blue-600',
    gradientDark: 'from-secondary to-primary',
  },
  {
    icon: Gamepad2,
    title: 'Gaming Infrastructure',
    description:
      'High-performance gaming setups with PS5, Xbox Series X, racing simulators, and esports tournament systems.',
    gradientLight: 'from-blue-600 to-orange-500',
    gradientDark: 'from-accent to-secondary',
  },
  {
    icon: Camera,
    title: 'Computer Vision',
    description:
      'Advanced motion tracking, gesture recognition, and real-time body pose detection.',
    gradientLight: 'from-orange-500 to-blue-600',
    gradientDark: 'from-neon-cyan to-secondary',
  },
  {
    icon: Monitor,
    title: 'Display Technology',
    description:
      'LED walls, anamorphic displays, holographic screens, and projection mapping systems.',
    gradientLight: 'from-blue-600 to-orange-500',
    gradientDark: 'from-primary to-neon-pink',
  },
  {
    icon: Sparkles,
    title: 'Real-Time Rendering',
    description:
      'Unreal Engine and Unity-powered real-time graphics and interactive 3D experiences.',
    gradientLight: 'from-orange-500 to-blue-600',
    gradientDark: 'from-accent to-primary',
  },
  {
    icon: Zap,
    title: 'Interactive Systems',
    description:
      'Touch screens, motion sensors, and custom hardware for interactive installations.',
    gradientLight: 'from-blue-600 to-orange-500',
    gradientDark: 'from-secondary to-accent',
  },
  {
    icon: Box,
    title: 'Physical Computing',
    description:
      'Arduino, Raspberry Pi, and custom electronics for physical-digital hybrid experiences.',
    gradientLight: 'from-orange-500 to-blue-600',
    gradientDark: 'from-neon-pink to-primary',
  },
];

const TechCard = ({
  tech,
  index,
}: {
  tech: (typeof technologies)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { theme } = useTheme();

  const Icon = tech.icon;
  const gradient =
    theme === 'dark' ? tech.gradientDark : tech.gradientLight;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative perspective"
    >
      {/* Glow effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className={`absolute -inset-4 bg-gradient-to-r ${gradient} opacity-20 blur-2xl rounded-3xl transition-opacity`}
      />

      <div className="relative glass rounded-2xl p-8 h-full overflow-hidden">
        {/* Animated background */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${gradient} opacity-10 rounded-full blur-3xl`}
        />

        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6`}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
          {tech.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {tech.description}
        </p>

        {/* Hover indicator */}
        <motion.div
          initial={{ width: 0 }}
          whileHover={{ width: '100%' }}
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${gradient}`}
        />
      </div>
    </motion.div>
  );
};

const TechStack = () => {
  return (
    <section className="py-32 px-4 md:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mb-20 text-center"
      >
        <span className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-4 block">
          Our Stack
        </span>
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
          Technologies We <span className="text-gradient">Master</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          From AR/VR to AI, we leverage cutting-edge technology to create
          experiences that push the boundaries of what&apos;s possible.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {technologies.map((tech, index) => (
          <TechCard key={tech.title} tech={tech} index={index} />
        ))}
      </div>
    </section>
  );
};

export default TechStack;
