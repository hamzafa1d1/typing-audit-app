import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Typerr | Master the keyboard without opening an app",
  description: "Typerr is a desktop app that runs in the background to improve your English typing and vocabulary through real-time interception and audits. Passive improvement while you actually work.",
  keywords: [
    "Passive typing tutor",
    "Real-time typing audit",
    "Improve typing speed while working",
    "Desktop typing assistant"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
