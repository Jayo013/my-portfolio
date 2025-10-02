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
        {/* ensure the initial theme is set before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const mql = window.matchMedia('(prefers-color-scheme: dark)');
                const stored = localStorage.getItem('theme');
                const dark = stored ? stored === 'dark' : mql.matches;
                if (dark) document.documentElement.classList.add('dark');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
