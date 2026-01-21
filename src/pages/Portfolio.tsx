import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import CategoryFilter from '@/components/portfolio/CategoryFilter';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import PortfolioSlider from '@/components/portfolio/PortfolioSlider';
import { motion } from 'framer-motion';

const Portfolio = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <CustomCursor />
      <Navigation />
      
      <main>
        <PortfolioHero />
        
        {/* Filter Section */}
        <section className="py-16 px-4">
          <CategoryFilter />
        </section>
        
        {/* Grid Section */}
        <PortfolioGrid />
        
        {/* Horizontal Slider */}
        <PortfolioSlider />
        
        {/* Stats Banner */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-32 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Events' },
              { value: '10M+', label: 'Impressions' },
              { value: '200+', label: 'Brands' },
              { value: '50+', label: 'Cities' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-5xl md:text-7xl font-display font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground uppercase tracking-widest text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Portfolio;
