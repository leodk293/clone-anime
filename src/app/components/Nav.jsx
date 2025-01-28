import React from "react";
import Logo from "./logo/Logo";
import Link from "next/link";
import google from "../assets/google-logo.png";
import Image from "next/image";

export default function Nav() {
  return (
    <header className=" flex flex-wrap gap-5 justify-center py-5 bg-[#26252c] md:justify-evenly md:gap-0">
      <Logo />

      <nav className=" self-center text-xl flex flex-row gap-4 font-semibold text-white">
        <Link href={""}>List</Link>
        <Link href={""}>Home</Link>
        <Link href={""}>Upcoming</Link>
      </nav>

      <Link className=" text-xl font-semibold self-center text-white" href={""}>
        Characters
      </Link>

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
