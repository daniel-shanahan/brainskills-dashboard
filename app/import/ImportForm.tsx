"use client";

import Papa from "papaparse";

export default function ImportForm() {
  async function timeToSeconds(time: string) {
    const [hours, minutes, seconds] = time.split(":");
    return +hours * 3600 + +minutes * 60 + +seconds;
  }

  async function updateData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const studentFile = formData.get("student-file") as File;
    const sessionFile = formData.get("session-file") as File;

    updateStudents(studentFile);

    Papa.parse(sessionFile, {
      skipEmptyLines: true,
      header: true,
      complete: (results) => {
        results.data.pop();

        results.data.map(async (row: any) => {
          const body = {
            studentId: row["User ID"],
            startTime: new Date(row["Date"]),
            rounds: +row["Rounds"],
            totalSeconds: await timeToSeconds(row["Total Time"]),
            completedSeconds: await timeToSeconds(row["Completed Time"]),
          };

          // Call API to create session
          await fetch("/api/brainskills-session", {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          });
        });
      },
    });
  }

  async function updateStudents(studentFile: File) {
    Papa.parse(studentFile, {
      skipEmptyLines: true,
      header: true,
      complete: (results) => {
        results.data.map(async (row: any) => {
          const body = {
            firstName: row["First Name"],
            lastName: row["Last Name"],
            id: row["User ID"],
          };

          // Call API to create student
          await fetch("/api/student", {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          });
        });
      },
    });
  }

  return (
    <form
      className="flex flex-col items-center justify-center py-10"
      onSubmit={updateData}
    >
      <label className="text-xl font-semibold mb-2" htmlFor="student-file">
        Student login list
      </label>
      <input className="mb-4" type="file" name="student-file" accept=".csv" />
      <label className="text-xl font-semibold mb-2" htmlFor="session-file">
        Exercise report
      </label>
      <input className="mb-4" type="file" name="session-file" accept=".csv" />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-200"
        type="submit"
      >
        Import
      </button>
    </form>
  );
}
