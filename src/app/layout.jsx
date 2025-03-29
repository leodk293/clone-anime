import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Link from "next/link";
import { NextAuthProvider } from "./Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Clone-Anime",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <Nav />

          <div className=" flex flex-col">
            <nav className=" py-5 text-gray-700 font-bold flex flex-wrap justify-center gap-7 md:gap-10 md:text-xl">
              <Link className={"hover:text-blue-500 duration-300"} href={"/"}>
                List
              </Link>
              <Link
                className={"hover:text-blue-500 duration-300"}
                href={"/airing"}
              >
                Airing
              </Link>
              <Link
                className={"hover:text-blue-500 duration-300"}
                href={"/upcoming"}
              >
                Upcoming
              </Link>
              <Link
                className={"hover:text-blue-500 duration-300"}
                href={"/popular"}
              >
                Popular
              </Link>
              <Link
                className={"hover:text-blue-500 duration-300"}
                href={"/top"}
              >
                Top
              </Link>
            </nav>
            <span className=" w-full h-[1px] bg-gray-400 " />
          </div>

          <div className=" mx-4 mt-10 m-auto">{children}</div>

          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
