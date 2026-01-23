import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ExperiencesHero from '@/components/experiences/ExperiencesHero';
import ExperienceCategory from '@/components/experiences/ExperienceCategory';
import HorizontalScroller from '@/components/experiences/HorizontalScroller';
import { motion } from 'framer-motion';

const categories = [
  {
    title: 'Gaming & Esports',
    description:
      'Premium gaming experiences featuring the latest consoles, racing simulators, and competitive esports setups for events of any scale.',
    items: [
      'PlayStation Lounge',
      'Xbox Gaming Zone',
      'Racing Simulators',
      'VR Gaming Arena',
      'Esports Tournament Setup',
    ],
    gradient: 'dark:from-primary dark:to-secondary',
  },
  {
    title: 'Photo & Video Booths',
    description:
      'Cutting-edge photo experiences powered by AI and AR technology, creating shareable moments that amplify brand reach.',
    items: [
      'AI Photo Booth',
      'AR Photo Experience',
      'Green Screen Studio',
      '360° Video Booth',
      'Slow Motion Booth',
    ],
    gradient: 'dark:from-accent dark:to-primary',
  },
  {
    title: 'Visual Displays',
    description:
      'Jaw-dropping visual installations from LED walls to anamorphic displays that captivate and mesmerize audiences.',
    items: [
      'Anamorphic Displays',
      'LED Wall Installations',
      'Holographic Displays',
      'Projection Mapping',
      'Interactive Screens',
    ],
    gradient: 'dark:from-secondary dark:to-accent',
  },
  {
    title: 'Brand Activations',
    description:
      'Custom experiential activations designed to create unforgettable brand moments and drive engagement.',
    items: [
      'Brand Reveal Videos',
      'Logo Animations',
      'Trophy Animations',
      'Destination Reveals',
      'Speaker Intros',
    ],
    gradient: 'dark:from-neon-cyan dark:to-primary',
  },
];

const Experiences = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <CustomCursor />
      <Navigation />

      <main>
        <ExperiencesHero />

        {/* Category Sections */}
        {categories.map((category, index) => (
          <ExperienceCategory
            key={category.title}
            title={category.title}
            description={category.description}
            items={category.items}
            gradient={category.gradient}
            index={index}
          />
        ))}

        {/* Horizontal Scroll Section */}
        <HorizontalScroller />

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-32 px-4 relative overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-primary/5 dark:bg-gradient-to-r dark:from-primary/5 dark:via-accent/5 dark:to-secondary/5" />

          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 30, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       w-[600px] h-[600px] rounded-full
                       bg-secondary/10
                       dark:bg-gradient-to-br dark:from-primary/10 dark:to-accent/10
                       blur-[100px]"
          />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-display font-bold mb-8"
            >
              Ready to create{' '}
              <span className="text-secondary dark:text-gradient">magic</span>?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            >
              Let's discuss your next event and explore how we can create an
              unforgettable experience for your audience.
            </motion.p>

            <motion.a
              href="/contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                inline-flex items-center gap-3 px-10 py-5 rounded-full
                bg-primary text-primary-foreground
                hover:bg-secondary hover:text-secondary-foreground
                dark:bg-gradient-to-r dark:from-primary dark:via-accent dark:to-secondary
                font-semibold text-lg transition-colors
              "
            >
              <span>Book a Consultation</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Experiences;
