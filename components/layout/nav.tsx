import NavBar from "./navbar";
import { getServerSession } from "next-auth/next";

export default async function Nav() {
  return <NavBar session={null} />;
}
