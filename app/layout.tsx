import "./globals.css";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

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
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <div className="h-screen w-full bg-logout bg-cover">
          <div className="fixed h-screen w-full" />
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <Suspense fallback="...">
            <Nav />
          </Suspense>
          <main className="">
            {children}
          </main>
          <Footer />
          <VercelAnalytics />
        </div>
      </body>
    </html>
  );
}
