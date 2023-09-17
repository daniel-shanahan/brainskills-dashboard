"use client";

import Papa from "papaparse";

export default function ImportForm() {
  async function updateData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const studentFile = formData.get("student-file") as File;
    //const sessionFile = formData.get("session-file") as File;

    updateStudents(studentFile);

    /* Papa.parse(sessionFile, {
      skipEmptyLines: true,
      header: true,
      complete: (results) => {
        results.data.pop();
        console.log(results.data);
      },
    }); */
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
