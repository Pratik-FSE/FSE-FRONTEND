import { useEffect } from 'react';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import AboutHero from '@/components/about/AboutHero';
import BrandManifesto from '@/components/about/BrandManifesto';
import Values from '@/components/about/Values';
import Footer from '@/components/Footer';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <CustomCursor />
      <Navigation />
      
      <main>
        <AboutHero />
        <BrandManifesto />
        <Values />
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
