"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function Login() {
  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "spotify",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-12">
      <Image
        src="https://res.cloudinary.com/drnu1myuq/image/upload/v1754937393/spotify_logo_xmxgc6.png"
        alt="spotify logo"
        width={320}
        height={96}
      />
      <button
        className="flex cursor-pointer px-12 py-2 text-lg tracking-widest uppercase rounded-full focus:outline-none bg-green-600 hover:bg-opacity-80"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
