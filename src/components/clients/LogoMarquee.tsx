import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { fetchJSON } from '@/lib/api';

interface ApiClient {
  id?: string;
  name: string;
  logoUrl?: string;
  testimonial?: string;
}

const LogoMarquee = () => {
  const [clients, setClients] = useState<ApiClient[]>([]);

  useEffect(() => {
    let mounted = true;
    const fetchClients = async () => {
      try {
        const data = (await fetchJSON('/api/clients')) as ApiClient[];
        if (!Array.isArray(data)) throw new Error('invalid');
        if (mounted) setClients(data);
        return;
      } catch (e) {
        // fallback: try to load the backend static JSON file directly
        try {
          const res2 = await fetch('/backend/data/clients.json');
          if (!res2.ok) throw new Error('no-file');
          const data2 = (await res2.json()) as ApiClient[];
          if (mounted) setClients(Array.isArray(data2) ? data2 : []);
        } catch {
          // final fallback: empty list
          if (mounted) setClients([]);
        }
      }
    };

    fetchClients();
    return () => { mounted = false; };
  }, []);

  const first = clients.length ? clients : [];
  const leftList = [...first, ...first];
  const rightList = [...first.slice().reverse(), ...first.slice().reverse()];

  const renderItem = (client: ApiClient, i: number) => (
    <motion.div
      key={`${client.id ?? client.name}-${i}`}
      whileHover={{ scale: 1.05, y: -6 }}
      className="flex-shrink-0 px-6 py-4 glass rounded-xl cursor-pointer group relative"
    >
      {client.logoUrl ? (
        <img src={client.logoUrl} alt={client.name} className="h-12 object-contain mx-auto" />
      ) : (
        <span className="text-xl font-display font-semibold text-muted-foreground">
          {client.name}
        </span>
      )}

      {/* Hover overlay with name + testimonial */}
      {client.testimonial && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 bg-background/90 dark:bg-background rounded-md p-3 text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="font-semibold text-foreground mb-1">{client.name}</div>
          <div className="text-muted-foreground">{client.testimonial}</div>
        </div>
      )}
    </motion.div>
  );

  return (
    <section className="py-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold">
          Trusted by <span className="text-gradient">20+ Brands</span>
        </h2>
      </motion.div>

      {/* First marquee - left to right */}
      <div className="relative mb-8">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 items-center"
        >
          {leftList.map((c, i) => renderItem(c, i))}
        </motion.div>
      </div>

      {/* Second marquee - right to left */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          animate={{ x: [-1920, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 items-center"
        >
          {rightList.map((c, i) => renderItem(c, i))}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoMarquee;
