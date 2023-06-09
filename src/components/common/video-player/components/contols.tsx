import { FC, MouseEvent, SyntheticEvent, useState } from "react";

import { Forward10, Fullscreen, PauseCircle, PictureInPictureAlt, PlayCircle, Replay10 } from "@mui/icons-material";
import { Button, Grid, IconButton, Popover, Slider, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { playerbackRates } from "utils/enums";
import { generateVolumeIcon } from "utils/helper";

const ProgressBar = styled(Slider)({
  height: 5,
  width: "calc(100% - 10px)",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  "& .MuiSlider-track": {
    border: "none"
  },
  "& .MuiSlider-thumb": {
    height: 12,
    width: 12,
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

const VolumeBar = styled(Slider)({
  height: 5,
  "& .MuiSlider-track": {
    border: "none",
    backgroundColor: "#fff"
  },
  "& .MuiSlider-thumb": {
    height: 12,
    width: 12,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit"
    },
    "&:before": {
      display: "none"
    }
  }
});

const VolumeWrapper = styled("div")({
  display: "flex",
  alignItems: "center",

  gap: 5,
  "& > .range": {
    width: "0%",
    maxWidth: "100px",
    opacity: "0",
    visibility: "hidden",
    transition: "width 0.3s, opacity 0.3s, visibility 0.3s"
  },
  "&:hover > .range": {
    width: "100%",
    opacity: "1",
    visibility: "visible",
    transition: "width 0.3s, opacity 0.3s, visibility 0.3s"
  }
});

const ControlsStyled = styled("div")({
  position: "absolute",
  left: "0",
  right: "0",
  bottom: "0",
  zIndex: "5",
  backgroundColor: "rgb(0 0 0 / 29%)",
  boxShadow: "0 0 40px 10px rgb(0 0 0 / 25%)"
});

interface ControlsProps {
  playing: boolean;
  volume: number;
  playedTime: string;
  played: number;
  fullMovieTime: string;
  playerbackRate: number;
  rewind: () => void;
  fastForward: () => void;
  playandpause: () => void;
  volumeChange: (event: Event, value: number | Array<number>) => void;
  volumeSeek: (event: SyntheticEvent | Event, value: number | Array<number>) => void;
  onSeek: (event: Event, value: number | Array<number>) => void;
  muting: () => void;
  fullScreenMode: () => void;
  onPip: () => void;
  playRate: (rate: number) => void;
  onSeekMouseDown: () => void;
  onSeekMouseUp: (event: SyntheticEvent | Event, value: number | Array<number>) => void;
}

export const Controls: FC<ControlsProps> = (props) => {
  const {
    playing,
    volume,
    played,
    playedTime,
    fullMovieTime,
    playerbackRate,
    rewind,
    fastForward,
    playandpause,
    volumeChange,
    volumeSeek,
    muting,
    fullScreenMode,
    onPip,
    onSeek,
    onSeekMouseUp,
    playRate,
    onSeekMouseDown
  } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handlePopOver = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  // eslint-disable-next-line no-undefined
  const id = open ? "playbackrate-popover" : undefined;

  return (
    <ControlsStyled>
      <ProgressBar min={0} max={100} value={played} onChange={onSeek} onMouseDown={onSeekMouseDown} onChangeCommitted={onSeekMouseUp} />
      <Stack direction="row" gap={{ xs: 1, md: 2 }} justifyContent="space-between">
        <Stack direction="row" alignItems="center">
          <IconButton size="small" onClick={rewind}>
            <Replay10 style={{ color: "white" }} />
          </IconButton>
          <IconButton size="small" onClick={playandpause}>
            {playing ? <PauseCircle style={{ color: "white" }} /> : <PlayCircle style={{ color: "white" }} />}
          </IconButton>
          <IconButton size="small" onClick={fastForward}>
            <Forward10 style={{ color: "white" }} />
          </IconButton>
          <div style={{ color: "white" }}>
            <span>{playedTime}</span> /<span>{fullMovieTime}</span>
          </div>
          <VolumeWrapper sx={{ flexDirection: { xs: "column-reverse", md: "row" }, width: { xs: "34px", md: "150px" } }}>
            <IconButton size="small" onClick={muting} style={{ color: "white" }}>
              {generateVolumeIcon(volume)}
            </IconButton>
            <VolumeBar
              min={0}
              max={100}
              value={volume * 100}
              onChange={volumeChange}
              onChangeCommitted={volumeSeek}
              className="range"
              sx={{
                position: { xs: "absolute", md: "relative" },
                bottom: { xs: "60px", md: "initial" },
                transform: { xs: "rotate(-90deg)", md: "initial" }
              }}
            />
          </VolumeWrapper>
        </Stack>
        <div>
          <Button variant="text" onClick={handlePopOver} sx={{ minWidth: "40px" }}>
            <Typography style={{ color: "white" }}>{playerbackRate}X</Typography>
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
              {Object.values(playerbackRates).map((rate) => (
                <Button key={rate} variant="text" onClick={() => playRate(rate)}>
                  <Typography color={rate === playerbackRate ? "info.main" : "primary.main"}>{rate}X</Typography>
                </Button>
              ))}
            </Grid>
          </Popover>
          <IconButton size="small" onClick={onPip}>
            <PictureInPictureAlt style={{ color: "white" }} />
          </IconButton>
          <IconButton size="small" onClick={fullScreenMode}>
            <Fullscreen style={{ color: "white" }} />
          </IconButton>
        </div>
      </Stack>
    </ControlsStyled>
  );
};
