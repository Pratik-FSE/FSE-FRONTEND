import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

const eventTypes = [
  'Corporate Event',
  'Fashion Show',
  'Music Festival',
  'Product Launch',
  'Wedding',
  'Award Show',
  'Other',
];

const budgetRanges = [
  'Under ₹5L',
  '₹5L - ₹15L',
  '₹15L - ₹50L',
  '₹50L - ₹1Cr',
  'Above ₹1Cr',
];

const ContactForm = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Log form data
    const formData = new FormData(e.target as HTMLFormElement);
    console.log('Form submitted:', Object.fromEntries(formData));
    setIsSubmitted(true);
  };

  const inputClasses = "w-full bg-transparent border-b-2 border-border/50 py-4 text-lg focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground/50";

  return (
    <section ref={ref} className="py-32 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-8"
                >
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-3xl font-display font-bold mb-4">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground text-lg max-w-md">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className={inputClasses}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <motion.div
                      animate={{ scaleX: focusedField === 'name' ? 1 : 0 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary origin-left"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      required
                      className={inputClasses}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <motion.div
                      animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary origin-left"
                    />
                  </motion.div>
                </div>

                {/* Phone & City Row */}
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="relative"
                  >
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      className={inputClasses}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <motion.div
                      animate={{ scaleX: focusedField === 'phone' ? 1 : 0 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary origin-left"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      className={inputClasses}
                      onFocus={() => setFocusedField('city')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <motion.div
                      animate={{ scaleX: focusedField === 'city' ? 1 : 0 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary origin-left"
                    />
                  </motion.div>
                </div>

                {/* Event Type */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm text-muted-foreground mb-4">Event Type</label>
                  <div className="flex flex-wrap gap-3">
                    {eventTypes.map((type) => (
                      <label key={type} className="cursor-pointer">
                        <input type="radio" name="eventType" value={type} className="peer hidden" />
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="block px-5 py-3 rounded-full border border-border/50 text-sm peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary transition-all"
                        >
                          {type}
                        </motion.span>
                      </label>
                    ))}
                  </div>
                </motion.div>

                {/* Budget */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm text-muted-foreground mb-4">Approximate Budget</label>
                  <div className="flex flex-wrap gap-3">
                    {budgetRanges.map((budget) => (
                      <label key={budget} className="cursor-pointer">
                        <input type="radio" name="budget" value={budget} className="peer hidden" />
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="block px-5 py-3 rounded-full border border-border/50 text-sm peer-checked:bg-secondary peer-checked:text-secondary-foreground peer-checked:border-secondary transition-all"
                        >
                          {budget}
                        </motion.span>
                      </label>
                    ))}
                  </div>
                </motion.div>

                {/* Date */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 }}
                  className="relative"
                >
                  <input
                    type="date"
                    name="eventDate"
                    className={`${inputClasses} cursor-pointer`}
                    onFocus={() => setFocusedField('date')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <motion.div
                    animate={{ scaleX: focusedField === 'date' ? 1 : 0 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary origin-left"
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                  className="relative"
                >
                  <textarea
                    name="message"
                    placeholder="Tell us about your vision..."
                    rows={4}
                    className={`${inputClasses} resize-none`}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <motion.div
                    animate={{ scaleX: focusedField === 'message' ? 1 : 0 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary origin-left"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full py-5 rounded-full bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground font-semibold text-lg overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <span className="relative flex items-center justify-center gap-3">
                    <span>Send Message</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-3xl font-display font-bold mb-6">
                Get in <span className="text-gradient">Touch</span>
              </h3>
              <p className="text-muted-foreground text-lg">
                Have a project in mind? We'd love to hear from you. 
                Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'hello@fullscreenexperiences.com', gradient: 'from-primary to-accent' },
                { icon: Phone, label: 'Phone', value: '+91 98765 43210', gradient: 'from-secondary to-primary' },
                { icon: MapPin, label: 'Location', value: 'Mumbai, India', gradient: 'from-accent to-secondary' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="text-lg font-medium group-hover:text-primary transition-colors">
                      {item.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Office hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="glass rounded-2xl p-8"
            >
              <h4 className="font-display font-semibold text-lg mb-4">Office Hours</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>11:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
