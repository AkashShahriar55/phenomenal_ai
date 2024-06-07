import "./globals.css";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import SessionWrapper from "@/components/sessionWrapper";

export const metadata = {
  title: "Phenomenal.ai",
  description:
    "Phenomenal ai brings you a great AI experience",
  metadataBase: new URL("https://phenomenal.ai"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={cx(sfPro.variable, inter.variable)}>
          <Suspense fallback="...">
            <Nav />
          </Suspense>
          <main className="">
            {children}
          </main>
          <VercelAnalytics />
        </body>
      </html>
    </SessionWrapper>
  );
}
