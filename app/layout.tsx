import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";
import Header from "@/components/header";
import QueryClientProvider from "@/providers/query-client-provider";
import "./globals.css";
import MainContent from "./main-content";

const sansFont = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
});

const monoFont = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextSpotify",
  description: "Spotify clone version built using Nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryClientProvider>
        <body
          className={`${sansFont.variable} ${monoFont.variable} h-screen bg-black antialiased`}
        >
          <div className="flex h-full flex-col">
            <Header />
            <MainContent>{children}</MainContent>
          </div>
        </body>
      </QueryClientProvider>
    </html>
  );
}
