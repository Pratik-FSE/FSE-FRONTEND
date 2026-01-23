import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesCTA = () => {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden bg-white dark:bg-background">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Center glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 60%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Secondary glows (dark-only intensity) */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-40 dark:opacity-100"
          style={{
            background:
              'radial-gradient(circle, hsl(var(--secondary) / 0.1) 0%, transparent 70%)',
          }}
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-40 dark:opacity-100"
          style={{
            background:
              'radial-gradient(circle, hsl(var(--accent) / 0.1) 0%, transparent 70%)',
          }}
          animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 15 }}
            className="inline-flex mb-8"
          >
            <div
              className="
                w-20 h-20 rounded-2xl p-5
                bg-blue-600 dark:bg-gradient-to-br dark:from-primary dark:to-accent
                text-white
              "
            >
              <Sparkles className="w-full h-full" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-black dark:text-foreground">
              Ready to Create
            </span>
            <br />
            <span className="text-blue-600 dark:text-gradient">
              Something Extraordinary?
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="
              text-xl font-body mb-12 max-w-2xl mx-auto
              text-gray-600 dark:text-muted-foreground
            "
          >
            Let's discuss how we can transform your next event into an
            unforgettable experience. Our team is ready to bring your vision to life.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Primary CTA */}
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  px-8 py-4 rounded-full font-display font-bold text-lg
                  flex items-center justify-center gap-3
                  bg-blue-600 text-white
                  hover:bg-orange-500
                  transition-colors shadow-lg
                "
                data-cursor-hover
              >
                Book a Consultation
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
            </Link>

            {/* Secondary CTA */}
            <Link to="/#projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  px-8 py-4 rounded-full font-display font-bold text-lg
                  border border-blue-600 text-blue-600
                  hover:border-orange-500 hover:text-orange-500
                  dark:border-primary/50 dark:text-foreground
                  dark:hover:bg-primary/10
                  transition-colors
                "
                data-cursor-hover
              >
                View Our Work
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;
