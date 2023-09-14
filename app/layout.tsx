import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavMenu from "./NavMenu";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`min-h-screen bg-gray-50 ${inter.className}`}>
        <NavMenu />
        <main className="p-32 mx-auto bg-gray-300 pt-12">{children}</main>
      </body>
    </html>
  );
}
