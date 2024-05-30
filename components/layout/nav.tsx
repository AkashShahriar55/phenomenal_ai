import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import NavBar from "./navbar";
import { getServerSession } from "next-auth/next";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  return <NavBar session={session} />;
}
