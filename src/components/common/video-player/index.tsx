import { FC, KeyboardEvent, SyntheticEvent, useRef, useState } from "react";

import { styled } from "@mui/material/styles";

import { useHLSPlayer } from "hooks";
import { playerbackRates } from "utils/enums";

import { Controls } from "./components/contols";

const format = (seconds: number | string): string => {
  if (isNaN(seconds as number)) {
    return "00:00";
  }

  const date = new Date((seconds as number) * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  } else {
    return `${mm}:${ss}`;
  }
};

const PlayerStyled = styled("div")({
  position: "relative",
  display: "flex"
});

interface VideoPlayerProps {
  poster?: string;
  link: string;
}

interface IPlayerState {
  playing: boolean;
  volume: number;
  playerbackRate: number;
  played: number;
  seeking: boolean;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({ poster, link }) => {
  const [playerState, setPlayerState] = useState<IPlayerState>({
    playing: false,
    volume: 0.5,
    playerbackRate: playerbackRates.normal,
    played: 0,
    seeking: false
  });
  const { playing, volume, playerbackRate, played } = playerState;
  const [openedFullScreen, setOpenedFullScreen] = useState(false);
  const playerWrapperRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<HTMLVideoElement | null>(null);

  useHLSPlayer({ link, playerRef });

  const handleRewind = () => {
    if (playerRef.current) {
      playerRef.current.currentTime -= 10;
    }
  };

  const handleFastForward = () => {
    if (playerRef.current) {
      playerRef.current.currentTime += 10;
    }
  };

  const handlePlayVideo = () => {
    if (playerRef.current) {
      playerRef.current.play();
    }
  };

  const handlePauseVideo = () => {
    if (playerRef.current) {
      playerRef.current.pause();
    }
  };

  const handlePlayAndPause = () => {
    setPlayerState({ ...playerState, playing: !playerState.playing });
    if (playerState.playing) {
      handlePauseVideo();
    } else {
      handlePlayVideo();
    }
  };

  const handleVolumeChange = (event: Event, newValue: number | Array<number>) => {
    setPlayerState({ ...playerState, volume: (newValue as number) / 100 });
    if (playerRef.current) {
      playerRef.current.volume = (newValue as number) / 100;
    }
  };

  const handleVolumeSeek = (event: SyntheticEvent | Event, newValue: number | Array<number>) => {
    setPlayerState({ ...playerState, volume: (newValue as number) / 100 });
    if (playerRef.current) {
      playerRef.current.volume = (newValue as number) / 100;
    }
  };

  const handleMuting = () => {
    setPlayerState({ ...playerState, volume: 0 });
    if (playerRef.current) {
      playerRef.current.volume = 0;
    }
  };

  const handlePlayerRateByKeyboard = (event: KeyboardEvent<HTMLVideoElement>) => {
    if (event.code === "Period" && event.shiftKey && playerRef.current) {
      if (playerRef.current.playbackRate < playerbackRates.fastest) {
        setPlayerState({ ...playerState, playerbackRate: playerRef.current.playbackRate + 0.5 });
        playerRef.current.playbackRate += 0.5;
      }
    }
    if (event.code === "Comma" && event.shiftKey && playerRef.current) {
      if (playerRef.current.playbackRate > playerbackRates.slow) {
        setPlayerState({ ...playerState, playerbackRate: playerRef.current.playbackRate - 0.5 });
        playerRef.current.playbackRate -= 0.5;
      }
    }
  };

  const handlePlayerRate = (rate: number) => {
    setPlayerState({ ...playerState, playerbackRate: rate });
    if (playerRef.current) {
      playerRef.current.playbackRate = rate;
    }
  };

  const setFocusOnVideo = () => {
    if (playerRef.current) {
      playerRef.current.focus();
    }
  };

  const handleFullScreenMode = () => {
    if (!openedFullScreen && playerRef.current) {
      setOpenedFullScreen(true);
      playerRef.current.requestFullscreen();
    } else {
      setOpenedFullScreen(false);
      document.exitFullscreen();
    }
  };

  const handlePlayerSeek = (event: Event, newValue: number | Array<number>) => {
    setPlayerState({ ...playerState, played: (newValue as number) / 100 });
    if (playerRef.current) {
      playerRef.current.currentTime = (newValue as number) / 100;
    }
  };

  const handlePictureInpicture = () => {
    if (playerRef.current) {
      playerRef.current.requestPictureInPicture();
    }
  };

  const handlePlayerMouseSeekDown = () => {
    setPlayerState({ ...playerState, seeking: true });
  };

  const handlePlayerMouseSeekUp = (event: SyntheticEvent | Event, newValue: number | Array<number>) => {
    setPlayerState({ ...playerState, seeking: false });

    if (playerRef.current) {
      playerRef.current.currentTime = (newValue as number) / 100;
    }
  };

  const handlePlayerProgress = () => {
    if (!playerState.seeking && playerRef.current) {
      setPlayerState({ ...playerState, played: (playerRef.current.currentTime * 100) / playerRef.current.duration });
    }
  };

  const currentPlayerTime = playerRef.current ? playerRef.current.currentTime : "00:00";
  const movieDuration = playerRef.current ? playerRef.current.duration : "00:00";
  const playedTime = format(currentPlayerTime);
  const fullMovieTime = format(movieDuration);

  return (
    <PlayerStyled ref={playerWrapperRef}>
      <video
        preload="metadata"
        ref={playerRef}
        poster={poster}
        onPlay={setFocusOnVideo}
        onClick={handlePlayAndPause}
        onTimeUpdate={handlePlayerProgress}
        onKeyDown={(e) => handlePlayerRateByKeyboard(e)}
        tabIndex={0}
        width="100%"
        height="100%"
        style={{ outline: "none" }}
      ></video>
      <Controls
        playandpause={handlePlayAndPause}
        playing={playing}
        rewind={handleRewind}
        fastForward={handleFastForward}
        volumeChange={handleVolumeChange}
        volumeSeek={handleVolumeSeek}
        muting={handleMuting}
        volume={volume}
        fullScreenMode={handleFullScreenMode}
        playedTime={playedTime}
        fullMovieTime={fullMovieTime}
        playRate={handlePlayerRate}
        playerbackRate={playerbackRate}
        played={played}
        onSeek={handlePlayerSeek}
        onSeekMouseUp={handlePlayerMouseSeekUp}
        onSeekMouseDown={handlePlayerMouseSeekDown}
        onPip={handlePictureInpicture}
      />
    </PlayerStyled>
  );
};
