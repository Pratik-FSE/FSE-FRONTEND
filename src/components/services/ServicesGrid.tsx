import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Gamepad2, Camera, Glasses, Monitor, Video, Clapperboard, 
  Sparkles, Settings, Mic, Map, Trophy, LayoutGrid 
} from 'lucide-react';
import ServiceCard from './ServiceCard';
import ServiceModal from './ServiceModal';

const services = [
  {
    id: 'gaming',
    title: 'Gaming Booths',
    description: 'High-octane gaming experiences featuring PlayStation, Xbox, racing simulators, and esports setups.',
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
    details: 'Our gaming booths bring the excitement of competitive gaming to your events. From casual gaming lounges to full-scale esports tournaments, we provide the hardware, software, and expertise to create unforgettable gaming experiences.',
    useCases: ['Fashion Launches', 'Brand Activations', 'Corporate Events', 'Product Launches', 'Award Shows', 'Influencer Events'],
  },
  {
    id: 'ai-photo',
    title: 'AI Photo Booths',
    description: 'Next-gen AI-powered photo experiences that transform guests into works of art.',
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
    details: 'Our AI photo booths use cutting-edge machine learning to create stunning, personalized imagery. Guests can transform into their favorite characters, try on virtual fashion, or see themselves reimagined in different artistic styles.',
    useCases: ['Fashion Shows', 'Luxury Brand Events', 'Weddings', 'Galas', 'Music Festivals', 'Movie Premieres'],
  },
  {
    id: 'ar-vr',
    title: 'AR/VR Experiences',
    description: 'Immersive augmented and virtual reality installations that blur the line between digital and physical.',
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
    details: 'Step into new dimensions with our AR/VR experiences. From virtual fashion showrooms to interactive product demonstrations, we create immersive environments that captivate and engage audiences like never before.',
    useCases: ['Retail Activations', 'Trade Shows', 'Product Launches', 'Fashion Weeks', 'Museum Exhibitions', 'Real Estate'],
  },
  {
    id: 'anamorphic',
    title: 'Anamorphic Displays',
    description: 'Mind-bending 3D illusions on LED walls that stop people in their tracks.',
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
    details: 'Our anamorphic displays create stunning 3D illusions that appear to break through the screen. Perfect for flagship stores, event installations, and creating viral social media moments.',
    useCases: ['Flagship Stores', 'Times Square Events', 'Product Reveals', 'Trade Shows', 'Grand Openings', 'Art Installations'],
  },
  {
    id: 'chroma',
    title: 'Chroma / Green Screen',
    description: 'Professional-grade green screen setups for creating impossible environments.',
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
    details: 'Transport your guests anywhere with our professional chroma key setups. From exotic locations to fantasy worlds, we make the impossible possible with cinema-quality results.',
    useCases: ['Photo Activations', 'Video Testimonials', 'Social Content', 'Event Coverage', 'Brand Videos', 'Influencer Content'],
  },
  {
    id: 'brand-videos',
    title: 'Brand Reveal Videos',
    description: 'Cinematic brand videos that make moments unforgettable.',
    icon: Video,
    gradient: 'from-accent to-primary',
    features: [
      'Cinematic Production',
      '4K/8K Quality',
      'Motion Graphics',
      'Sound Design',
      'Synchronized Displays',
      'Live Event Integration',
    ],
    details: 'Our brand reveal videos are designed to create maximum impact. From subtle teasers to explosive reveals, we craft cinematic moments that leave audiences speechless.',
    useCases: ['Product Launches', 'Award Shows', 'Fashion Shows', 'Corporate Events', 'Concert Openers', 'Grand Reveals'],
  },
  {
    id: 'logo-animations',
    title: 'Logo Animations',
    description: 'Dynamic logo animations that bring brand identities to life.',
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
    details: 'Your logo, reimagined in motion. We create stunning animated versions of brand identities that work across LED walls, social media, and all digital touchpoints.',
    useCases: ['LED Walls', 'Digital Signage', 'Social Media', 'Event Screens', 'Presentations', 'Brand Touchpoints'],
  },
  {
    id: 'physical-setups',
    title: 'Physical Tech Setups',
    description: 'End-to-end event technology installations with flawless execution.',
    icon: Settings,
    gradient: 'from-neon-pink to-accent',
    features: [
      'LED Wall Installation',
      'Sound Systems',
      'Lighting Rigs',
      'Interactive Kiosks',
      'Stage Technology',
      'Technical Support',
    ],
    details: 'From concept to execution, we handle every technical aspect of your event. Our team ensures seamless integration of all technology elements for a flawless experience.',
    useCases: ['Large-scale Events', 'Fashion Shows', 'Concerts', 'Trade Shows', 'Corporate Conferences', 'Award Ceremonies'],
  },
  {
    id: 'speaker-intros',
    title: 'Speaker Intros',
    description: 'Epic speaker introductions that set the stage for impact.',
    icon: Mic,
    gradient: 'from-primary to-neon-cyan',
    features: [
      'Custom Motion Graphics',
      'Voice-over Integration',
      'Bio Animations',
      'Live Graphics',
      'Synchronized Audio',
      'Multi-screen Support',
    ],
    details: 'Make every speaker feel like a rockstar. Our custom intro packages combine stunning visuals with impactful sound design to create memorable entrances.',
    useCases: ['Conferences', 'Award Shows', 'Corporate Events', 'TEDx Events', 'Keynotes', 'Panel Discussions'],
  },
  {
    id: 'destination',
    title: 'Destination Reveals',
    description: 'Dramatic reveal experiences for destinations and venues.',
    icon: Map,
    gradient: 'from-secondary to-primary',
    features: [
      'Cinematic Flythrough',
      'Interactive Maps',
      '360° Experiences',
      'Drone Footage',
      'Virtual Tours',
      'Ambient Sound',
    ],
    details: 'Build anticipation and excitement with our destination reveal experiences. Perfect for travel brands, hospitality launches, and venue unveilings.',
    useCases: ['Travel Events', 'Hotel Launches', 'Resort Openings', 'Wedding Planning', 'Tourism Campaigns', 'Real Estate'],
  },
  {
    id: 'trophy',
    title: 'Trophy Animations',
    description: 'Stunning 3D trophy reveals and award ceremony visuals.',
    icon: Trophy,
    gradient: 'from-accent to-secondary',
    features: [
      '3D Trophy Modeling',
      'Reveal Animations',
      'Winner Graphics',
      'Category Transitions',
      'LED Wall Content',
      'Social Assets',
    ],
    details: 'Elevate your award ceremonies with custom 3D trophy animations. From dramatic reveals to winner announcements, we make every award moment feel special.',
    useCases: ['Award Shows', 'Sports Events', 'Corporate Recognition', 'Film Festivals', 'Industry Awards', 'Galas'],
  },
  {
    id: 'standee',
    title: 'Standee Logo Loops',
    description: 'Mesmerizing looped animations for digital standees and displays.',
    icon: Clapperboard,
    gradient: 'from-neon-pink to-primary',
    features: [
      'Seamless Loops',
      'Portrait Optimized',
      'Ambient Motion',
      'Brand Integration',
      'Multi-size Export',
      'Energy Efficient',
    ],
    details: 'Keep your brand in constant motion with our standee loop animations. Designed for digital signage, these hypnotic loops ensure your brand stands out.',
    useCases: ['Retail Displays', 'Event Signage', 'Lobby Screens', 'Exhibition Stands', 'Point of Sale', 'Window Displays'],
  },
];

const ServicesGrid = () => {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">Full Spectrum</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">
            <span className="text-gradient">12</span> Ways to Wow
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto font-body">
            From immersive gaming experiences to stunning visual productions, 
            explore our complete range of experiential technology services.
          </p>
        </motion.div>

        {/* Services grid */}
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

      {/* Service Modal */}
      <ServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
    </section>
  );
};

export default ServicesGrid;
