"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center ${scrolled
            ? "bg-black/50 backdrop-blur-xl"
            : "bg-black/0"
          } z-30 transition-all`}
      >
        <div className="flex h-20 px-20 items-center justify-between w-full bg-gradient-to-b from-black to-transparent">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="phenomenal logo"
              width="190"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
          </Link>
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <div>
                <button
                  className="rounded-md hover:border border-white mr-2 p-1.5 px-4 text-sm text-white transition-all"
                  onClick={() => setShowSignInModal(true)}
                >
                  LOGIN
                </button>
                <button
                  className="rounded-md border border-white p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => setShowSignInModal(true)}
                >
                  SIGN UP
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
