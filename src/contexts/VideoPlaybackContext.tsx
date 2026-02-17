import React, { createContext, useContext, useState, useCallback } from 'react';

interface ActiveVideoState {
  sectionId: string | null;
  videoRef: HTMLVideoElement | null;
}

interface VideoPlaybackContextType {
  activeVideo: ActiveVideoState;
  setActiveVideo: (state: ActiveVideoState) => void;
  pauseAllVideos: (exceptSectionId?: string) => void;
}

const VideoPlaybackContext = createContext<VideoPlaybackContextType | undefined>(undefined);

export const VideoPlaybackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeVideo, setActiveVideo] = useState<ActiveVideoState>({
    sectionId: null,
    videoRef: null,
  });

  const pauseAllVideos = useCallback((exceptSectionId?: string) => {
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
      // Only pause videos that aren't in the excepted section
      if (!exceptSectionId || !video.closest(`[data-section-id="${exceptSectionId}"]`)) {
        video.pause();
      }
    });
  }, []);

  return (
    <VideoPlaybackContext.Provider
      value={{
        activeVideo,
        setActiveVideo,
        pauseAllVideos,
      }}
    >
      {children}
    </VideoPlaybackContext.Provider>
  );
};

export const useVideoPlayback = () => {
  const context = useContext(VideoPlaybackContext);
  if (!context) {
    throw new Error('useVideoPlayback must be used within VideoPlaybackProvider');
  }
  return context;
};
