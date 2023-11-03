import type { StudentSessionTotals } from "@/app/common.types";
import { getActiveTextColor, secondsToTime } from "@/app/utils";
import clsx from "clsx";

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

  return (
    <div
      className={clsx(
        "rounded-md shadow-md text-lg text-center w-fit bg-gray-50 dark:bg-gray-800",
        className ? className : ""
      )}
    >
      {displayName && (
        <p className="font-semibold text-xl text-left pb-1">
          {totals.student.firstName} {totals.student.lastName}
        </p>
      )}
      <div className="flex flex-row gap-10">
        <div className="flex flex-col w-[68px]">
          <p>Total</p>
          <p>{totalTime}</p>
        </div>
        <div className="flex flex-col">
          <p>Completed</p>
          <p>{completedTime}</p>
        </div>
        <div className="flex flex-col">
          <p>Rounds</p>
          <p>{rounds}</p>
        </div>
        <div
          className={clsx(
            "flex flex-col font-semibold",
            getActiveTextColor(activePercentage)
          )}
        >
          <p>Active</p>
          <p className="text-xl">{activePercentage}%</p>
        </div>
      </div>
    </div>
  );
}
