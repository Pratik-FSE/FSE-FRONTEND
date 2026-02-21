import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

/** Portfolio filter id -> in-page path */
const categoryLinks: { id: string; label: string; to: string }[] = [
  { id: 'all', label: 'All', to: '/portfolio' },
  { id: 'ar-vr', label: 'AR/VR', to: '/portfolio' },
  { id: 'gaming', label: 'Gaming', to: '/portfolio' },
  { id: 'photo-booth', label: 'Photo Booths', to: '/portfolio' },
  { id: 'displays', label: 'Displays', to: '/portfolio' },
  { id: 'installations', label: 'Installations', to: '/portfolio' },
];

interface CategoryFilterProps {
  onFilterChange?: (category: string) => void;
}

const CategoryFilter = ({ onFilterChange }: CategoryFilterProps) => {
  // Category filter removed — portfolio page no longer shows category buttons
  return null;
};

export default CategoryFilter;
