import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';

const team = [
  {
    name: 'Alexandra Chen',
    role: 'Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
    bio: 'Visionary leader with 15+ years in experiential design',
  },
  {
    name: 'Marcus Rivera',
    role: 'Head of Technology',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    bio: 'AR/VR pioneer and immersive experience architect',
  },
  {
    name: 'Sofia Nakamura',
    role: 'Experience Design Lead',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
    bio: 'Former fashion creative turned tech innovator',
  },
];

const Team = () => {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">The Visionaries</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">
            Meet The <span className="text-gradient">Team</span>
          </h2>
        </motion.div>

        {/* Team grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              {/* Image container with parallax hover */}
              <motion.div
                className="relative aspect-[4/5] mb-6 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                {/* Image */}
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

                {/* Neon border on hover */}
                <motion.div
                  className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-2xl transition-all duration-500"
                  style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0)' }}
                  whileHover={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' }}
                />

                {/* Social links overlay */}
                <motion.div
                  className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  <button className="p-2 glass rounded-full hover:bg-primary/20 transition-colors" data-cursor-hover>
                    <Linkedin size={18} />
                  </button>
                  <button className="p-2 glass rounded-full hover:bg-primary/20 transition-colors" data-cursor-hover>
                    <Twitter size={18} />
                  </button>
                </motion.div>
              </motion.div>

              {/* Text content */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <h3 className="font-display text-xl font-bold text-foreground mb-1 group-hover:text-gradient transition-all duration-300">
                  {member.name}
                </h3>
                <p className="text-primary font-body text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground font-body text-sm">{member.bio}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
