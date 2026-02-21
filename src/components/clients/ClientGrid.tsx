import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Client {
  name: string;
  industry: string;
  events: number;
  gradient: string;
}

interface ApiClient {
  name?: string;
}

const gradients = [
  'from-primary to-accent',
  'from-secondary to-primary',
  'from-accent to-secondary',
  'from-neon-cyan to-secondary',
  'from-primary to-neon-pink',
  'from-accent to-primary',
];

const ClientCard = ({ client, index }: { client: Client; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      {/* Glow effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.3 : 0 }}
        className={`absolute -inset-2 bg-gradient-to-r ${client.gradient} rounded-3xl blur-xl`}
      />

      <div className="relative glass rounded-2xl p-8 h-full overflow-hidden">
        {/* Background accent */}
        <motion.div
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.3 : 0.1,
          }}
          className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${client.gradient} rounded-full blur-3xl`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Logo placeholder */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${client.gradient} flex items-center justify-center mb-6`}
          >
            <span className="text-2xl font-display font-bold text-white">
              {client.name.charAt(0)}
            </span>
          </motion.div>

          <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
            {client.name}
          </h3>
          
          <p className="text-muted-foreground mb-4">{client.industry}</p>

          {/* Stats */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-border/30">
              <div className="text-3xl font-display font-bold text-gradient">
                {client.events}
              </div>
              <div className="text-sm text-muted-foreground">Events Completed</div>
            </div>
          </motion.div>
        </div>

        {/* Hover border */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, hsl(var(--primary) / 0.5) 0%, transparent 50%, hsl(var(--secondary) / 0.5) 100%)`,
            padding: '1px',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
            WebkitMaskComposite: 'xor',
          }}
        />
      </div>
    </motion.div>
  );
};

const ClientGrid = () => {
  const apiBase = (import.meta.env.VITE_API_BASE ?? '').replace(/\/$/, '');
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${apiBase}/api/clients`);
        if (!response.ok) {
          throw new Error('Failed to load clients');
        }

        const data = (await response.json()) as ApiClient[];
        if (!Array.isArray(data)) {
          throw new Error('Invalid clients response');
        }

        setClients(
          data.map((item, index) => ({
            name: item.name || 'Client',
            industry: 'Partner',
            events: index + 1,
            gradient: gradients[index % gradients.length],
          }))
        );
      } catch (fetchError) {
        setError(
          fetchError instanceof Error ? fetchError.message : 'Failed to load clients'
        );
        setClients([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, [apiBase]);

  return (
    <section className="py-32 px-4 md:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
          Our <span className="text-gradient">Partners</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl">
          We're proud to work with some of the world's most innovative brands
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading && <p className="col-span-full text-muted-foreground">Loading clients...</p>}
        {!isLoading && error && <p className="col-span-full text-destructive">{error}</p>}
        {!isLoading && !error && clients.length === 0 && (
          <p className="col-span-full text-muted-foreground">No clients available.</p>
        )}
        {!isLoading &&
          !error &&
          clients.map((client, index) => (
            <ClientCard key={`${client.name}-${index}`} client={client} index={index} />
          ))}
      </div>
    </section>
  );
};

export default ClientGrid;
