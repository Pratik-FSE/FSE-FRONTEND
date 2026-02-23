import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Experiences from '@/components/Experiences';
// Projects section removed per request
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Custom cursor - desktop only */}
      <CustomCursor />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Experiences Section */}
        <Experiences />
        
        
        {/* Projects / Case Studies removed */}
        
        {/* Showreel, Process, and Testimonials removed per request */}
        
        {/* Contact Form */}
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
