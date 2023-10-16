"use client";

import Select from "react-select";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Student } from "./common.types";

type Props = {
  students: Student[];
};

export default function SearchBar({ students }: Props) {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between px-4 py-2 w-3/4">
      <div className="flex-grow">
        <Select
          options={students.map((student) => ({
            value: student.id,
            label: `${student.firstName} ${student.lastName}`,
          }))}
          unstyled
          placeholder="Search for a student..."
          isClearable
          noOptionsMessage={() => "No students found"}
          classNames={{
            control: ({ isFocused }) =>
              clsx(
                "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md border",
                isFocused
                  ? "border-blue-500"
                  : "border-gray-50 dark:border-gray-950"
              ),
            menu: () =>
              "p-1 mt-2 bg-gray-200 dark:bg-gray-700 rounded border border-white dark:border-gray-800 shadow-md",
            option: ({ isFocused }) =>
              clsx(
                isFocused && "bg-white dark:bg-gray-800",
                "hover:cursor-pointer px-3 py-2 rounded"
              ),
          }}
          onChange={(student) => {
            if (!student) return;
            router.push(`/students/${student?.value}`);
          }}
        />
      </div>
    </nav>
  );
}
