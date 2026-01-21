import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Lightbulb, Palette, Rocket, Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Discover",
    description: "We dive deep into your brand, event goals, and audience to understand the perfect tech-driven experience.",
    color: "primary",
    gradient: "from-primary to-accent",
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Design",
    description: "Our creative team crafts immersive concepts, blending cutting-edge tech with stunning visual design.",
    color: "secondary",
    gradient: "from-secondary to-primary",
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Deploy",
    description: "We handle everything—from hardware setup to software integration—ensuring flawless execution.",
    color: "accent",
    gradient: "from-accent to-secondary",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Delight",
    description: "Watch as guests engage with unforgettable experiences that drive social buzz and brand love.",
    color: "primary",
    gradient: "from-primary to-secondary",
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineProgress = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '100%']);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background with parallax */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
      />
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"
        style={{ x: useTransform(scrollYProgress, [0, 1], [-100, 0]) }}
      />
      <motion.div 
        className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2"
        style={{ x: useTransform(scrollYProgress, [0, 1], [100, 0]) }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6"
          >
            How It Works
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-foreground">Our Creative</span>
            <br />
            <span className="text-gradient">Process</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg text-muted-foreground"
          >
            From concept to execution, we partner with you at every step to 
            create experiences that exceed expectations.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent opacity-30 hidden lg:block" />
          <motion.div 
            className="absolute top-1/2 left-0 h-0.5 bg-gradient-neon hidden lg:block"
            style={{ width: lineProgress }}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="relative group"
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Step card */}
                <motion.div 
                  className="relative p-8 rounded-2xl glass border border-border/50 hover:border-primary/50 transition-all duration-300 h-full overflow-hidden"
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  {/* Animated background on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 transition-opacity duration-500`}
                    animate={{ opacity: hoveredStep === index ? 0.1 : 0 }}
                  />

                  {/* Step number */}
                  <motion.div 
                    className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center font-display font-bold text-primary z-10"
                    animate={{ 
                      scale: hoveredStep === index ? 1.2 : 1,
                      rotate: hoveredStep === index ? 360 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Icon with animated background */}
                  <motion.div
                    className={`relative inline-flex p-4 rounded-xl bg-gradient-to-br ${step.gradient} mb-6 overflow-hidden`}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={hoveredStep === index ? { x: ['-100%', '100%'] } : {}}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                    />
                    <span className="relative text-foreground">{step.icon}</span>
                  </motion.div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-gradient transition-all duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Hover glow */}
                  <motion.div 
                    className="absolute -inset-px bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-2xl -z-10 blur-xl"
                    animate={{ opacity: hoveredStep === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Arrow connector (desktop only) */}
                {index < steps.length - 1 && (
                  <motion.div 
                    className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10"
                    animate={{ 
                      x: hoveredStep === index ? 5 : 0,
                      scale: hoveredStep === index ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border"
                    >
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            onClick={() => navigate('/contact')}
            className="group relative px-8 py-4 rounded-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-hover
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-neon"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            />
            
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            
            <span className="relative font-display font-semibold text-foreground flex items-center gap-2">
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
