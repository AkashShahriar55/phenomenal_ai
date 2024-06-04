"use client";
import PInput from "@/components/shared/input";
import SignInSection from "@/components/trynow/signin";
import SignUpSection from "@/components/trynow/signup";
import { SignUpData, SignUpFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


export default function TryNow() {

  return (
    <>
      <div className="absolute w-full h-full flex flex-col items-center justify-center bg-blood-red">
        <div className="w-full h-full flex bg-white">
          <div className="w-1/2 h-full flex justify-center items-center ">
            <SignInSection/>
          </div>
          <div className="w-1/2  h-full bg-darkest-gray flex justify-center items-center">
            <SignUpSection/>
          </div>
        </div>

        <div className="flex w-3/5">
          <img src="/images/check-icon.svg" />
          <p className="text-xs py-6 ml-4 antialiased text-white text-justify">By signing up, you agree that the data you provide shall be kept private and used strictly for research purposes. This data may also be utilised for promotional and marketing and sales activities. Your privacy is of utmost importance to us, and we are committed to ensuring that your information is handled with the highest level of security and confidentiality.</p>
        </div>

      </div>

    </>
  );
}
