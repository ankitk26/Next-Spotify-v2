import Header from "@/components/header";
import QueryClientProvider from "@/providers/query-client-provider";
import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";
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
          className={`${sansFont.variable} ${monoFont.variable} antialiased bg-black h-screen`}
        >
          <div className="flex flex-col h-full">
            <Header />
            <MainContent>{children}</MainContent>
          </div>
        </body>
      </QueryClientProvider>
    </html>
  );
}
