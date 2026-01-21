import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  brand: string;
  location: string;
  date: string;
  highlights: string[];
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Milan Fashion Week 2024",
    brand: "Versace",
    location: "Milan, Italy",
    date: "September 2024",
    highlights: ["360° AR Mirror", "AI Style Generator", "Interactive Runway Wall"],
    color: "from-primary to-accent",
  },
  {
    id: 2,
    title: "Brand Launch Party",
    brand: "Nike Future",
    location: "New York, USA",
    date: "August 2024",
    highlights: ["Holographic Product Display", "Motion Gaming Zone", "Social Media Wall"],
    color: "from-secondary to-primary",
  },
  {
    id: 3,
    title: "Music Festival Activation",
    brand: "Coachella x Spotify",
    location: "California, USA",
    date: "April 2024",
    highlights: ["AI Music Photo Booth", "LED Dance Floor", "Festival Leaderboard"],
    color: "from-accent to-secondary",
  },
  {
    id: 4,
    title: "Luxury Store Opening",
    brand: "Louis Vuitton",
    location: "Dubai, UAE",
    date: "March 2024",
    highlights: ["VIP AR Experience", "Digital Art Gallery", "Exclusive Gaming Lounge"],
    color: "from-primary to-secondary",
  },
  {
    id: 5,
    title: "Tech Conference",
    brand: "Meta Connect",
    location: "San Francisco, USA",
    date: "October 2024",
    highlights: ["VR Demo Stations", "AI Avatar Creator", "Interactive Demo Wall"],
    color: "from-secondary to-accent",
  },
];

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20, rotateX: -10 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative w-full max-w-4xl rounded-3xl glass overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 rounded-full glass hover:bg-primary/20 transition-colors"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          data-cursor-hover
        >
          <X className="w-6 h-6" />
        </motion.button>

        {/* Header image placeholder */}
        <div className={`h-64 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
          {/* Animated grid */}
          <motion.div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, hsl(var(--foreground) / 0.1) 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }}
            animate={{ backgroundPosition: ['0px 0px', '30px 30px'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
          
          <motion.div 
            className="absolute bottom-6 left-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-display text-5xl font-bold text-foreground/90">
              {project.brand}
            </span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <motion.h3 
                className="font-display text-2xl font-bold text-foreground mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {project.title}
              </motion.h3>
              <motion.div 
                className="flex flex-wrap gap-4 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {project.location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {project.date}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-foreground">
              Key Installations
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              {project.highlights.map((highlight, index) => (
                <motion.div
                  key={highlight}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/50 transition-colors"
                >
                  <span className="font-body text-foreground">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Description placeholder */}
          <motion.p 
            className="font-body text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            An immersive experience that combined cutting-edge technology with 
            world-class design. Our installations engaged over 10,000 guests and 
            generated millions of social media impressions, creating unforgettable 
            brand moments.
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollProgress = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setScrollProgress(scrollLeft / (scrollWidth - clientWidth));
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background with parallax */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-muted/10 via-background to-background"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-accent"
            >
              Case Studies
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold"
            >
              <span className="text-foreground">Our Latest</span>
              <br />
              <span className="text-gradient">Projects</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            {/* Navigation arrows */}
            <div className="hidden md:flex gap-2">
              <motion.button
                onClick={() => handleScroll('left')}
                className="p-3 rounded-full glass border border-border hover:border-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                data-cursor-hover
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => handleScroll('right')}
                className="p-3 rounded-full glass border border-border hover:border-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                data-cursor-hover
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>

            <motion.button
              onClick={() => navigate('/portfolio')}
              className="flex items-center gap-2 px-6 py-3 rounded-full glass text-foreground hover:text-primary transition-colors group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor-hover
            >
              View all projects
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>

        {/* Horizontal scrolling projects with slider */}
        <div className="relative -mx-6 px-6">
          <div 
            ref={scrollContainerRef}
            onScroll={handleScrollProgress}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth"
            style={{ scrollBehavior: 'smooth' }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="flex-shrink-0 w-[350px] snap-start"
              >
                <motion.div
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer h-full rounded-2xl glass border border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300"
                  whileHover={{ y: -10, scale: 1.02 }}
                  data-cursor-hover
                >
                  {/* Image placeholder */}
                  <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                    {/* Animated grid */}
                    <motion.div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px),
                                          linear-gradient(90deg, hsl(var(--foreground) / 0.1) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                      }}
                    />
                    
                    {/* Brand overlay */}
                    <motion.div 
                      className="absolute bottom-4 left-4"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <span className="font-display text-2xl font-bold text-foreground/90">
                        {project.brand}
                      </span>
                    </motion.div>

                    {/* Hover overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    >
                      <motion.span 
                        className="px-4 py-2 rounded-full bg-background/80 text-sm font-medium flex items-center gap-2"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1 }}
                      >
                        View Project <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-display text-lg font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                      {project.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </span>
                      <span>{project.date}</span>
                    </div>

                    {/* Highlights tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.highlights.slice(0, 2).map((highlight) => (
                        <span
                          key={highlight}
                          className="px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground"
                        >
                          {highlight}
                        </span>
                      ))}
                      {project.highlights.length > 2 && (
                        <span className="px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground">
                          +{project.highlights.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <motion.div 
            className="mt-6 h-1 bg-muted rounded-full overflow-hidden max-w-xs mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className="h-full bg-gradient-neon"
              style={{ width: `${(scrollProgress * 100) || 20}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>
        </div>
      </div>

      {/* Project Modal */}
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

export default Projects;
