import React from "react";
import Logo from "./logo/Logo";
import Link from "next/link";
import google from "../assets/google-logo.png";
import Image from "next/image";

export default function Nav() {
  return (
    <header className=" z-50 flex flex-wrap gap-5 justify-center py-5 bg-[#26252c] md:justify-evenly md:gap-0">
      <Logo />

      <nav className=" self-center text-xl flex flex-row gap-10 font-bold text-white">
        <Link className=" underline-offset-4 hover:underline hover:text-orange-800 duration-300" href={"/"}>Anime</Link>
        <Link className=" underline-offset-4 hover:underline hover:text-orange-800 duration-300" href={"/manga"}>Manga</Link>
        <Link className=" underline-offset-4 hover:underline hover:text-orange-800 duration-300" href={"/characters"}>Characters</Link>
      </nav>

      <button className=" flex flex-row gap-2 justify-center items-center text-white font-semibold text-xl border border-transparent bg-red-700 text-wrap rounded-[50px] px-4 py-2">
        <Image
          src={google}
          alt="GOOGLE"
          width={30}
          height={30}
          className=" object-cover"
        />
        <p>Login</p>
      </button>
    </header>
  );
}
