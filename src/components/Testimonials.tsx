import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "The anamorphic display at Fashion Week created a viral moment. Every influencer wanted to capture it for their feed.",
    author: "",
    role: "Event Director",
    company: "Cigma Events",
    rating: 5,
  },
  {
    quote: "Their immersive technology transformed our corporate event into something truly memorable. The production quality was exceptional.",
    author: "",
    role: "Brand Manager",
    company: "Microsoft",
    rating: 5,
  },
  {
    quote: "The interactive experience generated massive engagement and social media reach. Results exceeded all expectations.",
    author: "",
    role: "Creative Lead",
    company: "PepsiCo",
    rating: 5,
  },
  {
    quote: "Working with this team felt like having true creative partners who understand our brand vision and deliver excellence.",
    author: "",
    role: "Marketing Director",
    company: "Google",
    rating: 5,
  },
  {
    quote: "The experiential tech solutions they designed became the highlight of our launch event. Tremendous impact and engagement.",
    author: "",
    role: "Brand Experience Manager",
    company: "Pentagon Events",
    rating: 5,
  },
];

const brands = [
  "Government of Telangana", "Microsoft", "Google", "TATA", 
  "Schneider", "P&G", "PepsiCo", "Pidilite",
  "TotalEnergies", "Yes Bank", "ICICI Lombard", "Kotak Bank"
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const marqueeX = useTransform(scrollYProgress, [0, 1], [0, -500]);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Brands marquee with parallax */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <p className="text-center text-sm text-muted-foreground mb-8 font-medium uppercase tracking-widest">
            Trusted by World-Class Brands
          </p>
          
          <div className="relative overflow-hidden py-4">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
            
            {/* First row - scrolling left */}
            <motion.div
              className="flex gap-16 items-center mb-8"
              style={{ x: marqueeX }}
            >
              {[...brands, ...brands, ...brands].map((brand, index) => (
                <motion.span
                  key={`${brand}-${index}`}
                  className="font-display text-2xl md:text-3xl font-bold text-muted-foreground/20 whitespace-nowrap hover:text-foreground transition-colors duration-300"
                  whileHover={{ scale: 1.1, color: 'hsl(var(--foreground))' }}
                >
                  {brand}
                </motion.span>
              ))}
            </motion.div>

            {/* Second row - scrolling right */}
            <motion.div
              className="flex gap-16 items-center"
              style={{ x: useTransform(scrollYProgress, [0, 1], [0, 300]) }}
            >
              {[...brands.slice().reverse(), ...brands.slice().reverse(), ...brands.slice().reverse()].map((brand, index) => (
                <motion.span
                  key={`${brand}-rev-${index}`}
                  className="font-display text-2xl md:text-3xl font-bold text-muted-foreground/20 whitespace-nowrap hover:text-foreground transition-colors duration-300"
                  whileHover={{ scale: 1.1, color: 'hsl(var(--foreground))' }}
                >
                  {brand}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-secondary mb-6"
          >
            Testimonials
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold"
          >
            <span className="text-foreground">What Clients</span>
            <br />
            <span className="text-gradient">Say About Us</span>
          </motion.h2>
        </div>

        {/* Testimonials slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Main testimonial card */}
          <div className="relative h-[400px] md:h-[320px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 25 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                }}
                className="absolute inset-0"
              >
                <div className="relative p-8 md:p-12 rounded-3xl glass border border-border/50 h-full flex flex-col justify-center">
                  {/* Quote icon */}
                  <motion.div 
                    className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-neon flex items-center justify-center"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Quote className="w-6 h-6 text-foreground" />
                  </motion.div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-5 h-5 fill-primary text-primary" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="font-body text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                    "{testimonials[currentIndex].quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    {testimonials[currentIndex].author && (
                      <motion.div 
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="font-display font-bold text-xl text-foreground">
                          {testimonials[currentIndex].author.charAt(0)}
                        </span>
                      </motion.div>
                    )}
                    
                    <div>
                      {testimonials[currentIndex].author && (
                        <div className="font-display font-semibold text-foreground text-lg">
                          {testimonials[currentIndex].author}
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={handlePrev}
              className="p-3 rounded-full glass border border-border hover:border-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              data-cursor-hover
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  data-cursor-hover
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              className="p-3 rounded-full glass border border-border hover:border-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              data-cursor-hover
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
