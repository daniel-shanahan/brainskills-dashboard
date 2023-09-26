export function secondsToTime(seconds: number) {
  const hoursStr = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutesStr = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const secsStr = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${hoursStr}:${minutesStr}:${secsStr}`;
}

export function getActivePercentage(
  totalSeconds: number,
  completedSeconds: number
) {
  return Math.round((completedSeconds / totalSeconds) * 100);
}

export function getBgColor(activePercentage: number) {
  if (activePercentage >= 80) {
    return "bg-green-400";
  } else if (activePercentage >= 70) {
    return "bg-white";
  } else if (activePercentage >= 60) {
    return "bg-yellow-400";
  } else if (activePercentage >= 50) {
    return "bg-red-400";
  } else {
    return "bg-red-600";
  }
}
