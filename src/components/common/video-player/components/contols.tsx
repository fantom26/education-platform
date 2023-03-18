import { FC, SyntheticEvent, useState } from "react";

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
import { Button, Grid, IconButton, Popover, Slider, Stack, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const ProgressBar = styled(Slider)({
  height: 5,
  "& .MuiSlider-track": {
    border: "none"
  },
  "& .MuiSlider-thumb": {
    height: 16,
    width: 16,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit"
    },
    "&:before": {
      display: "none"
    }
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)"
    },
    "& > *": {
      transform: "rotate(45deg)"
    }
  }
});

interface ControlsProps {
  rewind: () => void;
  fastForward: () => void;
  playandpause: () => void;
  playing: boolean;
  volumeChange: (event: Event, value: number | Array<number>, activeThumb: number) => void;
  volumeSeek: (event: SyntheticEvent | Event, value: number | Array<number>) => void;
  onSeek: (event: Event, value: number | Array<number>, activeThumb: number) => void;
  volume: number;
  muting: () => void;
  fullScreenMode: () => void;
  playedTime: string;
  played: number;
  fullMovieTime: string;
  playerbackRate: number;
  playRate: (rate: number) => void;
  onSeekMouseDown: () => void;
  onSeekMouseUp: (event: SyntheticEvent | Event, value: number | Array<number>) => void;
}

export const Controls: FC<ControlsProps> = (props) => {
  const {
    rewind,
    fastForward,
    playandpause,
    playing,
    volumeChange,
    volumeSeek,
    muting,
    fullScreenMode,
    volume,
    played,
    onSeek,
    playedTime,
    onSeekMouseUp,
    fullMovieTime,
    playRate,
    onSeekMouseDown,
    playerbackRate
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  // TODO replace any
  const handlePopOver = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  // TODO replace any
  const ValueLabelComponent = (children: any, value: any) => (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  // eslint-disable-next-line no-undefined
  const id = open ? "playbackrate-popover" : undefined;

  const generateVolumeIcon = (volume: number) => {
    const volumeInt = volume * 100;
    if (volumeInt === 0) {
      return <VolumeOff />;
    } else if (volumeInt < 39) {
      return <VolumeMute />;
    } else if (volumeInt > 38 && volumeInt < 79) {
      return <VolumeDown />;
    } else {
      return <VolumeUp />;
    }
  };

  return (
    <div className="video_controls">
      <ProgressBar
        min={0}
        max={100}
        value={played}
        onChange={onSeek}
        onMouseDown={onSeekMouseDown}
        onChangeCommitted={onSeekMouseUp}
        valueLabelDisplay="auto"
        // components={{
        //   ValueLabel: ValueLabelComponent
        // }}
      />
      <Stack direction="row" gap={2} justifyContent="space-between">
        <div className="video_controls-left">
          <IconButton onClick={rewind}>
            <Replay10 />
          </IconButton>
          <IconButton onClick={playandpause}>{playing ? <PauseCircle /> : <PlayCircle />}</IconButton>
          <IconButton onClick={fastForward}>
            <Forward10 />
          </IconButton>
          <Slider min={0} max={100} value={volume * 100} onChange={volumeChange} onChangeCommitted={volumeSeek} />

          <IconButton onClick={muting}>{generateVolumeIcon(volume)}</IconButton>
          <div className="timer">
            <span>{playedTime}</span> /<span>{fullMovieTime}</span>
          </div>
        </div>
        <div className="video_controls-right">
          <Button variant="text" onClick={handlePopOver}>
            <Typography>{playerbackRate}X</Typography>
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
          >
            <Grid container direction="column-reverse">
              {[0.5, 1, 1.5, 2].map((rate) => (
                <Button key={rate} variant="text" onClick={() => playRate(rate)}>
                  <Typography color={rate === playerbackRate ? "secondary" : "default"}>{rate}</Typography>
                </Button>
              ))}
            </Grid>
          </Popover>
          <IconButton>
            <PictureInPictureAlt />
          </IconButton>
          <IconButton onClick={fullScreenMode}>
            <Fullscreen />
          </IconButton>
        </div>
      </Stack>
    </div>
  );
};
