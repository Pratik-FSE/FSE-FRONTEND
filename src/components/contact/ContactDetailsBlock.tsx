import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'pratikbindworks@gmail.com',
    link: 'mailto:pratikbindworks@gmail.com',
    accent: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 91670 94424',
    link: 'tel:+919167094424',
    accent: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Mumbai, India',
    link: null,
    accent: 'text-pink-500',
    bg: 'bg-pink-500/10',
  },
];

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-muted-foreground border border-border/50 rounded-full px-4 py-1.5 mb-6">
            Get in Touch
          </span>

          <h2 className="text-5xl md:text-6xl font-display font-normal leading-tight mb-4">
            Connect with
          </h2>

          <h2 className="text-5xl md:text-6xl font-display font-normal italic leading-tight text-gradient mb-6">
            Pratik Bind
          </h2>

          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Reach out to explore possibilities, discuss your vision, or collaborate on your
            next experiential technology project.
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass border border-border/60 rounded-3xl p-8 md:p-10 mb-8 shadow-[0_40px_120px_-40px_hsl(var(--primary)_/_0.12)] relative overflow-hidden"
        >
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          {/* Avatar + Name */}
          <div className="flex items-center gap-8 mb-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
              <span className="text-lg font-semibold text-primary">PB</span>
            </div>

            <div>
              <h3 className="text-xl font-display font-semibold">Pratik Bind</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Experiential Tech Visionary
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Specializing in immersive brand experiences and cutting-edge event technology.
            Let&apos;s transform your vision into an unforgettable reality.
          </p>

          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
              Quick response typically within 24 hours
            </span>
          </div>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {contactInfo.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 + i * 0.1 }}
              className="glass border border-border/60 rounded-2xl p-6 hover:scale-[1.03] transition-transform duration-300"
            >
              <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center mb-4`}>
                <item.icon className={`w-4 h-4 ${item.accent}`} />
              </div>

              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                {item.label}
              </p>

              {item.link ? (
                <a
                  href={item.link}
                  className="text-sm font-medium break-all hover:text-primary transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-sm font-medium">{item.value}</p>
              )}

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default ContactSection;