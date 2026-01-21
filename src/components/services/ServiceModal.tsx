import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    icon: LucideIcon;
    gradient: string;
    features: string[];
    details: string;
    useCases: string[];
  } | null;
}

const ServiceModal = ({ isOpen, onClose, service }: ServiceModalProps) => {
  if (!service) return null;

  const Icon = service.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/90 backdrop-blur-xl z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 overflow-hidden"
          >
            <div className="glass rounded-3xl h-full overflow-y-auto border border-primary/20">
              {/* Header */}
              <div className="sticky top-0 z-10 glass-strong px-6 md:px-10 py-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} p-3`}>
                    <Icon className="w-full h-full text-foreground" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient">
                    {service.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 rounded-full glass hover:bg-primary/20 transition-colors"
                  data-cursor-hover
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-10 space-y-12">
                {/* Hero section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="grid md:grid-cols-2 gap-10"
                >
                  {/* Left: Description */}
                  <div>
                    <p className="text-xl md:text-2xl text-muted-foreground font-body leading-relaxed mb-8">
                      {service.description}
                    </p>
                    <p className="text-muted-foreground font-body leading-relaxed">
                      {service.details}
                    </p>
                  </div>

                  {/* Right: Visual placeholder */}
                  <div className={`aspect-video rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5`}>
                    <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <Icon className="w-24 h-24 text-primary opacity-50" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-display text-xl font-bold mb-6 text-foreground">
                    Key Features
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {service.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center gap-3 p-4 glass rounded-xl"
                      >
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                          <Check size={14} className="text-foreground" />
                        </div>
                        <span className="text-foreground font-body text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Use Cases */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="font-display text-xl font-bold mb-6 text-foreground">
                    Perfect For
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {service.useCases.map((useCase, index) => (
                      <motion.span
                        key={useCase}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.05 }}
                        className={`px-4 py-2 rounded-full border border-primary/30 text-sm font-body text-muted-foreground hover:text-foreground hover:border-primary transition-colors cursor-default`}
                      >
                        {useCase}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex justify-center pt-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-4 rounded-full bg-gradient-to-r ${service.gradient} text-foreground font-display font-bold text-lg flex items-center gap-3 shadow-lg`}
                    style={{ boxShadow: '0 10px 40px hsl(var(--primary) / 0.3)' }}
                    data-cursor-hover
                  >
                    Book This Experience
                    <ArrowRight size={20} />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
