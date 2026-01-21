import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-8 h-8 rounded-full border border-border/50 hover:border-primary/50 transition-all duration-300 bg-muted/50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      data-cursor-hover
      title={isLight ? 'Switch to Original Mode' : 'Switch to New Generation Mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isLight ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {isLight ? (
          <Moon className="w-4 h-4 text-foreground" />
        ) : (
          <Sun className="w-4 h-4 text-foreground" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
