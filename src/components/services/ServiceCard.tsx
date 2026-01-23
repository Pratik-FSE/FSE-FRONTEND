import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  features: string[];
  index: number;
  onClick: () => void;
}

const ServiceCard = ({
  title,
  description,
  icon: Icon,
  gradient,
  features,
  index,
  onClick,
}: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [15, -15]),
    { stiffness: 300, damping: 30 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-15, 15]),
    { stiffness: 300, damping: 30 }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative group cursor-pointer perspective-1000"
      data-cursor-hover
    >
      <div
        className="
          relative h-full p-8 md:p-10 rounded-2xl overflow-hidden transition-all duration-500
          bg-white dark:glass
          border border-border
          hover:border-blue-500 dark:hover:border-primary/30
        "
      >
        {/* Animated background gradient (DARK ONLY STRONG) */}
        <motion.div
          className={`
            absolute inset-0 bg-gradient-to-br ${gradient}
            opacity-0
            dark:group-hover:opacity-10
            group-hover:opacity-[0.06]
            transition-opacity duration-500
          `}
        />

        {/* Floating particles on hover */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-blue-600 dark:bg-primary"
                initial={{
                  x: Math.random() * 100 + '%',
                  y: '100%',
                  opacity: 0,
                }}
                animate={{
                  y: '-20%',
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        )}

        {/* Icon */}
        <motion.div
          className={`
            w-16 h-16 rounded-xl p-4 mb-6
            bg-blue-600 dark:bg-gradient-to-br ${gradient}
          `}
          style={{ transform: 'translateZ(40px)' }}
          animate={{ rotate: isHovered ? 5 : 0 }}
        >
          <Icon className="w-full h-full text-white" />
        </motion.div>

        {/* Title */}
        <motion.h3
          className="
            font-display text-2xl md:text-3xl font-bold mb-4
            text-black dark:text-foreground
          "
          style={{ transform: 'translateZ(30px)' }}
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="
            font-body mb-6 leading-relaxed
            text-gray-600 dark:text-muted-foreground
          "
          style={{ transform: 'translateZ(20px)' }}
        >
          {description}
        </motion.p>

        {/* Features */}
        <motion.div
          className="space-y-2 mb-6"
          style={{ transform: 'translateZ(15px)' }}
        >
          {features.slice(0, 3).map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`
                  w-1.5 h-1.5 rounded-full
                  bg-orange-500 dark:bg-gradient-to-r ${gradient}
                `}
              />
              <span className="text-sm font-body text-gray-600 dark:text-muted-foreground">
                {feature}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="
            flex items-center gap-2 font-medium
            text-blue-600 dark:text-primary
            group-hover:text-orange-500 dark:group-hover:text-primary
            transition-colors
          "
          style={{ transform: 'translateZ(25px)' }}
        >
          <span>Explore</span>
          <motion.div
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={18} />
          </motion.div>
        </motion.div>

        {/* Corner glow (DARK STRONG, LIGHT SOFT) */}
        <motion.div
          className={`
            absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl
            bg-orange-400/30 dark:bg-gradient-to-br ${gradient}
          `}
          animate={{ opacity: isHovered ? 0.25 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default ServiceCard;
