import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoLight from '@/assets/logo-light.png';
import logoDark from '@/assets/logo-dark.jpg';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

const navItems = [
  { label: 'About', href: '/about', isRoute: true },
  { label: 'Portfolio', href: '/portfolio', isRoute: true },
  { label: 'Clients', href: '/clients', isRoute: true },
  { label: 'Contact', href: '/contact', isRoute: true },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const currentLogo = theme === 'dark' ? logoDark : logoLight;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false);
    navigate(item.href);
  };

  const letterVariants = {
    initial: { y: 0 },
    hover: { y: -20, transition: { duration: 0.2 } },
  };

  const letterVariantsSecond = {
    initial: { y: 20 },
    hover: { y: 0, transition: { duration: 0.2 } },
  };

  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled
            ? 'bg-white/90 dark:bg-background/95 backdrop-blur-md shadow-sm py-3'
            : 'bg-white dark:bg-background py-5'}
        `}
      >
        <nav className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              data-cursor-hover
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={theme}
                  src={currentLogo}
                  alt="Fullscreen Experiences"
                  className="h-10 md:h-12 w-auto"
                  initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              </AnimatePresence>
            </motion.div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-1">
            <ThemeToggle />

            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                onClick={() => handleNavClick(item)}
                onMouseEnter={() => setActiveHover(item.label)}
                onMouseLeave={() => setActiveHover(null)}
                className={`
                  relative px-4 py-2 font-body text-sm font-medium overflow-hidden
                  transition-colors
                  ${
                    location.pathname === item.href
                      ? 'text-blue-600 dark:text-foreground'
                      : 'text-gray-600 hover:text-blue-600 dark:text-muted-foreground dark:hover:text-foreground'
                  }
                `}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                data-cursor-hover
              >
                {/* Letter hover */}
                <span className="relative inline-block overflow-hidden">
                  <motion.span
                    className="inline-block"
                    variants={letterVariants}
                    initial="initial"
                    animate={activeHover === item.label ? 'hover' : 'initial'}
                  >
                    {item.label}
                  </motion.span>
                  <motion.span
                    className="absolute left-0 text-orange-500 dark:text-gradient"
                    variants={letterVariantsSecond}
                    initial="initial"
                    animate={activeHover === item.label ? 'hover' : 'initial'}
                  >
                    {item.label}
                  </motion.span>
                </span>

                {/* Active underline */}
                {location.pathname === item.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="
                      absolute bottom-0 left-2 right-2 h-0.5
                      bg-orange-500 dark:bg-gradient-neon
                    "
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Hover background */}
                <motion.div
                  className="
                    absolute inset-0 rounded-lg
                    bg-blue-500/5 dark:bg-primary/10
                  "
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: activeHover === item.label ? 1 : 0,
                    scale: activeHover === item.label ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
          </div>

          {/* MOBILE TOGGLE */}
          <motion.button
            className="lg:hidden relative p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            data-cursor-hover
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-background/98 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col items-center justify-center min-h-screen gap-6 py-24 px-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className="
                    font-display text-3xl md:text-4xl font-bold
                    text-blue-600 hover:text-orange-500
                    dark:text-gradient
                  "
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.4 }}
                  whileHover={{ scale: 1.1, x: 10 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
