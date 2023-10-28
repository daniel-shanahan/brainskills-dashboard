import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import { prisma } from "./lib/prisma";

export const metadata: Metadata = {
  title: "BrainSkills Dashboard",
  description: "BrainSkills analytics at a glance",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeStudents = await prisma.student.findMany({
    where: {
      BrainskillsSessions: {
        some: {},
      },
    },
  });

  return (
    <html lang="en">
      <body className="flex bg-gray-50 dark:bg-gray-950 text-gray-950 dark:text-gray-50">
        <Sidebar />
        <main className="flex-grow ml-64 relative">
          <SearchBar students={activeStudents} />
          {children}
        </main>
      </body>
    </html>
  );
}
