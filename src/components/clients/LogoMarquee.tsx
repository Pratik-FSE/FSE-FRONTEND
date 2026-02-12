import { motion } from 'framer-motion';

const brands = [
  'Microsoft', 'Google', 'TATA', 'Schneider', 'P&G', 'PepsiCo', 'Pidilite', 'TotalEnergies',
  'Yes Bank', 'ICICI Lombard', 'Kotak Bank', 'Zurich Kotak', 'Glenmark', 'Pfizer', 'Marico', 'Abbott',
];

const LogoMarquee = () => {
  return (
    <section className="py-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold">
          Trusted by <span className="text-gradient">200+ Brands</span>
        </h2>
      </motion.div>

      {/* First marquee - left to right */}
      <div className="relative mb-8">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12"
        >
          {[...brands, ...brands].map((brand, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex-shrink-0 px-8 py-4 glass rounded-xl cursor-pointer group"
            >
              <span className="text-xl font-display font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                {brand}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Second marquee - right to left */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div
          animate={{ x: [-1920, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12"
        >
          {[...brands.slice().reverse(), ...brands.slice().reverse()].map((brand, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex-shrink-0 px-8 py-4 glass rounded-xl cursor-pointer group"
            >
              <span className="text-xl font-display font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                {brand}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoMarquee;
