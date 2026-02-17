  import { motion, useInView, useScroll, useTransform } from 'framer-motion';
  import { useRef, useState, useEffect } from 'react';
  import { Play, ArrowRight, ChevronRight } from 'lucide-react';
  import { useVideoPlayback } from '@/contexts/VideoPlaybackContext';

  interface ExperienceCategoryProps {
    sectionId?: string;
    title: string;
    description: string;
    items: string[];
    gradient: string;
    index: number;
    videoMap?: Record<string, string | string[]>;
  }

  const ExperienceCategory = ({
    sectionId,
    title,
    description,
    items,
    gradient,
    index,
    videoMap = {},
  }: ExperienceCategoryProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
    const [selectedPlaylist, setSelectedPlaylist] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [isCurrentlyVisible, setIsCurrentlyVisible] = useState(false);
    const { pauseAllVideos } = useVideoPlayback();
    const observerRef = useRef<IntersectionObserver | null>(null);

    function pickRandomIndex(list: string[]) {
      return Math.floor(Math.random() * list.length);
    }

    function encodePublicUrl(url: string) {
      // Handles spaces and special chars in filenames
      return encodeURI(url);
    }

    function selectVideo(value: string | string[]) {
      if (Array.isArray(value)) {
        if (value.length === 0) return;
        const idx = pickRandomIndex(value);
        setSelectedPlaylist(value);
        setSelectedIndex(idx);
        setSelectedVideoUrl(encodePublicUrl(value[idx]));
        return;
      }

      setSelectedPlaylist([]);
      setSelectedIndex(0);
      setSelectedVideoUrl(encodePublicUrl(value));
    }

    function playNextInPlaylist() {
      if (!selectedPlaylist || selectedPlaylist.length === 0) return;
      setSelectedIndex((prev) => {
        const next = (prev + 1) % selectedPlaylist.length;
        setSelectedVideoUrl(encodePublicUrl(selectedPlaylist[next]));
        return next;
      });
    }

    useEffect(() => {
      if (selectedVideoUrl && videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, [selectedVideoUrl]);

    // Intersection Observer for auto-play on scroll visibility
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsCurrentlyVisible(true);
            // Auto-play first item when category becomes visible (works on scroll up/down)
            if (items.length > 0 && !selectedVideoUrl) {
              const firstItemValue = videoMap[items[0]];
              if (firstItemValue) {
                selectVideo(firstItemValue);
              }
            }
          } else {
            setIsCurrentlyVisible(false);
            // Pause video when category scrolls out of view
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        },
        { threshold: 0.25, rootMargin: '50px' }
      );

      observerRef.current = observer;
      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (observerRef.current && ref.current) {
          observerRef.current.unobserve(ref.current);
        }
      };
    }, [items, videoMap]);

    // Pause all other videos when this category is visible and has a video
    useEffect(() => {
      if (isCurrentlyVisible && selectedVideoUrl) {
        // Pause all videos except this one
        pauseAllVideos(sectionId);
        // Resume playing this video
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }
    }, [isCurrentlyVisible, selectedVideoUrl, sectionId, pauseAllVideos]);

    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ['start end', 'end start'],
    });

    const x = useTransform(
      scrollYProgress,
      [0, 1],
      [index % 2 === 0 ? -100 : 100, 0]
    );
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    const isReversed = index % 2 !== 0;
    const accentText = index % 2 === 0 ? 'text-primary' : 'text-secondary';
    const accentHover = index % 2 === 0 ? 'group-hover:text-primary' : 'group-hover:text-secondary';
    const accentBorder = index % 2 === 0 ? 'border-primary/50' : 'border-secondary/50';

    return (
      <motion.section
        id={sectionId}
        ref={ref}
        data-section-id={sectionId}
        style={{ opacity }}
        className="py-24 md:py-32 relative overflow-hidden scroll-mt-24"
      >
        {/* Background blob */}
        <motion.div
          style={{ x }}
          className={`
            absolute ${isReversed ? '-left-64' : '-right-64'} top-1/2 -translate-y-1/2
            w-[500px] h-[500px] rounded-full blur-[100px] opacity-20
            bg-primary/20
            dark:bg-gradient-to-br ${gradient}
          `}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div
            className={`grid lg:grid-cols-2 gap-16 items-center ${
              isReversed ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className={isReversed ? 'lg:order-2' : ''}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className={`uppercase tracking-[0.2em] text-sm font-medium ${accentText}`}
              >
                Category
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6 leading-tight break-words"
              >
                {title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground text-lg mb-8"
              >
                {description}
              </motion.p>

              {/* Items */}
              <div className="space-y-4">
                {items.map((item, i) => (
                  <motion.div
                    key={i}
                    role="button"
                    tabIndex={0}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    onMouseEnter={() => setHoveredItem(i)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => {
                      const value = videoMap[item];
                      if (!value) return;
                      selectVideo(value);
                    }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const value = videoMap[item];
                            if (!value) return;
                            selectVideo(value);
                          }
                        }}
                    className="group flex items-center justify-between py-4 border-b border-border/30 cursor-pointer"
                  >
                    <span
                      className={`font-medium transition-colors ${accentHover}`}
                    >
                      {item}
                    </span>

                    <motion.div
                      animate={{ x: hoveredItem === i ? 5 : 0 }}
                      className={`flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${accentText}`}
                    >
                      <span className="text-sm">Play Video</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Visual - video container beside the list */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`relative h-[400px] md:h-[500px] overflow-visible ${
                isReversed ? 'lg:order-1' : ''
              }`}
            >
              {/* Card / Video container */}
              <div
                className={`
                  absolute inset-0 glass rounded-3xl overflow-hidden
                  bg-black/50
                  dark:bg-gradient-to-br ${gradient}
                `}
              >
                {selectedVideoUrl ? (
                  <>
                    <video
                      ref={videoRef}
                      key={selectedVideoUrl}
                      src={selectedVideoUrl}
                      controls
                      autoPlay
                      muted
                      playsInline
                      preload="auto"
                      className="absolute inset-0 w-full h-full object-contain"
                      onLoadedData={() => videoRef.current?.play()}
                    />

                    {/* Next video (only when current item has a playlist) */}
                    {selectedPlaylist.length > 1 && (
                      <button
                        type="button"
                        aria-label="Next video"
                        onClick={playNextInPlaylist}
                        className="
                          absolute right-4 top-1/2 -translate-y-1/2 z-10
                          w-12 h-12 rounded-full
                          bg-black/40 hover:bg-black/60 text-white
                          backdrop-blur-sm
                          flex items-center justify-center
                          transition-colors
                        "
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    )}

                    {/* Corners */}
                    <div
                      className={`absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 ${accentBorder} rounded-tl-lg pointer-events-none`}
                    />
                    <div
                      className={`absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 ${accentBorder} rounded-br-lg pointer-events-none`}
                    />
                  </>
                ) : (
                  <>
                    {/* Pattern */}
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />

                    {/* Play placeholder */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="relative w-24 h-24 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className={`absolute inset-0 rounded-full ${
                            index % 2 === 0 ? 'bg-primary/30' : 'bg-secondary/30'
                          } blur-xl`}
                        />
                        <Play className="w-10 h-10 text-foreground relative z-10 ml-1" />
                      </div>
                    </motion.div>

                    {/* Corners */}
                    <div
                      className={`absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 ${accentBorder} rounded-tl-lg`}
                    />
                    <div
                      className={`absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 ${accentBorder} rounded-br-lg`}
                    />
                  </>
                )}
              </div>

              {/* Footer pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-full"
              >
                <span className="text-sm font-medium">
                  {items.length} Experiences
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    );
  };

  export default ExperienceCategory;
