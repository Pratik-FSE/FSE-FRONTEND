import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, ChevronRight as NextIcon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

// Video lists for showcase items
const aiPhotoGenerationVideos: string[] = [
  '/Ai videos/AJMAL ADS  FINAL.mp4',
  '/Ai videos/GLLPHYN AD ENGLISH SPEECH.mp4',
  '/Ai videos/GLLPHYN ADS VERTICAL.mp4',
  '/Ai videos/PEARLVILLE FINAL.mp4',
];

const anamorphicArtVideos: string[] = [
  '/anamorphic/CBIC_Anamorphic.mp4',
  '/anamorphic/Dabour.mp4',
  '/anamorphic/DLF_Cybercity.MOV',
  '/anamorphic/Invest india For LEd.mp4',
  '/anamorphic/INVEST_INDIA.mp4',
  '/anamorphic/Kotak_Anamorphic_1TEST.mp4',
  '/anamorphic/Pulse.mp4',
  '/anamorphic/Tribeca27s.mp4',
];

// Map showcase item titles to video arrays
const showcaseVideoMap: Record<string, string[]> = {
  'AI Photo Generation': aiPhotoGenerationVideos,
  'Anamorphic Art': anamorphicArtVideos,
};

const showcaseItems = [
  {
    id: 1,
    title: 'AI Photo Generation',
    subtitle: 'Real-time Style Transfer',
    description:
      'Transform photos into stunning artwork in seconds using custom-trained AI models.',
    gradientLight: 'from-blue-600 via-orange-500 to-blue-700',
    gradientDark: 'from-primary via-accent to-secondary',
  },
  {
    id: 2,
    title: 'Holographic Displays',
    subtitle: 'Floating 3D Visuals',
    description:
      "Pepper's ghost illusions and LED fan displays creating stunning floating visuals.",
    gradientLight: 'from-orange-500 via-blue-600 to-orange-600',
    gradientDark: 'from-secondary via-primary to-accent',
  },
  {
    id: 3,
    title: 'Motion Tracking',
    subtitle: 'Full Body Capture',
    description:
      'Real-time skeletal tracking for interactive installations and gaming experiences.',
    gradientLight: 'from-blue-600 via-orange-500 to-blue-700',
    gradientDark: 'from-accent via-secondary to-primary',
  },
  {
    id: 4,
    title: 'Anamorphic Art',
    subtitle: '3D Optical Illusions',
    description:
      'Mind-bending 3D visuals that appear to pop out of screens and billboards.',
    gradientLight: 'from-orange-500 via-blue-600 to-orange-600',
    gradientDark: 'from-neon-cyan via-secondary to-primary',
  },
];

const TechShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVideos, setSelectedVideos] = useState<Record<number, { url: string; playlist: string[]; index: number }>>({});
  const { theme } = useTheme();

  function encodePublicUrl(url: string) {
    return encodeURI(url);
  }

  function selectVideo(itemId: number, itemTitle: string) {
    const videoList = showcaseVideoMap[itemTitle];
    if (!videoList || videoList.length === 0) return;

    const randomIndex = Math.floor(Math.random() * videoList.length);
    setSelectedVideos((prev) => ({
      ...prev,
      [itemId]: {
        url: encodePublicUrl(videoList[randomIndex]),
        playlist: videoList,
        index: randomIndex,
      },
    }));
  }

  function playNextInPlaylist(itemId: number) {
    const current = selectedVideos[itemId];
    if (!current || current.playlist.length === 0) return;

    const nextIndex = (current.index + 1) % current.playlist.length;
    setSelectedVideos((prev) => ({
      ...prev,
      [itemId]: {
        url: encodePublicUrl(current.playlist[nextIndex]),
        playlist: current.playlist,
        index: nextIndex,
      },
    }));
  }

  useEffect(() => {
    Object.entries(selectedVideos).forEach(([itemId, video]) => {
      const videoEl = videoRefs.current[Number(itemId)];
      if (videoEl) {
        videoEl.play().catch(() => {});
      }
    });
  }, [selectedVideos]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);

  const prevSlide = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length
    );

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-overlay"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/50 to-transparent" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-content">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-16"
        >
          <div>
            <span className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-4 block">
              In Action
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-hero">
              Tech <span className="text-gradient">Showcase</span>
            </h2>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="w-14 h-14 rounded-full glass flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6 text-hero" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="w-14 h-14 rounded-full glass flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6 text-hero" />
            </motion.button>
          </div>
        </motion.div>

        {/* Showcase slider */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 30 }}
              className="flex"
            >
              {showcaseItems.map((item) => {
                const gradient =
                  theme === 'dark'
                    ? item.gradientDark
                    : item.gradientLight;

                return (
                  <div key={item.id} className="w-full flex-shrink-0">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      {/* Visual - Video container */}
                      <div
                        className={`relative h-[400px] md:h-[500px] bg-black/50 dark:bg-gradient-to-br ${gradient} rounded-3xl overflow-hidden`}
                        onClick={() => selectVideo(item.id, item.title)}
                      >
                        {selectedVideos[item.id] ? (
                          <>
                            <video
                              ref={(el) => {
                                videoRefs.current[item.id] = el;
                              }}
                              key={selectedVideos[item.id].url}
                              src={selectedVideos[item.id].url}
                              controls
                              autoPlay
                              muted
                              playsInline
                              preload="auto"
                              className="absolute inset-0 w-full h-full object-contain"
                              onLoadedData={() => videoRefs.current[item.id]?.play()}
                            />
                            {/* Next video button (only when playlist has multiple videos) */}
                            {selectedVideos[item.id].playlist.length > 1 && (
                              <button
                                type="button"
                                aria-label="Next video"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playNextInPlaylist(item.id);
                                }}
                                className="
                                  absolute right-4 top-1/2 -translate-y-1/2 z-10
                                  w-12 h-12 rounded-full
                                  bg-black/40 hover:bg-black/60 text-white
                                  backdrop-blur-sm
                                  flex items-center justify-center
                                  transition-colors
                                "
                              >
                                <NextIcon className="w-6 h-6" />
                              </button>
                            )}
                          </>
                        ) : (
                          <>
                            <motion.div
                              animate={{
                                backgroundPosition: ['0% 0%', '100% 100%'],
                              }}
                              transition={{
                                duration: 20,
                                repeat: Infinity,
                                repeatType: 'reverse',
                              }}
                              className="absolute inset-0 opacity-30"
                              style={{
                                backgroundImage:
                                  'radial-gradient(circle at 30% 30%, white 1px, transparent 1px)',
                                backgroundSize: '30px 30px',
                              }}
                            />

                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="absolute inset-0 flex items-center justify-center cursor-pointer"
                            >
                              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group">
                                <motion.div
                                  animate={{ scale: [1, 1.3, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="absolute inset-0 rounded-full bg-white/20"
                                />
                                <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
                              </div>
                            </motion.div>

                            <div className="absolute inset-0 noise-overlay opacity-30" />
                          </>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        <motion.span
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-primary uppercase tracking-widest text-sm mb-4 block"
                        >
                          {item.subtitle}
                        </motion.span>

                        <motion.h3
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-4xl md:text-5xl font-display font-bold mb-6 text-hero"
                        >
                          {item.title}
                        </motion.h3>

                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-hero-muted text-lg mb-8"
                        >
                          {item.description}
                        </motion.p>

                        <motion.button
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          whileHover={{ scale: 1.05 }}
                          className="px-8 py-4 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          Learn More
                        </motion.button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {showcaseItems.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="relative h-2 rounded-full overflow-hidden"
                animate={{ width: currentIndex === index ? 40 : 12 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-muted" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: currentIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechShowcase;
