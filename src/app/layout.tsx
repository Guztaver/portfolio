import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gustavo Muniz - Terminal Portfolio",
  description:
    "Backend Developer | Linux Enthusiast | Problem Solver - Interactive terminal portfolio showcasing skills, experience, and projects",
  keywords: [
    "Gustavo Muniz",
    "Backend Developer",
    "Portfolio",
    "Terminal",
    "Linux",
    "React",
    "TypeScript",
    "Next.js",
    "Web Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Gustavo Muniz", url: "https://gustavoanjos.com" }],
  creator: "Gustavo Muniz",
  publisher: "Gustavo Muniz",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gustavoanjos.com",
    title: "Gustavo Muniz - Terminal Portfolio",
    description:
      "Backend Developer | Linux Enthusiast | Problem Solver - Interactive terminal portfolio",
    siteName: "Gustavo Muniz Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gustavo Muniz - Terminal Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gustavo Muniz - Terminal Portfolio",
    description: "Backend Developer | Linux Enthusiast | Problem Solver",
    creator: "@gustavo404",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://gustavoanjos.com",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/icon.svg",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0c0c0c" />
        <meta name="color-scheme" content="dark" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className="antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
