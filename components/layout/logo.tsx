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

export default function Logo() {

  return (
    <>
      <Link href="/" className="flex items-center font-display text-2xl">
        <Image
          src="/logo.png"
          alt="phenomenal logo"
          width="190"
          height="30"
          className="mr-2 rounded-sm"
        ></Image>
      </Link>
    </>
  );
}

