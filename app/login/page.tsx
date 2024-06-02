import Card from "@/components/home/card";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import BackgroundImage from "@/components/layout/background";
import { nFormatter } from "@/lib/utils";

export default async function Login() {




  const imageSrc = "/images/logout_bg.png";

  return (
    <>
      <div className="absolute w-full bg-loginPage bg-cover h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 w-full max-w-540 bg-white bg-opacity-90 p-14 rounded-lg shadow-lg flex flex-col animate-fade-up">
          <div className="flex flex-col items-center ">
            <h2 className="text-2xl mb-2"> <span className="font-semibold">Create</span> an account</h2>
            <p className="mb-6 text-sm text-gray-normal">
            Don’t have an account? <a href="/signup" className="text-black italic font-bold underline">Sign up for free</a>
            </p>
          </div>
          <div className="flex flex-col">
            <div className="">
              <form>
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
                  disabled={true}
                >
                  REGISTER
                </button>
              </form>
            </div>
            <div className="flex">
              <div className="flex-1 h-px bg-gray-300">
              </div>
              <p className="m-5 w-full text-center">OR</p>
              <div className="flex-1 h-px bg-gray-300">

              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <button className="min-h-12 w-full bg-white text-black border border-gray-300 py-2 rounded-md shadow-sm font-medium hover:bg-gray-100 flex items-center justify-center">
                <img src="/images/google-logo.svg" alt="Google" className="w-5 h-5 mr-2 text-gray-normal" />
                Sign up with Google
              </button>
            </div>
          </div>

        </div>

      </div>

    </>
  );
}
