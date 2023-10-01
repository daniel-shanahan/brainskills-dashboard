import type { StudentSessionTotals } from "@/app/common.types";
import { getBgColor, secondsToTime } from "@/app/utils";

type Props = {
  totals: StudentSessionTotals;
  displayName: boolean;
  className?: string;
};

export default async function SessionTotals({
  totals,
  displayName,
  className,
}: Props) {
  const { totalSeconds, completedSeconds, rounds, activePercentage } = totals;
  const totalTime = secondsToTime(totalSeconds);
  const completedTime = secondsToTime(completedSeconds);
  const bgColor = getBgColor(activePercentage);

  return (
    <div
      className={`rounded-md shadow-md text-lg text-center w-fit ${bgColor} ${
        className ? className : ""
      }`}
    >
      {displayName && (
        <p className="font-semibold text-xl text-left pb-1">
          {totals.student.firstName} {totals.student.lastName}
        </p>
      )}
      <div className="flex flex-row gap-10">
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
    </div>
  );
}
