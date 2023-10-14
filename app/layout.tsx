import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";

export const metadata: Metadata = {
  title: "BrainSkills Dashboard",
  description: "BrainSkills analytics at a glance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <main className="flex-grow ml-64 relative">
          <SearchBar />
          {children}
        </main>
      </body>
    </html>
  );
}
