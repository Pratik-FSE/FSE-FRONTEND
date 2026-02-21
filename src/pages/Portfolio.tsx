import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import PortfolioSlider from '@/components/portfolio/PortfolioSlider';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesGrid from '@/components/services/ServicesGrid';
import ServicesCTA from '@/components/services/ServicesCTA';
import { motion } from 'framer-motion';

const Portfolio = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <CustomCursor />
      <Navigation />
      
      <main>
        <PortfolioHero />

        {/* Services merged into Portfolio */}
        <ServicesHero />
        <ServicesGrid />

        {/* Filter Section removed per request */}

        {/* Grid Section */}
        <PortfolioGrid />

        {/* Horizontal Slider */}
        <PortfolioSlider />

        {/* Services CTA (merged) */}
        <ServicesCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Portfolio;
