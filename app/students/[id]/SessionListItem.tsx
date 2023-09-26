import type { BrainskillsSession } from "@/app/common.types";
import { getActivePercentage, getBgColor, secondsToTime } from "@/app/utils";

export async function SessionListItem({
  brainskillsSession,
}: {
  brainskillsSession: BrainskillsSession;
}) {
  const { startTime, rounds, totalSeconds, completedSeconds } =
    brainskillsSession;
  const activePercentage = getActivePercentage(totalSeconds, completedSeconds);
  const bgColor = getBgColor(activePercentage);

  return (
    <div
      className={`flex flex-row items-center justify-between gap-8 px-5 py-3 border rounded-md shadow-sm text-md text-center ${bgColor}`}
    >
      <div className="flex flex-col w-36">
        <p>{startTime.toDateString()}</p>
        <p className="text-sm">{startTime.toLocaleTimeString()}</p>
      </div>
      <div className="flex flex-col">
        <p>Total Time</p>
        <p>{secondsToTime(totalSeconds)}</p>
      </div>
      <div className="flex flex-col">
        <p>Completed</p>
        <p>{secondsToTime(completedSeconds)}</p>
      </div>
      <div className="flex flex-col">
        <p>Rounds</p>
        <p>{rounds}</p>
      </div>
      <div className="flex flex-col font-semibold">
        <p>Active</p>
        <p className="text-lg">{activePercentage}%</p>
      </div>
    </div>
  );
}
