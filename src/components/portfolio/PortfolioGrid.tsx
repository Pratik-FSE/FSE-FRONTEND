import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight, X, Play } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  stats: { label: string; value: string }[];
  color: string;
  size: 'large' | 'medium' | 'small';
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Lakme Fashion Week',
    category: 'AR Photo Booth',
    client: 'Lakme India',
    location: 'Mumbai',
    year: '2024',
    stats: [
      { label: 'Footfall', value: '50K+' },
      { label: 'Engagement', value: '85%' },
      { label: 'Shares', value: '12K' },
    ],
    color: 'from-primary to-accent',
    size: 'large',
  },
  {
    id: 2,
    title: 'Tech Summit',
    category: 'Gaming Zone',
    client: 'Microsoft',
    location: 'Bangalore',
    year: '2024',
    stats: [
      { label: 'Players', value: '8K+' },
      { label: 'Hours', value: '2000+' },
    ],
    color: 'from-secondary to-primary',
    size: 'medium',
  },
  {
    id: 3,
    title: 'Neon Nights',
    category: 'LED Installation',
    client: 'Red Bull',
    location: 'Delhi',
    year: '2023',
    stats: [
      { label: 'Attendees', value: '25K' },
      { label: 'Social Reach', value: '2M+' },
    ],
    color: 'from-accent to-neon-pink',
    size: 'small',
  },
  {
    id: 4,
    title: 'Brand Launch',
    category: 'Anamorphic Display',
    client: 'Nike',
    location: 'Mumbai',
    year: '2024',
    stats: [
      { label: 'Views', value: '500K+' },
      { label: 'PR Value', value: '₹5Cr' },
    ],
    color: 'from-neon-cyan to-secondary',
    size: 'small',
  },
  {
    id: 5,
    title: 'Music Festival',
    category: 'AI Photo Booth',
    client: 'Sunburn',
    location: 'Goa',
    year: '2024',
    stats: [
      { label: 'Photos', value: '100K+' },
      { label: 'Downloads', value: '45K' },
    ],
    color: 'from-primary to-secondary',
    size: 'medium',
  },
  {
    id: 6,
    title: 'Product Reveal',
    category: 'Holographic Display',
    client: 'Apple',
    location: 'Delhi',
    year: '2024',
    stats: [
      { label: 'VIP Guests', value: '500+' },
      { label: 'Media Coverage', value: '200+' },
    ],
    color: 'from-accent to-primary',
    size: 'large',
  },
];

const ProjectCard = ({ project, index, onSelect }: { project: Project; index: number; onSelect: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    large: 'col-span-2 row-span-2',
    medium: 'col-span-1 row-span-2',
    small: 'col-span-1 row-span-1',
  };

  const heightClasses = {
    large: 'h-[600px]',
    medium: 'h-[500px]',
    small: 'h-[280px]',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`${sizeClasses[project.size]} ${heightClasses[project.size]} relative group cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 rounded-2xl transition-opacity duration-500 group-hover:opacity-40`} />
      
      {/* Glass card */}
      <div className="absolute inset-0 glass rounded-2xl overflow-hidden">
        {/* Animated noise overlay */}
        <div className="absolute inset-0 noise-overlay opacity-50" />
        
        {/* Hover distortion effect */}
        <motion.div
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            filter: isHovered ? 'blur(0px)' : 'blur(2px)',
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className={`w-32 h-32 bg-gradient-to-br ${project.color} rounded-full opacity-30 blur-3xl`} />
        </motion.div>

        {/* Content */}
        <div className="relative h-full p-6 md:p-8 flex flex-col justify-between z-10">
          {/* Top */}
          <div className="flex justify-between items-start">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="px-4 py-2 bg-background/50 rounded-full text-sm text-muted-foreground backdrop-blur-sm"
            >
              {project.category}
            </motion.span>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 45 }}
              className="w-12 h-12 rounded-full glass flex items-center justify-center"
            >
              <ArrowUpRight className="w-5 h-5 text-foreground" />
            </motion.div>
          </div>

          {/* Bottom */}
          <div>
            <motion.h3
              animate={{ y: isHovered ? -10 : 0 }}
              className="text-2xl md:text-4xl font-display font-bold mb-2"
            >
              {project.title}
            </motion.h3>
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? -5 : 0 }}
              className="flex gap-4 text-sm text-muted-foreground"
            >
              <span>{project.client}</span>
              <span>•</span>
              <span>{project.location}</span>
              <span>•</span>
              <span>{project.year}</span>
            </motion.div>

            {/* Stats - visible on hover */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4"
            >
              <div className="flex gap-6 pt-4 border-t border-border/30">
                {project.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="text-2xl font-display font-bold text-gradient">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated border */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
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
  );
};

// Fullscreen Project Modal
const ProjectModal = ({ project, onClose }: { project: Project | null; onClose: () => void }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="h-full w-full flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left - Visual */}
        <div className="flex-1 relative overflow-hidden">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30`}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="w-24 h-24 rounded-full bg-foreground/10 flex items-center justify-center cursor-pointer group"
            >
              <Play className="w-10 h-10 text-foreground group-hover:scale-110 transition-transform" />
            </motion.div>
          </div>
          <div className="absolute inset-0 noise-overlay" />
        </div>

        {/* Right - Content */}
        <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center relative">
          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-8 right-8 w-12 h-12 rounded-full glass flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </motion.button>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary mb-4"
          >
            {project.category}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          >
            {project.title}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-6 text-muted-foreground mb-12"
          >
            <span>{project.client}</span>
            <span>•</span>
            <span>{project.location}</span>
            <span>•</span>
            <span>{project.year}</span>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-8 mb-12"
          >
            {project.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            An immersive experiential activation that transformed the event space into a 
            multisensory journey. Combining cutting-edge technology with artistic vision to 
            create unforgettable moments for every attendee.
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PortfolioGrid = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-32 px-4 md:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
          Featured <span className="text-gradient">Work</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl">
          A curated selection of our most impactful experiential installations
        </p>
      </motion.div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onSelect={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioGrid;
