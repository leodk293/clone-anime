"use client";
import React from "react";
import Logo from "./logo/Logo";
import Link from "next/link";
import google from "../assets/google-logo.png";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Nav() {
  const { status, data: session } = useSession();
  //console.log(status, session);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };
  const handelSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <header className=" z-50 flex flex-wrap gap-5 justify-center py-5 bg-[#26252c] md:justify-evenly md:gap-0">
      <div className=" self-center">
        <Logo />
      </div>

      <nav className=" self-center text-xl flex flex-row gap-10 font-bold text-white">
        <Link
          className=" underline-offset-4 hover:underline hover:text-blue-800 duration-300"
          href={"/"}
        >
          Anime
        </Link>
        <Link
          className=" underline-offset-4 hover:underline hover:text-blue-800 duration-300"
          href={"/manga"}
        >
          Manga
        </Link>
        <Link
          className=" underline-offset-4 hover:underline hover:text-blue-800 duration-300"
          href={"/characters"}
        >
          Characters
        </Link>
      </nav>

      <div className=" self-center flex flex-wrap gap-2">
        {status === "unauthenticated" ? (
          <button
            onClick={handelSignIn}
            className=" flex flex-row gap-2 justify-center items-center text-black font-semibold text-xl border border-transparent bg-white text-wrap rounded-[50px] px-3 py-1 hover:bg-gray-200 duration-300"
          >
            <Image
              src={google}
              alt="GOOGLE"
              width={30}
              height={30}
              className=" object-cover"
            />
            <p>Sign in</p>
          </button>
        ) : (
          <div className=" flex flex-wrap justify-center gap-2">
            <button
              className=" font-semibold text-xl text-white border border-transparent bg-indigo-800 text-wrap rounded-[50px] px-3 py-1 hover:bg-blue-900 duration-300"
              onClick={handleSignOut}
            >
              Sign out
            </button>
            <div className=" self-center border border-gray-300 px-2 py-1 rounded-[50px] flex flex-row gap-1">
              {session?.user && (
                <Image
                  src={session?.user?.image && session.user.image}
                  alt={session?.user?.name ? session?.user?.name : "User name"}
                  width={35}
                  height={20}
                  className="object-cover rounded-[50%]"
                />
              )}

              <p className="text-white text-[13px] self-center font-semibold">
                {session?.user?.name}
              </p>
            </div>
          </div>
        )}
        <Link href={"/comments"}>
          <button className=" flex flex-row gap-1 justify-center items-center text-white font-semibold text-xl border border-transparent bg-blue-800 text-wrap rounded-[50px] px-3 py-2">
            <MessageCircle color="#ffffff" />
            <p className=" self-center">comment</p>
          </button>
        </Link>
      </div>
    </header>
  );
}
