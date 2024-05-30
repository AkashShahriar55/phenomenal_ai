"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Logo from "./logo";
import React, { useState } from 'react';

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  const router = useRouter()
  const pathname = usePathname();
  console.log(pathname)
  const getNavComponent = () => {
    if (pathname.startsWith('/generate')) { // Updated condition
      return <GenerateNavBar router={router} />;
    } else if (pathname.startsWith('/')) {
      return <HomeNavBar router={router} />;
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center animation-slide-down ${scrolled
          ? "bg-black/50 backdrop-blur-xl"
          : "bg-black/0"
          } z-30 transition-all`}
      >
        {getNavComponent()}
      </div>
    </>
  );
}

function HomeNavBar({ router }: { router: AppRouterInstance }) {
  return (
    <div className="flex py-5 px-20 items-center justify-between w-full bg-gradient-to-b from-black to-transparent">
      <Logo />
      <div>
        <div>
          <button
            className="rounded-md hover:border border-white mr-2 p-1.5 px-4 text-sm text-white transition-all"
            onClick={() => router.push('/login')}
          >
            LOGIN
          </button>
          <button
            className="rounded-md border border-white p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
            onClick={() => router.push('/signup')}
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  )
}

function GenerateNavBar({ router }: { router: AppRouterInstance }) {
  return (
    <div className="flex py-5 px-20 items-center justify-between w-full">
      <Logo />
      <div>
        <div className="flex flex-wrap gap-4">
          <button className="bg-blood-red text-sm w-40 text-white px-4 py-2 rounded">GENERATE</button>
          <button className="bg-dark-gray text-sm text-white rounded w-40 flex items-center justify-center"><img src="/images/diamond-icon.svg" alt="diamond" className="mr-2.5" />ALL ASSETS</button>
          <button className="border border-white text-sm text-white rounded w-40 flex items-center justify-center"><img src="/images/profile-icon.png" alt="diamond" className="mr-2.5" />nihar.hm<img src="/images/dropdown-icon.png" alt="diamond" className="ml-4" /></button>
        </div>
      </div>
    </div>
  )
}