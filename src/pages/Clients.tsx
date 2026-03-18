import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ClientsHero from '@/components/clients/ClientsHero';
import LogoMarquee from '@/components/clients/LogoMarquee';
import TestimonialSlider from '@/components/clients/TestimonialSlider';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Clients = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <CustomCursor />
      <Navigation />
      
      <main>
        <ClientsHero />
        <LogoMarquee />
        <TestimonialSlider />
        
        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-32 px-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-display font-bold mb-8"
            >
              Join Our <span className="text-gradient">Family</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            >
              Become part of our growing network of innovative brands 
              creating unforgettable experiences together.
            </motion.p>
            
            <motion.button
              type="button"
              onClick={() => {
                navigate('/contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary via-accent to-secondary rounded-full text-primary-foreground font-semibold text-lg"
            >
              <span>Partner With Us</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Clients;
