import { useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Play,
  Sparkles,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

interface Experience {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  gradient: string;
  videoSrc: string;
}

const experiences: Experience[] = [
  {
    id: 'quiz-game',
    icon: <Play className="w-8 h-8" />,
    title: 'Quiz Game AV LinkedIn',
    description:
      'Interactive quiz game experience powered by audio-visual technology for maximum engagement.',
    color: 'primary',
    gradient: 'from-primary to-accent',
    videoSrc: '/4.mp4',
  },
  {
    id: 'fruit-cutter',
    icon: <Sparkles className="w-8 h-8" />,
    title: 'Fruit Cutter Game AV LinkedIn',
    description:
      'Fast-paced fruit cutter game with immersive audio-visual feedback for dynamic events.',
    color: 'secondary',
    gradient: 'from-secondary to-primary',
    videoSrc: '/1.mp4',
  },
  {
    id: 'kinect-game',
    icon: <Play className="w-8 h-8" />,
    title: 'Kinect Game AV LinkedIn',
    description:
      'Body-tracking motion game experience using Kinect technology for interactive engagement.',
    color: 'accent',
    gradient: 'from-accent to-secondary',
    videoSrc: '/2.mp4',
  },
  {
    id: 'pepsi-ar',
    icon: <Zap className="w-8 h-8" />,
    title: 'Pepsi AR Booth Video',
    description:
      'Branded augmented reality booth experience creating viral-worthy moments.',
    color: 'primary',
    gradient: 'from-primary to-secondary',
    videoSrc: '/6.mp4',
  },
  {
    id: 'ar-photo-booth',
    icon: <Sparkles className="w-8 h-8" />,
    title: 'AR Photo Booth Reel',
    description:
      'Cutting-edge AR photo booth creating instant shareable content with custom filters.',
    color: 'secondary',
    gradient: 'from-secondary to-accent',
    videoSrc: '/3.mp4',
  },
  {
    id: 'ai-video-booth',
    icon: <Zap className="w-8 h-8" />,
    title: 'AI Video Booth Video',
    description:
      'AI-powered video booth transforming guests into artistic creations in real-time.',
    color: 'accent',
    gradient: 'from-accent to-primary',
    videoSrc: '/5.mp4',
  },
];

interface TiltCardProps {
  experience: Experience;
  index: number;
  onSelectVideo: (video: string, title: string) => void;
}

const TiltCard = ({ experience, index, onSelectVideo }: TiltCardProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const isBlue = index % 2 === 0;

  const accentText = isBlue ? 'text-primary' : 'text-secondary';
  const accentBorder = isBlue
    ? 'border-primary/40 hover:border-secondary/60'
    : 'border-secondary/40 hover:border-primary/60';
  const accentBg = isBlue ? 'bg-primary/10' : 'bg-secondary/10';
  const hoverSwapBg = isBlue
    ? 'group-hover:bg-secondary/10'
    : 'group-hover:bg-primary/10';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotateX(((y - centerY) / centerY) * -15);
    setRotateY(((x - centerX) / centerX) * 15);
  };

  const handleClick = () => {
    onSelectVideo(experience.videoSrc, experience.title);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setRotateX(0);
        setRotateY(0);
        setIsHovered(false);
      }}
      onClick={handleClick}
      className="tilt-card group h-full cursor-pointer"
      data-cursor-hover
    >
      <motion.div
        className={`
          relative h-full p-8 rounded-2xl glass overflow-hidden
          border transition-all duration-300
          ${accentBorder}
          ${accentBg} ${hoverSwapBg}
          dark:border-border/50 dark:hover:border-primary/50
        `}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* DARK MODE GRADIENT OVERLAY */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${experience.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 dark:block hidden`}
        />

        {/* Floating particles */}
        {isHovered &&
          [...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                isBlue ? 'bg-primary' : 'bg-secondary'
              }`}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: -40, opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
              style={{ left: `${20 + i * 15}%` }}
            />
          ))}

        {/* Content */}
        <div
          className="relative z-10 space-y-4 h-full flex flex-col"
          style={{ transform: 'translateZ(30px)' }}
        >
          {/* Icon */}
          <motion.div
            className={`
              inline-flex p-4 rounded-xl transition-all
              ${accentBg}
              dark:bg-gradient-to-br ${experience.gradient}
            `}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <span className="text-foreground">{experience.icon}</span>
          </motion.div>

          {/* Title */}
          <h3
            className={`
              font-display text-xl font-bold transition-colors
              ${accentText}
              group-hover:${isBlue ? 'text-secondary' : 'text-primary'}
              dark:text-foreground dark:group-hover:text-gradient
            `}
          >
            {experience.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground flex-grow">
            {experience.description}
          </p>

          {/* Learn more */}
          <div
            className={`
              flex items-center gap-2 text-sm font-medium opacity-0
              group-hover:opacity-100 transition-all
              ${accentText}
            `}
          >
            Play Video <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Experiences = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<string>(experiences[0].videoSrc);
  const [selectedTitle, setSelectedTitle] = useState<string>(experiences[0].title);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const handleSelectVideo = (videoSrc: string, title: string) => {
    console.log('Video selected:', videoSrc);
    setSelectedVideo(videoSrc);
    setSelectedTitle(title);
  };

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-background"
        style={{ y: backgroundY }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6">
            Our Experiences
          </span>

          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Tech That</span>
            <br />
            <span className="text-secondary dark:text-gradient">
              Transforms Events
            </span>
          </h2>

          <p className="text-muted-foreground text-lg">
            From AR photo booths to AI-powered installations, we bring
            cutting-edge technology to premium events.
          </p>
        </div>

        {/* Video Player and Cards Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 h-[400px] rounded-2xl glass border border-border/50 overflow-hidden bg-black flex items-center justify-center"
          >
            {selectedVideo && (
              <video
                ref={videoRef}
                key={selectedVideo}
                src={selectedVideo}
                controls
                autoPlay
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-contain"
                onLoadedData={() => videoRef.current?.play()}
                onError={(e) => console.error('Video error:', selectedVideo, e)}
              />
            )}
          </motion.div>

          {/* Cards Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((exp, i) => (
              <TiltCard key={exp.id} experience={exp} index={i} onSelectVideo={handleSelectVideo} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <motion.button
            onClick={() => navigate('/services')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass border border-primary/30 hover:border-secondary transition-all"
          >
            <span className="font-display font-semibold">
              Explore All Experiences
            </span>
            <ArrowRight className="w-5 h-5 text-primary" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Experiences;
