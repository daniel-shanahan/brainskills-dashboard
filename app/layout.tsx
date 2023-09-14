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
        <main className="mx-auto pt-6 lg:pt-10">{children}</main>
      </body>
    </html>
  );
}
