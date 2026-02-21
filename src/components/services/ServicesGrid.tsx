import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Gamepad2,
  Camera,
  Glasses,
  Monitor,
  Video,
  Clapperboard,
  Sparkles,
  Settings,
  Mic,
  Map,
  Trophy,
  LayoutGrid,
} from 'lucide-react';
import ServiceCard from './ServiceCard';
import ServiceModal from './ServiceModal';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: typeof Gamepad2;
  gradient: string;
  features: string[];
  details: string;
  useCases: string[];
}

interface ApiService {
  id?: string;
  title?: string;
  summary?: string;
}

const serviceIcons = [
  Gamepad2,
  Camera,
  Glasses,
  Monitor,
  LayoutGrid,
  Video,
  Sparkles,
  Settings,
  Mic,
  Map,
  Trophy,
  Clapperboard,
];

const serviceGradients = [
  'from-primary to-accent',
  'from-secondary to-primary',
  'from-accent to-neon-pink',
  'from-neon-cyan to-secondary',
  'from-primary to-secondary',
  'from-accent to-primary',
  'from-secondary to-accent',
  'from-neon-pink to-accent',
  'from-primary to-neon-cyan',
  'from-secondary to-primary',
  'from-accent to-secondary',
  'from-neon-pink to-primary',
];

const ServicesGrid = () => {
  const apiBase = (import.meta.env.VITE_API_BASE ?? '').replace(/\/$/, '');
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${apiBase}/api/services`);
        if (!response.ok) {
          throw new Error('Failed to load services');
        }

        const data = (await response.json()) as ApiService[];
        if (!Array.isArray(data)) {
          throw new Error('Invalid services response');
        }

        setServices(
          data.map((service, index) => {
            const summary = service.summary || '';
            return {
              id: service.id || `service-${index + 1}`,
              title: service.title || 'Service',
              description: summary,
              icon: serviceIcons[index % serviceIcons.length],
              gradient: serviceGradients[index % serviceGradients.length],
              features: [],
              details: summary,
              useCases: [],
            };
          })
        );
      } catch (fetchError) {
        setError(
          fetchError instanceof Error ? fetchError.message : 'Failed to load services'
        );
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [apiBase]);

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase">
            Full Spectrum
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">
            <span className="text-gradient">12</span> Ways to Wow
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Explore our complete range of experiential technology services.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading && <p className="md:col-span-2 lg:col-span-3 text-muted-foreground">Loading services...</p>}
          {!isLoading && error && (
            <p className="md:col-span-2 lg:col-span-3 text-destructive">{error}</p>
          )}
          {!isLoading && !error && services.length === 0 && (
            <p className="md:col-span-2 lg:col-span-3 text-muted-foreground">
              No services available.
            </p>
          )}
          {!isLoading &&
            !error &&
            services.map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                gradient={service.gradient}
                features={service.features}
                index={index}
                onClick={() => setSelectedService(service)}
              />
            ))}
        </div>
      </div>

      <ServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
    </section>
  );
};

export default ServicesGrid;
