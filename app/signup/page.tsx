import Card from "@/components/home/card";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import BackgroundImage from "@/components/layout/background";
import { nFormatter } from "@/lib/utils";

export default async function SignUp() {


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
      <div className="absolute w-full bg-loginPage bg-cover h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 w-full max-w-5xl bg-white bg-opacity-90 p-14 rounded-lg shadow-lg flex flex-col animate-fade-up">
          <div className="flex flex-col items-center ">
            <h2 className="text-2xl mb-2"> <span className="font-semibold">Create</span> an account</h2>
            <p className="mb-6 text-sm text-gray-normal">
              Already have an account? <a href="/login" className="text-black italic font-bold underline">LOG IN</a>
            </p>
          </div>
          <div className="flex">
            <div className="w-1/2 pr-9">
              <form>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-normal">First Name</label>
                    <input
                      type="text"
                      placeholder="Placeholder"
                      className="mt-1 block w-full placeholder-gray-light px-3 py-2 min-h-12 bg-light-gray border border-transparent  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-normal">Last Name</label>
                    <input
                      type="text"
                      placeholder="Placeholder"
                      className="mt-1 block w-full min-h-12 px-3 placeholder-gray-light py-2 border bg-light-gray border-transparent rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm text-gray-normal">Email</label>
                  <input
                    type="email"
                    placeholder="Placeholder"
                    className="mt-1 block w-full min-h-12 placeholder-gray-light px-3 py-2 border bg-light-gray border-transparent rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm text-gray-normal">Password</label>
                  <input
                    type="password"
                    placeholder="Placeholder"
                    className="mt-1 block w-full min-h-12 placeholder-gray-light px-3 py-2 border bg-light-gray border-transparent rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <p className="text-xs text-gray-normal mt-1 italic">
                    It must be a combination of minimum 8 letters, numbers, and symbols.
                  </p>
                </div>
                <div className="mt-4 flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-transparent rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-light">Remember me</label>
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full min-h-12 bg-normal-gray text-white py-2 rounded-md shadow-sm font-medium"
                  disabled = {true}
                >
                  REGISTER
                </button>
              </form>
            </div>
            <div className="flex flex-col">
              <div className="flex-1 w-px bg-gray-300 mx-4">
              </div>
              <p className="my-5 w-full text-center">OR</p>
              <div className="flex-1 w-px bg-gray-300 mx-4">

              </div>
            </div>

            <div className="w-1/2 pl-9 flex flex-col items-center justify-center">
              <button className="w-full bg-white text-black border border-gray-300 py-2 rounded-md shadow-sm font-medium hover:bg-gray-100 flex items-center justify-center">
                <img src="/images/google-logo.svg" alt="Google" className="w-5 h-5 mr-2 text-gray-normal" />
                Sign up with Google
              </button>
              <p className="mt-4 text-xs text-gray-500 text-center ">
                By signing up, you agree that the data you provide shall be kept private and used strictly for research purposes. This data may also be utilized for promotional and marketing activities. Your privacy is of utmost importance to us, and we are committed to ensuring that your information is handled with the highest level of security and confidentiality.
              </p>
            </div>
          </div>

        </div>

      </div>

    </>
  );
}
