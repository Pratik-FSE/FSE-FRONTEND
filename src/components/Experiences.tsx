import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const VIDEO_SRC = '/nesarajan.mp4';

const Experiences = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.5 });
  const [videoSrc] = useState<string>(() => VIDEO_SRC);
  const [isMuted, setIsMuted] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;

    if (isInView) {
      void video.play().catch(() => {
        // Some browsers can still block autoplay until interaction.
      });
      return;
    }

    video.pause();
  }, [isInView, isMuted]);

  return (
    <section id="experiences" ref={sectionRef} className="relative py-24 overflow-hidden">
      <motion.div className="absolute inset-0 bg-background" style={{ y: backgroundY }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6">
            Our Experiences
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Tech That</span>
            <br />
            <span className="text-secondary dark:text-gradient">Transforms Events</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From AR photo booths to AI-powered installations, we bring
            cutting-edge technology to events.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 w-screen ml-[calc(50%-50vw)] glass border-y border-border/50 overflow-hidden bg-black"
      >
        <video
          ref={videoRef}
          key={videoSrc}
          src={videoSrc}
          playsInline
          preload="auto"
          loop
          className="w-full h-auto max-h-[70vh] mx-auto"
        />
        <button
          type="button"
          onClick={() => setIsMuted((prev) => !prev)}
          className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-black/70 text-white text-sm font-medium border border-white/20 hover:bg-black/80 transition-colors"
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      </motion.div>
    </section>
  );
};

export default Experiences;
