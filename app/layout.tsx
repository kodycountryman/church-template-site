import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { brand } from "@/lib/brand";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${brand.longName} — ${brand.tagline}`,
    template: `%s — ${brand.longName}`,
  },
  description: brand.description,
  metadataBase: new URL("https://kindred.church"),
  openGraph: {
    type: "website",
    siteName: brand.longName,
    title: `${brand.longName} — ${brand.tagline}`,
    description: brand.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        {children}
      </body>
    </html>
  );
}
