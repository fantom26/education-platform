import { RefObject, useEffect } from "react";

import Hls from "hls.js";

interface useHLSPlayerProps {
  link: string;
  playerRef: RefObject<HTMLVideoElement | null>;
}

export const useHLSPlayer = ({ link, playerRef }: useHLSPlayerProps) => {
  useEffect(() => {
    const video = playerRef.current;
    const hls = new Hls();

    if (Hls.isSupported() && video) {
      hls.loadSource(link);
      hls.attachMedia(video);
    }

    return () => {
      hls.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link]);
};
