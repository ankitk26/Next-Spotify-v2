import "@/app/globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const fontFamily = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Login with Spotify",
  description: "Login page to authenticate through Spotify",
};

export default function LoginPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontFamily.variable} h-screen w-screen bg-neutral-900 text-white`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
