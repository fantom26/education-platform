export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;

  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};
