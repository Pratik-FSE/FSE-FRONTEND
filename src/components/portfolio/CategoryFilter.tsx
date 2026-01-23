import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'ar-vr', label: 'AR/VR' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'photo-booth', label: 'Photo Booths' },
  { id: 'displays', label: 'Displays' },
  { id: 'installations', label: 'Installations' },
];

interface CategoryFilterProps {
  onFilterChange?: (category: string) => void;
}

const CategoryFilter = ({ onFilterChange }: CategoryFilterProps) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { theme } = useTheme();

  const handleClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onFilterChange?.(categoryId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-4 py-8"
    >
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => handleClick(category.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            relative px-6 py-3 rounded-full font-medium
            transition-colors overflow-hidden
            ${
              activeCategory === category.id
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }
          `}
        >
          {/* Active background */}
          {activeCategory === category.id && (
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
          {activeCategory !== category.id && (
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
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CategoryFilter;
