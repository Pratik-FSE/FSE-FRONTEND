import { useEffect } from 'react';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import AboutHero from '@/components/about/AboutHero';
import BrandManifesto from '@/components/about/BrandManifesto';
import Timeline from '@/components/about/Timeline';
import Values from '@/components/about/Values';
import Team from '@/components/about/Team';
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
        <Timeline />
        <Values />
        <Team />
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
