import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: '',
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log('Form submitted:', formData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Thank you! We\'ll be in touch within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  const inputClasses = "w-full px-4 py-4 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground font-body";
  const labelClasses = "block text-sm font-medium text-foreground mb-2 font-body";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background with parallax */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background to-muted/20"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
      />
      
      {/* Decorative elements with parallax */}
      <motion.div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [100, -50]),
          x: useTransform(scrollYProgress, [0, 1], [-50, 0]),
        }}
      />
      <motion.div 
        className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [-50, 50]),
          x: useTransform(scrollYProgress, [0, 1], [50, 0]),
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-accent mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Let's Create Together
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-foreground">Brief Us On</span>
            <br />
            <span className="text-gradient">Your Vision</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg text-muted-foreground"
          >
            Ready to transform your next event? Share your vision and we'll 
            craft the perfect experiential tech solution.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold text-foreground">
                Get in Touch
              </h3>
              <p className="font-body text-muted-foreground">
                Have questions? We'd love to hear from you. Our team typically 
                responds within 24 hours.
              </p>
            </div>

            {/* Contact details with hover animations */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'hello@fullscreenexperiences.com', href: 'mailto:hello@fullscreenexperiences.com', color: 'primary' },
                { icon: Phone, label: 'Phone', value: '+1 (415) 555-1234', href: 'tel:+14155551234', color: 'secondary' },
                { icon: MapPin, label: 'Location', value: 'San Francisco, CA', href: null, color: 'accent' },
              ].map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href || undefined}
                  className="flex items-center gap-4 p-4 rounded-xl glass border border-border/50 hover:border-primary/50 transition-all duration-300 group cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  data-cursor-hover
                >
                  <motion.div 
                    className={`p-3 rounded-xl bg-${contact.color}/10 text-${contact.color}`}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <contact.icon className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <div className="text-sm text-muted-foreground">{contact.label}</div>
                    <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {contact.value}
                    </div>
                  </div>
                  {contact.href && (
                    <motion.div
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -10 }}
                      animate={{ x: 0 }}
                    >
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </motion.div>
                  )}
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3 pt-4">
              {['Instagram', 'Twitter', 'LinkedIn'].map((social, index) => (
                <motion.a
                  key={social}
                  href="#"
                  className="px-4 py-2 rounded-full glass text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 border border-border/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  data-cursor-hover
                >
                  {social}
                </motion.a>
              ))}
            </div>

            {/* CTA to full contact page */}
            <motion.button
              onClick={() => navigate('/contact')}
              className="w-full mt-8 px-6 py-4 rounded-xl glass border border-primary/30 hover:border-primary transition-all duration-300 flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              data-cursor-hover
            >
              <span className="font-medium text-foreground">Full Contact Form</span>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Quick contact form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl glass border border-border/50 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <motion.div
                  animate={{ scale: focusedField === 'name' ? 1.02 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="name" className={labelClasses}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={inputClasses}
                    placeholder="John Doe"
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  animate={{ scale: focusedField === 'email' ? 1.02 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="email" className={labelClasses}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={inputClasses}
                    placeholder="john@company.com"
                  />
                </motion.div>

                {/* Phone */}
                <motion.div
                  animate={{ scale: focusedField === 'phone' ? 1.02 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="phone" className={labelClasses}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className={inputClasses}
                    placeholder="+1 (555) 000-0000"
                  />
                </motion.div>

                {/* Event Type */}
                <motion.div
                  animate={{ scale: focusedField === 'eventType' ? 1.02 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="eventType" className={labelClasses}>
                    Event Type *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('eventType')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={inputClasses}
                  >
                    <option value="">Select event type</option>
                    <option value="fashion">Fashion Show</option>
                    <option value="brand-launch">Brand Launch</option>
                    <option value="festival">Festival</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="private">Private Party</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>

                {/* Message */}
                <motion.div 
                  className="md:col-span-2"
                  animate={{ scale: focusedField === 'message' ? 1.01 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="message" className={labelClasses}>
                    Tell Us About Your Vision
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={4}
                    className={inputClasses}
                    placeholder="Describe your event, goals, and any specific experiences you're looking for..."
                  />
                </motion.div>
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                data-cursor-hover
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-neon"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                
                <span className="relative font-display font-semibold text-foreground flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Inquiry
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
