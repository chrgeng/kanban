import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Planka — Product board",
  description: "A focused, beautiful Kanban board for moving work forward.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

