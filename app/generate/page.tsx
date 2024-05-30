import Card from "@/components/home/card";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import BackgroundImage from "@/components/layout/background";
import { nFormatter } from "@/lib/utils";
import ImageUpload from "@/components/generate/imageupload";

export default async function Generate() {



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
      <div className="absolute w-full bg-black bg-cover h-full px-20 flex items-center justify-center overflow-auto">
        <div className="flex flex-wrap w-full md:flex-nowrap md:space-y-0 md:space-x-4 h-screen pt-28 pb-12">
          {/* Left Panel */}
          <div className="flex flex-col w-full md:w-1/2 space-y-4">
            <div className="flex flex-col bg-darkest-gray p-5 h-1/2">
              <h2 className="text-sm font-bold text-gray-smooth">Input Image</h2>
              <ImageUpload className="mt-2.5" />
            </div>
            <div className="bg-darkest-gray p-5 flex-1">
              <h2 className="text-lg font-bold">Describe the shot</h2>
              <textarea className="w-full mt-2 p-2 border border-gray-600 rounded bg-gray-900 text-white" rows="4" placeholder="Describe the shot"></textarea>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-400">0 / 320</span>
                <button className="bg-gray-600 px-4 py-2 rounded">Submit</button>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-1/2 bg-darkest-gray p-4 rounded flex items-center justify-center">
            <p>Your creations will show up here.</p>
          </div>
        </div>

      </div>

    </>
  );
}
