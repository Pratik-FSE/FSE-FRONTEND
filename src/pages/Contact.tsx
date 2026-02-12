import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <CustomCursor />
      <Navigation />
      
      <main>
        <ContactHero />
        <ContactForm />
        
        {/* Map or visual section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-20 px-4 md:px-8 lg:px-16"
        >
          <div className="max-w-7xl mx-auto">
            <div className="relative h-[400px] rounded-3xl overflow-hidden glass">
              {/* Placeholder for map or visual */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20" />
              
              {/* Animated grid */}
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ duration: 30, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px',
                }}
              />
              
              {/* Center pin */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 w-16 h-16 rounded-full bg-primary blur-xl"
                  />
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white" />
                  </div>
                </div>
              </motion.div>
              
              {/* Location label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute bottom-8 left-8 glass rounded-xl px-6 py-4"
              >
                <div className="text-sm text-muted-foreground">Headquarters</div>
                <div className="text-lg font-display font-semibold">Bangalore, India</div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
