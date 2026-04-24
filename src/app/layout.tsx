import type { Metadata, Viewport } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/shared/ThemeProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  colorScheme: "dark",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: {
    default: "Samiu's Portfolio",
    template: "%s | Samiu's Portfolio",
  },
  description: "Full-stack engineer and product builder. Specializing in modern web applications, scalable systems, and exceptional user experiences.",
  keywords: [
    "portfolio",
    "full-stack developer",
    "React",
    "Next.js",
    "TypeScript",
    "web development",
    "software engineer",
  ],
  authors: [{ name: "Samiu", url: "https://your-portfolio.com" }],
  creator: "Samiu",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-portfolio.com",
    title: "Samiu's Portfolio",
    description: "Full-stack engineer and product builder",
    siteName: "Samiu's Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samiu's Portfolio",
    description: "Full-stack engineer and product builder",
    creator: "@your_twitter_handle",
  },
  verification: {
    google: "your-google-verification-code",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
