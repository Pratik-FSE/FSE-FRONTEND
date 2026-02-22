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
        
        {/* Map removed per request */}
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
