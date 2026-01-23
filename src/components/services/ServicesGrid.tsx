import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Gamepad2,
  Camera,
  Glasses,
  Monitor,
  Video,
  Clapperboard,
  Sparkles,
  Settings,
  Mic,
  Map,
  Trophy,
  LayoutGrid,
} from 'lucide-react';
import ServiceCard from './ServiceCard';
import ServiceModal from './ServiceModal';

const services = [
  {
    id: 'gaming',
    title: 'Gaming Booths',
    description:
      'High-octane gaming experiences featuring PlayStation, Xbox, racing simulators, and esports setups.',
    icon: Gamepad2,
    gradient: 'from-primary to-accent',
    features: [
      'PlayStation & Xbox Stations',
      'Racing Simulators',
      'VR Gaming Pods',
      'Esports Tournament Setup',
      'Retro Gaming Corners',
      'Multiplayer Competitions',
    ],
    details:
      'Our gaming booths bring the excitement of competitive gaming to your events. From casual lounges to full-scale esports tournaments, we handle everything end-to-end.',
    useCases: [
      'Fashion Launches',
      'Brand Activations',
      'Corporate Events',
      'Product Launches',
      'Award Shows',
      'Influencer Events',
    ],
  },
  {
    id: 'ai-photo',
    title: 'AI Photo Booths',
    description:
      'Next-gen AI-powered photo experiences that transform guests into works of art.',
    icon: Camera,
    gradient: 'from-secondary to-primary',
    features: [
      'AI Style Transfer',
      'Real-time Face Morphing',
      'Branded AR Filters',
      'Instant Social Sharing',
      'Print-on-Demand',
      'Data Analytics',
    ],
    details:
      'Our AI photo booths use advanced machine learning to generate stunning, personalized visuals in real time.',
    useCases: [
      'Fashion Shows',
      'Luxury Brand Events',
      'Weddings',
      'Galas',
      'Music Festivals',
      'Movie Premieres',
    ],
  },
  {
    id: 'ar-vr',
    title: 'AR / VR Experiences',
    description:
      'Immersive augmented and virtual reality installations that blur the line between digital and physical.',
    icon: Glasses,
    gradient: 'from-accent to-neon-pink',
    features: [
      'Mixed Reality Installations',
      'Virtual Try-On',
      'Interactive Product Demos',
      'Immersive Brand Worlds',
      'AR Wayfinding',
      'Virtual Tours',
    ],
    details:
      'From virtual fashion showrooms to immersive product demos, our AR/VR solutions redefine audience engagement.',
    useCases: [
      'Retail Activations',
      'Trade Shows',
      'Product Launches',
      'Fashion Weeks',
      'Museums',
      'Real Estate',
    ],
  },
  {
    id: 'anamorphic',
    title: 'Anamorphic Displays',
    description:
      'Mind-bending naked-eye 3D illusions on LED walls that stop people in their tracks.',
    icon: Monitor,
    gradient: 'from-neon-cyan to-secondary',
    features: [
      'Naked-Eye 3D',
      'Custom Content Creation',
      'Interactive Triggers',
      'Real-time Rendering',
      'Multi-surface Mapping',
      'Brand Integration',
    ],
    details:
      'Our anamorphic displays create viral, jaw-dropping visuals perfect for high-impact brand moments.',
    useCases: [
      'Flagship Stores',
      'Times Square Activations',
      'Product Reveals',
      'Trade Shows',
      'Art Installations',
    ],
  },
  {
    id: 'chroma',
    title: 'Chroma / Green Screen',
    description:
      'Professional-grade green screen setups for cinematic photo and video content.',
    icon: LayoutGrid,
    gradient: 'from-primary to-secondary',
    features: [
      'Real-time Compositing',
      'Virtual Backgrounds',
      'Instant Playback',
      'Social Media Ready',
      'Custom Environments',
      'Professional Lighting',
    ],
    details:
      'Create impossible environments with studio-quality chroma setups designed for instant content delivery.',
    useCases: [
      'Photo Activations',
      'Video Testimonials',
      'Social Content',
      'Brand Videos',
      'Influencer Campaigns',
    ],
  },
  {
    id: 'brand-videos',
    title: 'Brand Reveal Videos',
    description:
      'Cinematic brand videos designed for maximum emotional impact.',
    icon: Video,
    gradient: 'from-accent to-primary',
    features: [
      'Cinematic Production',
      '4K / 8K Output',
      'Motion Graphics',
      'Sound Design',
      'Live Event Sync',
      'Multi-screen Delivery',
    ],
    details:
      'From subtle teasers to explosive reveals, we craft cinematic brand moments.',
    useCases: [
      'Product Launches',
      'Award Shows',
      'Fashion Shows',
      'Corporate Events',
      'Concert Openers',
    ],
  },
  {
    id: 'logo-animations',
    title: 'Logo Animations',
    description:
      'Dynamic logo animations that bring brand identities to life.',
    icon: Sparkles,
    gradient: 'from-secondary to-accent',
    features: [
      '3D Logo Design',
      'Particle Effects',
      'Holographic Renders',
      'LED Wall Optimized',
      'Loop Animations',
      'Multi-format Export',
    ],
    details:
      'Your logo, reimagined in motion for every digital and physical touchpoint.',
    useCases: [
      'LED Walls',
      'Digital Signage',
      'Social Media',
      'Event Screens',
      'Presentations',
    ],
  },
  {
    id: 'physical-setups',
    title: 'Physical Tech Setups',
    description:
      'End-to-end event technology installations with flawless execution.',
    icon: Settings,
    gradient: 'from-neon-pink to-accent',
    features: [
      'LED Walls',
      'Sound Systems',
      'Lighting Rigs',
      'Interactive Kiosks',
      'Stage Technology',
      'Technical Support',
    ],
    details:
      'We manage every technical detail to ensure seamless event execution.',
    useCases: [
      'Large-scale Events',
      'Concerts',
      'Fashion Shows',
      'Corporate Conferences',
      'Award Ceremonies',
    ],
  },
  {
    id: 'speaker-intros',
    title: 'Speaker Intros',
    description:
      'Epic speaker introductions that set the tone for impact.',
    icon: Mic,
    gradient: 'from-primary to-neon-cyan',
    features: [
      'Custom Motion Graphics',
      'Voice-over Integration',
      'Live Graphics',
      'Synchronized Audio',
      'Multi-screen Support',
    ],
    details:
      'Make every speaker entrance feel powerful and unforgettable.',
    useCases: [
      'Conferences',
      'Award Shows',
      'Keynotes',
      'TEDx Events',
    ],
  },
  {
    id: 'destination',
    title: 'Destination Reveals',
    description:
      'Dramatic reveal experiences for destinations and venues.',
    icon: Map,
    gradient: 'from-secondary to-primary',
    features: [
      'Cinematic Flythroughs',
      'Interactive Maps',
      '360° Experiences',
      'Drone Footage',
      'Virtual Tours',
    ],
    details:
      'Build anticipation with immersive destination reveal experiences.',
    useCases: [
      'Travel Events',
      'Hotel Launches',
      'Resort Openings',
      'Real Estate',
    ],
  },
  {
    id: 'trophy',
    title: 'Trophy Animations',
    description:
      'Stunning 3D trophy reveals and award ceremony visuals.',
    icon: Trophy,
    gradient: 'from-accent to-secondary',
    features: [
      '3D Trophy Modeling',
      'Reveal Animations',
      'Winner Graphics',
      'Category Transitions',
      'LED Wall Content',
    ],
    details:
      'Elevate award moments with cinematic trophy reveals.',
    useCases: [
      'Award Shows',
      'Sports Events',
      'Corporate Recognition',
      'Film Festivals',
    ],
  },
  {
    id: 'standee',
    title: 'Standee Logo Loops',
    description:
      'Mesmerizing looped animations for digital standees and displays.',
    icon: Clapperboard,
    gradient: 'from-neon-pink to-primary',
    features: [
      'Seamless Loops',
      'Portrait Optimized',
      'Ambient Motion',
      'Brand Integration',
      'Multi-size Export',
    ],
    details:
      'Hypnotic loop animations designed for continuous brand presence.',
    useCases: [
      'Retail Displays',
      'Event Signage',
      'Lobby Screens',
      'Exhibitions',
    ],
  },
];

const ServicesGrid = () => {
  const [selectedService, setSelectedService] =
    useState<(typeof services)[0] | null>(null);

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase">
            Full Spectrum
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">
            <span className="text-gradient">12</span> Ways to Wow
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Explore our complete range of experiential technology services.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              gradient={service.gradient}
              features={service.features}
              index={index}
              onClick={() => setSelectedService(service)}
            />
          ))}
        </div>
      </div>

      <ServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
    </section>
  );
};

export default ServicesGrid;
