import Card from "@/components/home/card";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import BackgroundImage from "@/components/layout/background";
import { nFormatter } from "@/lib/utils";


export default async function Home() {


  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/steven-tey/precedent",
    {
      ...(process.env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
      // data will revalidate every 24 hours
      next: { revalidate: 86400 },
    },
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));

  
  const imageSrc = "/images/logout_bg.png";

  return (
    <>
      <div className="absolute w-full bg-logout bg-cover h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-10 flex flex-col items-center animate-fade-up">
          <h1 className="text-7xl font-bold text-center mb-3 text-white">Imagine Tomorrow</h1>
          <h1 className="text-3xl font-semi-bold mb-3 text-white">Play. Work. Create</h1>
          <p className="text-2xl max-w-xl text-center text-white mt-20 mx-auto">
            PhenomenAI is a future-proof GenAI video creation ecosystem to add intelligence to your creativity,
            connections, community, and workflow
          </p>
          <button className="px-6 py-3 text-lg font-bold mt-7 text-white bg-red-600 rounded">TRY NOW</button>
        </div>
        
      </div>
    
    </>
  );
}
