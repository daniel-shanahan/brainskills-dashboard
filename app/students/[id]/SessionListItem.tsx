import type { BrainskillsSession } from "@/app/common.types";
import {
  getActivePercentage,
  getActiveColor,
  secondsToTime,
} from "@/app/utils";
import clsx from "clsx";

export async function SessionListItem({
  brainskillsSession,
}: {
  brainskillsSession: BrainskillsSession;
}) {
  const { startTime, rounds, totalSeconds, completedSeconds } =
    brainskillsSession;
  const activePercentage = getActivePercentage(totalSeconds, completedSeconds);
  const textColor = `text-${getActiveColor(activePercentage)}`;

  return (
    <div className="flex flex-row items-center justify-between gap-8 px-5 py-3 rounded-md shadow-sm text-md text-center bg-gray-50 dark:bg-gray-800">
      <div className="flex flex-col w-36">
        <p>{startTime.toDateString()}</p>
        <p className="text-sm">{startTime.toLocaleTimeString()}</p>
      </div>
      <div className="flex flex-col">
        <p>Total</p>
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
      <div className={clsx("flex flex-col font-semibold", textColor)}>
        <p>Active</p>
        <p className="text-lg">{activePercentage}%</p>
      </div>
    </div>
  );
}
