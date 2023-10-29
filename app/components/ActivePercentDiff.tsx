import { StudentSessionDiff } from "../common.types";
import { secondsToTime } from "@/app/utils";
import clsx from "clsx";

type Props = {
  sessionDiff: StudentSessionDiff;
  className?: string;
};

function getTextColorDiff(diff: number) {
  if (diff > 15) {
    return "text-green-700";
  } else if (diff > 10) {
    return "text-green-600";
  } else if (diff >= 5) {
    return "text-green-500";
  } else if (diff < 5 && diff > -5) {
    return "text-gray-50";
  } else if (diff > -10) {
    return "text-red-500";
  } else if (diff > -15) {
    return "text-red-600";
  } else {
    return "text-red-700";
  }
}

export default async function ActivePercentDiff({
  sessionDiff,
  className,
}: Props) {
  const { completedSeconds, rounds, activeDiff } = sessionDiff;
  const completedTime = secondsToTime(completedSeconds);

  return (
    <div
      className={clsx(
        "rounded-md shadow-md text-lg text-center w-fit bg-gray-50 dark:bg-gray-800",
        className ? className : ""
      )}
    >
      <p className="font-semibold text-xl text-left pb-1">
        {sessionDiff.student.firstName} {sessionDiff.student.lastName}
      </p>
      <div className="flex flex-row gap-10">
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
            getTextColorDiff(activeDiff)
          )}
        >
          <p>Active Diff.</p>
          <p className="text-xl">
            {activeDiff > 0 && "+"}
            {activeDiff}%
          </p>
        </div>
      </div>
    </div>
  );
}
