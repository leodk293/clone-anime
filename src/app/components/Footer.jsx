import React from "react";
import { Twitter, Linkedin, Facebook } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" relative bottom-0 mt-10 border-t-2 border-t-gray-400 py-10 flex flex-col gap-4 items-center">
      <div className=" flex flex-wrap gap-4 justify-center">
        <div className=" border border-transparent bg-black rounded-[50%] p-3">
          <Twitter size={23} color="#ffffff" strokeWidth={1.5} />
        </div>
        <div className=" border border-transparent bg-black rounded-[50%] p-3">
          <Facebook size={23} color="#ffffff" strokeWidth={1.5} />
        </div>
        <div className=" border border-transparent bg-black rounded-[50%] p-3">
          <Linkedin size={23} color="#ffffff" strokeWidth={1.5} />
        </div>
      </div>
      <p className=" uppercase text-xl">contact</p>
      <p className=" font-semibold">Be aware of the best anime of the moment</p>
    </footer>
  );
}
