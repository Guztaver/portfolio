import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gustavo Muniz - Terminal Portfolio",
  description:
    "Full Stack Developer | Linux Enthusiast | Problem Solver - Interactive terminal portfolio showcasing skills, experience, and projects",
  keywords: [
    "Gustavo Muniz",
    "Full Stack Developer",
    "Portfolio",
    "Terminal",
    "Linux",
    "React",
    "TypeScript",
    "Next.js",
    "Web Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Gustavo Muniz", url: "https://gustavomuniz.dev" }],
  creator: "Gustavo Muniz",
  publisher: "Gustavo Muniz",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gustavomuniz.dev",
    title: "Gustavo Muniz - Terminal Portfolio",
    description:
      "Full Stack Developer | Linux Enthusiast | Problem Solver - Interactive terminal portfolio",
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
    description: "Full Stack Developer | Linux Enthusiast | Problem Solver",
    creator: "@gustavomunizdev",
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
    canonical: "https://gustavomuniz.dev",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0c0c0c" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
