import { MouseEvent, useRef, useState } from "react";

import {
  Forward10,
  Fullscreen,
  PauseCircle,
  PictureInPictureAlt,
  PlayCircle,
  Replay10,
  VolumeDown,
  VolumeMute,
  VolumeOff,
  VolumeUp
} from "@mui/icons-material";
import { Stack } from "@mui/material";

import { Loader } from "components/ui";

export const VideoPlayer = () => {
  const [loading, setLoading] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [openedFullScreen, setOpenedFullScreen] = useState(false);
  const videoPlayer = useRef<HTMLDivElement | null>(null);
  const videoSrc = useRef<HTMLVideoElement | null>(null);
  const volumeRange = useRef<HTMLInputElement | null>(null);

  const waitingHandler = () => {
    setLoading(true);
  };

  const canPlayHandler = () => {
    setLoading(false);
  };

  const playVideoHandler = () => {
    if (videoSrc.current) {
      setIsVideoPaused(false);
      videoSrc.current.play();
    }
  };

  const pauseVideoHandler = () => {
    if (videoSrc.current) {
      setIsVideoPaused(true);
      videoSrc.current.pause();
    }
  };

  const togglePlayAndPause = () => {
    if (isVideoPaused) {
      pauseVideoHandler();
    } else {
      playVideoHandler();
    }
  };

  const fastRewindHandler = () => {
    if (videoSrc.current) {
      videoSrc.current.currentTime -= 10;
    }
  };

  const fastForwardHandler = () => {
    if (videoSrc.current) {
      videoSrc.current.currentTime += 10;
    }
  };

  const setVolume = () => {
    if (videoSrc.current && volumeRange.current) {
      videoSrc.current.volume = +volumeRange.current.value / 100;
    }
  };

  const muteVideoVolume = () => {
    if (videoSrc.current && volumeRange.current) {
      if (volumeRange.current.value === "0") {
        volumeRange.current.value = "60";
        videoSrc.current.volume = 0.6;
      } else {
        volumeRange.current.value = "0";
        videoSrc.current.volume = 0;
      }
    }
  };

  const generateVolumeIcon = (volume: number) => {
    if (volume === 0) {
      return <VolumeOff />;
    } else if (volume < 39) {
      return <VolumeMute />;
    } else if (volume > 39 && volume < 79) {
      return <VolumeDown />;
    } else {
      return <VolumeUp />;
    }
  };

  const turnFullScreenMode = () => {
    if (!openedFullScreen && videoPlayer.current) {
      setOpenedFullScreen(true);
      videoPlayer.current.requestFullscreen();
    } else {
      setOpenedFullScreen(false);
      document.exitFullscreen();
    }
  };

  const loadData = (e: MouseEvent<HTMLVideoElement>) => {
    const videoDuration = e.target.duration;
    const totalMin = Math.floor(videoDuration / 60);
    let totalSec = Math.floor(videoDuration % 60);
    // if video seconds are less than 10, then add 0 at the beginning
    totalSec < 10 ? (totalSec = `0${totalSec}`) : totalSec;
    totalVideoDuration.innerHTML = `${totalMin} : ${totalSec}`;
  };

  const timeupdate = (e: MouseEvent<HTMLVideoElement>) => {
    const currentVideoTime = e.target.currentTime;
    const currentVideoMinute = Math.floor(currentVideoTime / 60);
    let currentVideSeconds = Math.floor(currentVideoTime % 60);
    // if seconds are less than 10 then add 0 at the beginning
    currentVideSeconds < 10 ? (currentVideSeconds = `0${currentVideSeconds}`) : currentVideSeconds;
    current.innerHTML = `${currentVideoMinute} : ${currentVideSeconds}`;
    const videoDuration = e.target.duration;
    // progressBar width change
    const progressWidth = (currentVideoTime / videoDuration) * 100 + 0.5;
    videoProgressBar.style.width = `${progressWidth}%`;
  };

  const setVideoTime = (e) => {
    const videoDuration = VideoScr.duration;
    const progressWidthvalue = videoProgressLine.clientWidth + 2;
    const ClickOffsetX = e.offsetX;
    VideoScr.currentTime = (ClickOffsetX / progressWidthvalue) * videoDuration;
    const progressWidth = (VideoScr.currentTime / videoDuration) * 100 + 0.5;
    videoProgressBar.style.width = `${progressWidth}%`;
    const currentVideoTime = VideoScr.currentTime;
    const currentVideoMinute = Math.floor(currentVideoTime / 60);
    let currentVideoSeconds = Math.floor(currentVideoTime % 60);
    // if seconds are less than 10 then add 0 at the beginning
    currentVideoSeconds < 10 ? (currentVideoSeconds = `0${currentVideoSeconds}`) : currentVideoSeconds;
    current.innerHTML = `${currentVideoMinute} : ${currentVideoSeconds}`;
  };

  const pointerDownOnProgressLine = (e) => {
    videoProgressLine.setPointerCapture(e.pointerId);
    setVideoTime(e);
  };

  return (
    <div id="video_player">
      {loading && <Loader />}
      <video
        preload="metadata"
        ref={videoSrc}
        onWaiting={waitingHandler}
        onCanPlay={canPlayHandler}
        onPlay={playVideoHandler}
        onPause={pauseVideoHandler}
        onLoadedData={(e) => loadData(e)}
        onTimeUpdate={(e) => timeupdate(e)}
      >
        <source src="https://res.cloudinary.com/iamdeelesiemmanuel/video/upload/v1660292313/video_dgusnc.mp4" type="video/mp4" />
      </video>
      <div className="videoTime">0:00</div>

      <div className="video_controls">
        <div
          className="video_progress-line"
          onPointerDown={(e) => pointerDownOnProgressLine(e)}
          onPointerMove={setVideoTime}
          onPointerUp={() => {
            videoProgressLine.removeEventListener("pointermove", setVideoTime);
          }}
        >
          <canvas className="video_buffer-bar"></canvas>
          <div className="video_progress-bar">
            <span></span>
          </div>
        </div>
        <Stack direction="row" gap={2} justifyContent="space-between">
          <div className="video_controls-left">
            <span className="icon" onClick={fastRewindHandler}>
              <Replay10 />
            </span>
            <span className="icon" onClick={togglePlayAndPause}>
              {isVideoPaused ? <PauseCircle /> : <PlayCircle />}
            </span>
            <span className="icon" onClick={fastForwardHandler}>
              <Forward10 />
            </span>
            <input ref={volumeRange} onChange={setVolume} type="range" min="0" max="100" className="volume_range" />
            <span className="icon" onClick={muteVideoVolume}>
              {volumeRange.current && generateVolumeIcon(+volumeRange.current.value)}
            </span>
            <div className="timer">
              <span className="current">0:00</span> /<span className="video_duration">0:00</span>
            </div>
          </div>
          <div className="video_controls-right">
            <span className="icon">
              <PictureInPictureAlt />
            </span>
            <span className="icon" onClick={turnFullScreenMode}>
              <Fullscreen />
            </span>
          </div>
        </Stack>
      </div>
    </div>
  );
};
