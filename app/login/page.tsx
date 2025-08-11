"use client";

import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function Login() {
  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "spotify",
    });
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-12">
      <Image
        alt="spotify logo"
        height={96}
        src="https://res.cloudinary.com/drnu1myuq/image/upload/v1754937393/spotify_logo_xmxgc6.png"
        width={320}
      />
      <button
        className="flex cursor-pointer rounded-full bg-green-600 px-12 py-2 text-lg uppercase tracking-widest hover:bg-opacity-80 focus:outline-none"
        onClick={handleLogin}
        type="button"
      >
        Login
      </button>
    </div>
  );
}
