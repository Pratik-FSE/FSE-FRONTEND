import { motion } from 'framer-motion';
import { Sparkles, Zap, Heart, Eye, Layers, Target, Shield, Compass, Lightbulb, Globe, Award, Users } from 'lucide-react';

const values = [
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'Pushing boundaries with cutting-edge technology to create unprecedented experiences.',
    gradient: 'from-primary to-accent',
    stats: '15+ Patents'
  },
  {
    icon: Eye,
    title: 'Vision',
    description: 'Seeing possibilities where others see limits, imagining the future of events.',
    gradient: 'from-secondary to-primary',
    stats: '2025 Trendsetter'
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Every project crafted with obsessive attention to detail and emotional impact.',
    gradient: 'from-accent to-neon-pink',
    stats: '100% Dedication'
  },
  {
    icon: Zap,
    title: 'Impact',
    description: 'Creating moments that resonate forever with audiences across the globe.',
    gradient: 'from-neon-cyan to-secondary',
    stats: '1M+ Impressions'
  },
  {
    icon: Layers,
    title: 'Craft',
    description: 'Mastering the art of experiential design through continuous refinement.',
    gradient: 'from-primary to-secondary',
    stats: '500+ Projects'
  },
  {
    icon: Target,
    title: 'Precision',
    description: 'Flawless execution, every single time with measurable results.',
    gradient: 'from-accent to-primary',
    stats: '99.9% Accuracy'
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'Building trust through transparency, reliability, and ethical practices.',
    gradient: 'from-primary to-neon-cyan',
    stats: '100% Trusted'
  },
  {
    icon: Compass,
    title: 'Direction',
    description: 'Guiding brands toward their North Star with clarity and purpose.',
    gradient: 'from-secondary to-accent',
    stats: '50+ Brands'
  },
  {
    icon: Lightbulb,
    title: 'Creativity',
    description: 'Unleashing boundless imagination to solve complex challenges beautifully.',
    gradient: 'from-neon-pink to-primary',
    stats: '∞ Ideas'
  }
];

const Values = () => {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
        
        {/* Animated background orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--secondary) / 0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
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
            Our <span className="text-gradient">Core Values</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto mt-6">
            The principles that guide every experience we create and every relationship we build
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-12 md:gap-20 mb-20 p-8 glass rounded-2xl"
        >
          {[
            { icon: Award, label: 'Awards', value: '25+' },
            { icon: Globe, label: 'Countries', value: '15' },
            { icon: Users, label: 'Happy Clients', value: '200+' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="font-display text-2xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Values grid - now 3x3 for more content */}
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
                {/* Icon with stat badge */}
                <div className="flex justify-between items-start mb-4">
                  <motion.div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.gradient} p-4 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <value.icon className="w-full h-full text-foreground" />
                  </motion.div>
                  <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {value.stats}
                  </span>
                </div>

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

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="font-display text-2xl md:text-3xl text-muted-foreground italic">
            "These values aren't just words on a wall — they're the DNA of every experience we create."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Values;