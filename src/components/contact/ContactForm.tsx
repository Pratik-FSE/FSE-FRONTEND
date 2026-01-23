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
    const formData = new FormData(e.target as HTMLFormElement);
    console.log('Form submitted:', Object.fromEntries(formData));
    setIsSubmitted(true);
  };

  const inputClasses =
    'w-full bg-transparent border-b-2 border-border/50 py-4 text-lg focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground/50';

  return (
    <section ref={ref} className="py-32 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* ================= FORM BOX ================= */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="
              relative
              rounded-3xl
              glass
              p-10 md:p-12
              border
              border-border/60
              shadow-[0_40px_120px_-40px_hsl(var(--primary)_/_0.15)]
            "
          >
            {/* subtle top glow */}
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
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
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name & Email */}
                <div className="grid md:grid-cols-2 gap-8">
                  {['name', 'email'].map((field, i) => (
                    <motion.div
                      key={field}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="relative"
                    >
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        placeholder={field === 'email' ? 'Email Address' : 'Your Name'}
                        required
                        className={inputClasses}
                        onFocus={() => setFocusedField(field)}
                        onBlur={() => setFocusedField(null)}
                      />
                      <motion.div
                        animate={{ scaleX: focusedField === field ? 1 : 0 }}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary origin-left"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Phone & City */}
                <div className="grid md:grid-cols-2 gap-8">
                  {['phone', 'city'].map((field, i) => (
                    <motion.div
                      key={field}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="relative"
                    >
                      <input
                        type="text"
                        name={field}
                        placeholder={field === 'phone' ? 'Phone Number' : 'City'}
                        className={inputClasses}
                        onFocus={() => setFocusedField(field)}
                        onBlur={() => setFocusedField(null)}
                      />
                      <motion.div
                        animate={{ scaleX: focusedField === field ? 1 : 0 }}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary origin-left"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Event Type */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-4">
                    Event Type
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {eventTypes.map((type) => (
                      <label key={type}>
                        <input type="radio" name="eventType" value={type} className="peer hidden" />
                        <span className="px-5 py-3 rounded-full border border-border/50 text-sm peer-checked:bg-primary peer-checked:text-primary-foreground transition">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-4">
                    Approximate Budget
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {budgetRanges.map((budget) => (
                      <label key={budget}>
                        <input type="radio" name="budget" value={budget} className="peer hidden" />
                        <span className="px-5 py-3 rounded-full border border-border/50 text-sm peer-checked:bg-secondary peer-checked:text-secondary-foreground transition">
                          {budget}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about your vision..."
                  className={`${inputClasses} resize-none`}
                />

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-5 rounded-full bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground font-semibold text-lg"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* ================= CONTACT INFO ================= */}
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
                Have a project in mind? We&apos;d love to hear from you.
              </p>
            </div>

            {[
              { icon: Mail, label: 'Email', value: 'hello@fullscreenexperiences.com' },
              { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
              { icon: MapPin, label: 'Location', value: 'Mumbai, India' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-6">
                <item.icon className="w-6 h-6 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                  <div className="text-lg font-medium">{item.value}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
