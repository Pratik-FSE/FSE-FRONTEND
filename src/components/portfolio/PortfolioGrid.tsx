import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
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

interface ApiProject {
  id?: number | string;
  title?: string;
  categories?: string[];
  category?: string;
  clientId?: string;
  client?: string;
  clientName?: string;
  date?: string;
  location?: string;
  stats?: { label?: string; value?: string | number }[];
}

const projectColors = [
  'from-primary to-accent',
  'from-secondary to-primary',
  'from-accent to-secondary',
  'from-primary to-secondary',
  'from-secondary to-accent',
  'from-accent to-primary',
];

const projectSizes: Project['size'][] = [
  'large',
  'medium',
  'small',
  'small',
  'medium',
  'large',
];

const ProjectCard = ({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: () => void;
}) => {
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
      transition={{ duration: 0.8, delay: index * 0.08 }}
      className={`${sizeClasses[project.size]} ${heightClasses[project.size]} relative group cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
    >
      {/* Light-mode subtle tint / Dark-mode gradient */}
      <div
        className={`
          absolute inset-0 rounded-2xl transition-opacity duration-500
          bg-primary/5 group-hover:bg-secondary/10
          dark:bg-gradient-to-br dark:${project.color} dark:opacity-20 dark:group-hover:opacity-40
        `}
      />

      {/* Card */}
      <div className="absolute inset-0 glass rounded-2xl overflow-hidden border border-border/40 dark:border-border">
        <div className="absolute inset-0 noise-overlay opacity-30 dark:opacity-50" />

        {/* Content */}
        <div className="relative h-full p-6 md:p-8 flex flex-col justify-between z-10">
          {/* Top */}
          <div className="flex justify-between items-start">
            <span className="px-4 py-2 rounded-full text-sm bg-background/70 text-muted-foreground backdrop-blur-sm">
              {project.category}
            </span>
            <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-primary group-hover:text-secondary transition-colors" />
            </div>
          </div>

          {/* Bottom */}
          <div>
            <motion.h3
              animate={{ y: isHovered ? -6 : 0 }}
              className="text-2xl md:text-4xl font-display font-bold mb-2 text-foreground"
            >
              {project.title}
            </motion.h3>

            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>{project.client}</span>
              <span>&bull;</span>
              <span>{project.location}</span>
              <span>&bull;</span>
              <span>{project.year}</span>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isHovered ? 'auto' : 0,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4"
            >
              <div className="flex gap-6 pt-4 border-t border-border/30">
                {project.stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-display font-bold text-primary dark:text-gradient">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hover border */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, hsl(var(--primary) / 0.4), transparent 50%, hsl(var(--secondary) / 0.4))',
            padding: '2px',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
          }}
        />
      </div>
    </motion.div>
  );
};

// ---------- MODAL (unchanged structurally) ----------

const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) => {
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
        <div className="flex-1 relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-foreground/10 flex items-center justify-center">
              <Play className="w-10 h-10 text-foreground" />
            </div>
          </div>
          <div className="absolute inset-0 noise-overlay" />
        </div>

        <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center relative">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 w-12 h-12 rounded-full glass flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>

          <span className="text-primary mb-4">{project.category}</span>

          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
            {project.title}
          </h2>

          <div className="flex gap-6 text-muted-foreground mb-12">
            <span>{project.client}</span>
            <span>&bull;</span>
            <span>{project.location}</span>
            <span>&bull;</span>
            <span>{project.year}</span>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-12">
            {project.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-display font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed">
            An immersive experiential activation that transformed the event space
            into a multisensory journey.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PortfolioGrid = () => {
  const apiBase = (import.meta.env.VITE_API_BASE ?? '').replace(/\/$/, '');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${apiBase}/api/projects`);
        if (!response.ok) {
          throw new Error('Failed to load projects');
        }

        const data = (await response.json()) as ApiProject[];
        if (!Array.isArray(data)) {
          throw new Error('Invalid projects response');
        }

        setProjects(
          data.map((project, index) => {
            const rawDate = typeof project.date === 'string' ? project.date : '';
            const parsedDate = rawDate ? new Date(rawDate) : null;
            const year =
              parsedDate && !Number.isNaN(parsedDate.getTime())
                ? String(parsedDate.getFullYear())
                : 'N/A';
            const categories = Array.isArray(project.categories)
              ? project.categories
              : [];
            const stats = Array.isArray(project.stats)
              ? project.stats
                  .filter((item) => item && item.label && item.value !== undefined)
                  .map((item) => ({
                    label: String(item.label),
                    value: String(item.value),
                  }))
              : [];

            return {
              id: index + 1,
              title: project.title || 'Untitled Project',
              category: categories[0] || project.category || 'Experiential',
              client:
                project.client ||
                project.clientName ||
                project.clientId ||
                'Client',
              location: project.location || 'TBD',
              year,
              stats:
                stats.length > 0
                  ? stats
                  : [{ label: 'Impact', value: 'N/A' }],
              color: projectColors[index % projectColors.length],
              size: projectSizes[index % projectSizes.length],
            };
          })
        );
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : 'Failed to load projects'
        );
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [apiBase]);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
        {isLoading && <p className="text-muted-foreground">Loading projects...</p>}
        {!isLoading && error && <p className="text-destructive">{error}</p>}
        {!isLoading && !error && projects.length === 0 && (
          <p className="text-muted-foreground">No projects available.</p>
        )}
        {!isLoading &&
          !error &&
          projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
      </div>

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