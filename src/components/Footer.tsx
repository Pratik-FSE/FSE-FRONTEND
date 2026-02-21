import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Heart, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import logoLight from '@/assets/logo-light.png';
import logoDark from '@/assets/logo-dark.jpg';
import { useTheme } from '@/contexts/ThemeContext';

const footerLinks = {
  pages: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/portfolio' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Clients', href: '/clients' },
    { label: 'Contact', href: '/contact' },
  ],
  social: [
    { label: 'Instagram', href: '#', icon: Instagram },
    { label: 'Twitter', href: '#', icon: Twitter },
    { label: 'LinkedIn', href: '#', icon: Linkedin },
    { label: 'YouTube', href: '#', icon: Youtube },
  ],
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const currentLogo = theme === 'dark' ? logoDark : logoLight;

  return (
    <footer className="relative py-16 border-t border-border/50 overflow-hidden bg-background">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/10 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-5">
            <Link to="/">
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={theme}
                    src={currentLogo}
                    alt="Fullscreen Experiences"
                    className="h-10 w-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              </motion.div>
            </Link>
            
            <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
              Transforming events into unforgettable digital experiences through cutting-edge technology and creative innovation.
            </p>
          </div>

          {/* Pages */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Pages</h4>
            <nav className="flex flex-col gap-2.5">
              {footerLinks.pages.map((link) => (
                <motion.button
                  key={link.label}
                  onClick={() => navigate(link.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 text-left w-fit group flex items-center gap-1"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Connect</h4>
            <nav className="flex flex-col gap-2.5">
              {footerLinks.social.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2.5 w-fit group"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{social.label}</span>
                  </motion.a>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1.5 flex-wrap justify-center">
            <span>© {currentYear} Fullscreen Experiences.</span>
            <span className="flex items-center gap-1">
              Made with 
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
              </motion.span>
              for amazing events.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;