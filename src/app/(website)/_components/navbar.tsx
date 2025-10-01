import React from "react";
import { Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const LandingPageNavBar = () => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="text-3xl font-semibold flex items-center gap-x-3">
        <Menu className="w-6 h-6" />
        <Image alt="logo" src="/opal-logo.png" width={80} height={40} />
      </div>

      <div className="hidden gap-x-10 items-center lg:flex">
        <Link
          href="/"
          className="bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320DD]/80"
        >
          Home
        </Link>
        <Link href="/">Pricing</Link>
        <Link href="/">Contact</Link>
      </div>

      <Link href="/auth/sign-in">
        <Button className="bg-white text-black text-base hover:cursor-pointer flex gap-x-2">
          <User fill="#000" />
          Login
        </Button>
      </Link>
    </div>
  );
};

export default LandingPageNavBar;
