import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

/** Portfolio filter id -> Experiences page path (with optional hash) */
const categoryLinks: { id: string; label: string; to: string }[] = [
  { id: 'all', label: 'All', to: '/services' },
  { id: 'ar-vr', label: 'AR/VR', to: '/services#ar-visual-experiences' },
  { id: 'gaming', label: 'Gaming', to: '/services#gaming-interactive' },
  { id: 'photo-booth', label: 'Photo Booths', to: '/services#ar-visual-experiences' },
  { id: 'displays', label: 'Displays', to: '/services#visual-displays' },
  { id: 'installations', label: 'Installations', to: '/services#visual-displays' },
];

interface CategoryFilterProps {
  onFilterChange?: (category: string) => void;
}

const CategoryFilter = ({ onFilterChange }: CategoryFilterProps) => {
  const { theme } = useTheme();
  const location = useLocation();
  const currentPath = location.pathname + location.hash;
  const isOnServicesPage = location.pathname === '/services';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-4 py-8"
    >
      {categoryLinks.map((category) => {
        const isActive = isOnServicesPage
          ? currentPath === category.to || (category.to === '/services' && !location.hash)
          : category.id === 'all';
        return (
          <Link
            key={category.id}
            to={category.to}
            onClick={() => onFilterChange?.(category.id)}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative inline-block px-6 py-3 rounded-full font-medium
                transition-colors overflow-hidden
                ${
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {/* Active background */}
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className={`
                    absolute inset-0 rounded-full
                    ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-primary via-accent to-secondary'
                        : 'bg-gradient-to-r from-primary to-secondary'
                    }
                  `}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              {/* Hover background (inactive only) */}
              {!isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="
                    absolute inset-0 rounded-full
                    bg-muted
                  "
                />
              )}

              <span className="relative z-10">
                {category.label}
              </span>
            </motion.span>
          </Link>
        );
      })}
    </motion.div>
  );
};

export default CategoryFilter;
