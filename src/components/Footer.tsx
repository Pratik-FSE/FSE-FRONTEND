import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Heart } from 'lucide-react';
import logoLight from '@/assets/logo-light.png';
import logoDark from '@/assets/logo-dark.jpg';
import { useTheme } from '@/contexts/ThemeContext';
const footerLinks = {
  pages: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'Technology', href: '/technology' },
    { label: 'Clients', href: '/clients' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    'AR Photo Booth',
    'AI Snap Art',
    'Gaming Zones',
    'LED Walls',
    'Custom Installations',
  ],
  social: [
    { label: 'Instagram', href: '#' },
    { label: 'Twitter', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'YouTube', href: '#' },
  ],
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const currentLogo = theme === 'dark' ? logoDark : logoLight;

  return (
    <footer className="relative py-20 border-t border-border/50 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/20 to-transparent" />
      
      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <Link to="/">
              <motion.div
                className="inline-block overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                data-cursor-hover
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={theme}
                    src={currentLogo}
                    alt="Fullscreen Experiences"
                    className="h-12 w-auto"
                    initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </AnimatePresence>
              </motion.div>
            </Link>
            
            <p className="font-body text-muted-foreground max-w-xs">
              Transforming events into unforgettable digital experiences through 
              cutting-edge technology and creative innovation.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {footerLinks.social.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 border border-border/50 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  data-cursor-hover
                >
                  <span className="text-xs font-bold">{social.label.charAt(0)}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div className="space-y-6">
            <h4 className="font-display font-semibold text-foreground">Pages</h4>
            <nav className="flex flex-col gap-3">
              {footerLinks.pages.map((link, index) => (
                <motion.button
                  key={link.label}
                  onClick={() => navigate(link.href)}
                  className="font-body text-muted-foreground hover:text-foreground transition-colors duration-300 text-left flex items-center gap-1 group"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  data-cursor-hover
                >
                  {link.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="font-display font-semibold text-foreground">Services</h4>
            <nav className="flex flex-col gap-3">
              {footerLinks.services.map((service, index) => (
                <motion.button
                  key={service}
                  onClick={() => navigate('/services')}
                  className="font-body text-muted-foreground hover:text-foreground transition-colors duration-300 text-left"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  data-cursor-hover
                >
                  {service}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Newsletter / CTA */}
          <div className="space-y-6">
            <h4 className="font-display font-semibold text-foreground">Stay Updated</h4>
            <p className="font-body text-sm text-muted-foreground">
              Get the latest updates on our experiential tech innovations.
            </p>
            
            <motion.button
              onClick={() => navigate('/contact')}
              className="w-full px-6 py-3 rounded-xl glass border border-primary/30 hover:border-primary font-medium text-foreground transition-all duration-300 flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cursor-hover
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p 
            className="font-body text-sm text-muted-foreground flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            © {currentYear} Fullscreen Experiences. Made with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-3 h-3 text-primary fill-primary" />
            </motion.span>
            for amazing events.
          </motion.p>
          
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((link, index) => (
              <motion.a
                key={link}
                href="#"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -2 }}
                data-cursor-hover
              >
                {link}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
