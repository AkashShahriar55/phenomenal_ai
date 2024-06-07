import { useSession } from "next-auth/react";
import NavBar from "./navbar";
import { getServerSession } from "next-auth/next";
import { usePathname } from "next/navigation";
import { auth } from "@/lib/auth";
import { Session } from "next-auth";


export default async function Nav() {
  const session = await auth();

  return <NavBar session={session}  />;
}

