import "@/app/globals.css";
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";

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
        className={
          fontFamily.variable + " h-screen w-screen text-white bg-neutral-900"
        }
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
