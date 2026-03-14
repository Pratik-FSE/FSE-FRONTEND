import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactHero from '@/components/contact/ContactHero';
import ContactDetailsBlock from '@/components/contact/ContactDetailsBlock';

const Contact = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <CustomCursor />
      <Navigation />
      
      <main>
        <ContactHero />
        <ContactDetailsBlock />
        
        {/* Map removed per request */}
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
