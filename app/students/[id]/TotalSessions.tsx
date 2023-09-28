import type { BrainskillsSession } from "@/app/common.types";
import { getActivePercentage, getBgColor, secondsToTime } from "@/app/utils";

type Props = {
  sessions: BrainskillsSession[];
};

export default async function TotalSessions({ sessions }: Props) {
  const { totalSeconds, completedSeconds, rounds } = sessions.reduce(
    (acc, curr) => {
      acc.totalSeconds += curr.totalSeconds;
      acc.completedSeconds += curr.completedSeconds;
      acc.rounds += curr.rounds;
      return acc;
    },
    {
      totalSeconds: 0,
      completedSeconds: 0,
      rounds: 0,
    }
  );

  const totalTime = secondsToTime(totalSeconds);
  const completedTime = secondsToTime(completedSeconds);
  const activePercentage = getActivePercentage(totalSeconds, completedSeconds);
  const bgColor = getBgColor(activePercentage);

  return (
    <div
      className={`flex flex-row items-center gap-10 mx-auto p-5 mt-10 mb-2 rounded-md shadow-md text-lg text-center w-fit ${bgColor}`}
    >
      <div className="flex flex-col">
        <p>Total Time</p>
        <p>{totalTime}</p>
      </div>
      <div className="flex flex-col">
        <p>Completed Time</p>
        <p>{completedTime}</p>
      </div>
      <div className="flex flex-col">
        <p>Rounds</p>
        <p>{rounds}</p>
      </div>
      <div className="flex flex-col font-semibold">
        <p>Active</p>
        <p className="text-xl">{activePercentage}%</p>
      </div>
    </div>
  );
}
