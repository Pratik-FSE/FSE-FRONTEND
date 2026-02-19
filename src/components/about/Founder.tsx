import { motion } from 'framer-motion';
import { Linkedin, Twitter, Award, Globe, Users, Mail, MapPin, Calendar } from 'lucide-react';

// Single founder data - you can edit this
const founder = {
  name: 'Alexandra Chen', // You can change this
  role: 'Founder & Creative Director',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1000&fit=crop',
  bio: 'Visionary leader with 15+ years in experiential design, blending fashion aesthetics with cutting-edge technology to create unforgettable brand moments.',
  quote: "We're not just creating events; we're engineering emotions that resonate long after the lights go down.",
  achievements: [
    { icon: Award, label: '20+ Industry Awards' },
    { icon: Globe, label: '15 Countries' },
    { icon: Users, label: '500+ Events' },
  ],
  expertise: [
    'Experiential Marketing',
    'AR/VR Integration',
    'Creative Direction',
    'Brand Strategy'
  ]
};

const Founder = () => {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">The Visionary</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">
            Meet The <span className="text-gradient">Founder</span>
          </h2>
        </motion.div>

        {/* Founder section - Two column layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Image container with effects */}
              <motion.div
                className="relative aspect-[3/4] rounded-2xl overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                
                {/* Neon border on hover */}
                <motion.div
                  className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-2xl transition-all duration-500"
                  style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0)' }}
                  whileHover={{ boxShadow: '0 0 30px hsl(var(--primary) / 0.3)' }}
                />
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -bottom-6 -right-6 glass p-4 rounded-xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Since</div>
                    <div className="font-display font-bold text-xl">2018</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Name and role */}
              <div>
                <h3 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {founder.name}
                </h3>
                <p className="text-primary font-body text-lg">{founder.role}</p>
              </div>

              {/* Quote */}
              <div className="relative">
                <div className="absolute -top-4 -left-2 text-6xl text-primary/20">"</div>
                <p className="font-body text-xl text-muted-foreground italic pl-6">
                  {founder.quote}
                </p>
              </div>

              {/* Bio */}
              <p className="text-muted-foreground font-body leading-relaxed">
                {founder.bio}
              </p>

              {/* Achievements grid */}
              <div className="grid grid-cols-3 gap-4 py-4">
                {founder.achievements.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-sm font-medium text-foreground">{item.label}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Expertise tags */}
              <div>
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {founder.expertise.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="px-4 py-2 glass rounded-full text-sm text-muted-foreground border border-primary/10"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-4 pt-4">
                <motion.a
                  href="#"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Linkedin size={18} />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Twitter size={18} />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Mail size={18} />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;