// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Jayoda Pramuditha - Full-Stack Developer Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Help browsers choose the right color-scheme for default UA styling */}
        <meta name="color-scheme" content="light dark" />
        {/* Set initial theme BEFORE React hydrates to prevent mismatch/FOUC */}
        <script
          // Keep this tiny and side-effect only; no JSX/React code.
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var useDark = stored ? stored === 'dark' : prefersDark;
    var root = document.documentElement;
    if (useDark) root.classList.add('dark'); else root.classList.remove('dark');
  } catch (e) {}
})();`,
          }}
        />
      </head>

      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
