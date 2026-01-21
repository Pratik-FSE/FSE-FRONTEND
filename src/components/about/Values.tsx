import { motion } from 'framer-motion';
import { Sparkles, Zap, Heart, Eye, Layers, Target } from 'lucide-react';

const values = [
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'Pushing boundaries with cutting-edge technology',
    gradient: 'from-primary to-accent',
  },
  {
    icon: Eye,
    title: 'Vision',
    description: 'Seeing possibilities where others see limits',
    gradient: 'from-secondary to-primary',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Every project crafted with obsessive attention',
    gradient: 'from-accent to-neon-pink',
  },
  {
    icon: Zap,
    title: 'Impact',
    description: 'Creating moments that resonate forever',
    gradient: 'from-neon-cyan to-secondary',
  },
  {
    icon: Layers,
    title: 'Craft',
    description: 'Mastering the art of experiential design',
    gradient: 'from-primary to-secondary',
  },
  {
    icon: Target,
    title: 'Precision',
    description: 'Flawless execution, every single time',
    gradient: 'from-accent to-primary',
  },
];

const Values = () => {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">What Drives Us</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">
            Our <span className="text-gradient">Values</span>
          </h2>
        </motion.div>

        {/* Values grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="glass p-8 rounded-2xl h-full border border-transparent hover:border-primary/30 transition-all duration-500">
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <value.icon className="w-full h-full text-foreground" />
                </motion.div>

                {/* Title with animated underline */}
                <h3 className="font-display text-2xl font-bold text-foreground mb-3 relative inline-block">
                  {value.title}
                  <motion.span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r ${value.gradient}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  />
                </h3>

                {/* Description */}
                <p className="text-muted-foreground font-body leading-relaxed">
                  {value.description}
                </p>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
