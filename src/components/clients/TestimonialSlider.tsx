import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "The anamorphic display at Fashion Week created a viral moment. Every influencer wanted to capture it for their feed.",
    author: "",
    role: "Creative Director",
    company: "Cigma Events",
    gradient: 'from-primary to-accent',
  },
  {
    id: 2,
    quote: "Their immersive experience transformed our corporate event into an unforgettable spectacle. The production quality was exceptional.",
    author: "",
    role: "Project Lead",
    company: "Microsoft",
    gradient: 'from-secondary to-primary',
  },
  {
    id: 3,
    quote: "The integrated tech solutions generated massive engagement. Our audience response exceeded all expectations.",
    author: "",
    role: "Event Manager",
    company: "Pentagon Events",
    gradient: 'from-accent to-secondary',
  },
  {
    id: 4,
    quote: "Exceptional execution with attention to every detail. Delivered results that amplified our brand presence significantly.",
    author: "",
    role: "Brand Marketing",
    company: "PepsiCo",
    gradient: 'from-neon-cyan to-primary',
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -200 : 200,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section className="py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            What They <span className="text-gradient">Say</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Hear from the brands we've partnered with
          </p>
        </motion.div>

        {/* Testimonial */}
        <div className="relative h-[400px] md:h-[300px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 150, damping: 25, mass: 0.8 }}
              className="absolute inset-0"
            >
              <div className="glass rounded-3xl p-8 md:p-12 h-full flex flex-col justify-center">
                {/* Quote icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonials[currentIndex].gradient} flex items-center justify-center mb-8`}
                >
                  <Quote className="w-8 h-8 text-white" />
                </motion.div>

                {/* Quote text */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl font-light leading-relaxed mb-8 italic"
                >
                  "{testimonials[currentIndex].quote}"
                </motion.p>

                {/* Author */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[currentIndex].gradient}`} />
                  <div>
                    {testimonials[currentIndex].author && (
                      <div className="font-display font-semibold">
                        {testimonials[currentIndex].author}
                      </div>
                    )}
                    <div className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="w-12 h-12 rounded-full glass flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Progress dots */}
          <div className="flex gap-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className="relative h-2 rounded-full overflow-hidden"
                animate={{ width: currentIndex === index ? 32 : 8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-muted" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: currentIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="w-12 h-12 rounded-full glass flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
