// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import { PROFILE } from "@/data/Portfolio";
import { SITE_URL } from "@/lib/site";
import IntroLoader from "@/component/shared/IntroLoader";
import CustomCursor from "@/component/shared/CustomCursor";
import AmbientParticles from "@/component/shared/AmbientParticles";
import "./globals.css";

const geistSans = GeistSans;
const geistMono = GeistMono;

const orbitron = localFont({
  variable: "--font-orbitron",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  src: [
    { path: "../fonts/orbitron-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/orbitron-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/orbitron-700.woff2", weight: "700", style: "normal" },
    { path: "../fonts/orbitron-800.woff2", weight: "800", style: "normal" },
    { path: "../fonts/orbitron-900.woff2", weight: "900", style: "normal" },
  ],
});

const rajdhani = localFont({
  variable: "--font-rajdhani",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  src: [
    { path: "../fonts/rajdhani-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/rajdhani-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/rajdhani-700.woff2", weight: "700", style: "normal" },
  ],
});

const TITLE = `${PROFILE.name} — ${PROFILE.role}`;
const DESCRIPTION = PROFILE.tagline;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s — ${PROFILE.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Jayoda Pramuditha",
    "Full-Stack Developer",
    "Cloud Engineer",
    "DevOps Engineer",
    "AI Integration",
    "React Developer",
    "Next.js Developer",
    "Software Engineer Sri Lanka",
  ],
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: `${PROFILE.name} — Portfolio`,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/avatar.jpg", width: 910, height: 1280, alt: PROFILE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/avatar.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f8" },
    { media: "(prefers-color-scheme: dark)", color: "#050510" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  jobTitle: PROFILE.role,
  description: PROFILE.tagline,
  url: SITE_URL,
  image: `${SITE_URL}/avatar.jpg`,
  email: PROFILE.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: PROFILE.location,
  },
  sameAs: [PROFILE.github, PROFILE.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Set initial theme BEFORE React hydrates to avoid mismatches/FoUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var useDark = stored ? stored === 'dark' : true;
    var root = document.documentElement;
    if (useDark) root.classList.add('dark'); else root.classList.remove('dark');
  } catch (e) {}
})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* Skip the intro loader instantly (before paint) if it already played this session */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    if (sessionStorage.getItem('intro-shown') === '1') {
      document.documentElement.setAttribute('data-intro-skip', '1');
    }
  } catch (e) {}
})();`,
          }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${rajdhani.variable} min-h-screen bg-background text-foreground antialiased`}>
        <IntroLoader />
        <AmbientParticles />
        <CustomCursor />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
