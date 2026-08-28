export function formatDurationHms(totalSeconds: number) {
  const pad = (value: number) => String(value).padStart(2, "0");
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
