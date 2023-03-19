import { VolumeDown, VolumeMute, VolumeOff, VolumeUp } from "@mui/icons-material";

export const generateVolumeIcon = (volume: number) => {
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
