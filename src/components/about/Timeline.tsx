import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';

const timelineEvents = [
  {
    year: '2018',
    title: 'The Beginning',
    description: 'Founded with a vision to revolutionize event experiences through technology.',
    color: '#8b5cf6',
  },
  {
    year: '2019',
    title: 'First Fashion Week',
    description: 'Debuted our AR installations at major fashion events across the globe.',
    color: '#06b6d4',
  },
  {
    year: '2020',
    title: 'AI Integration',
    description: 'Pioneered AI-powered photo experiences during the digital transformation era.',
    color: '#ec4899',
  },
  {
    year: '2021',
    title: 'Global Expansion',
    description: 'Expanded operations to 10+ countries, partnering with luxury brands.',
    color: '#8b5cf6',
  },
  {
    year: '2022',
    title: 'Anamorphic Innovation',
    description: 'Launched groundbreaking anamorphic display experiences for flagship stores.',
    color: '#06b6d4',
  },
  {
    year: '2023',
    title: 'Metaverse Ready',
    description: 'Integrated VR/AR hybrid experiences for next-gen fashion activations.',
    color: '#ec4899',
  },
  {
    year: '2024',
    title: 'Industry Leader',
    description: 'Recognized as the premier experiential tech company for fashion events.',
    color: '#8b5cf6',
  },
];

const TimelineNode = ({ color, index }: { color: string; index: number }) => {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }} className="!w-20 !h-20">
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color={color} />
      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <Sphere args={[0.5, 32, 32]}>
          <MeshDistortMaterial
            color={color}
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>
    </Canvas>
  );
};

const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">Our Journey</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">
            <span className="text-gradient">Evolution</span> of Excellence
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Animated line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border">
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary via-secondary to-accent"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline events */}
          <div className="space-y-24">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass p-6 rounded-xl group cursor-pointer"
                  >
                    <span
                      className="font-display text-4xl font-bold block mb-2"
                      style={{ color: event.color }}
                    >
                      {event.year}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-gradient transition-all">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </motion.div>
                </div>

                {/* Node */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <TimelineNode color={event.color} index={index} />
                </div>

                {/* Empty space */}
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
