"use client";
import PInput from "@/components/shared/input";
import { authenticate } from "@/lib/actions";
import { SignInFormSchema, SignUpData, SignUpFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";


export default function Login() {

  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  async function onSubmit(data: Pick<SignUpData, "email" | "password" | "remember_me">) {
    signIn("credentials", { ...data, callbackUrl });
  }



  /**
  * Form for the prompt for the code generation.
  * Zod used for validation.
  */
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    watch
  } = useForm<Pick<SignUpData, "email" | "password" | "remember_me">>({
    resolver: zodResolver(SignInFormSchema), // Apply the zodResolver
    mode: 'onChange', // Validate on change
  });


  const imageSrc = "/images/logout_bg.png";

  return (
    <>
      <div className="absolute w-full bg-loginPage bg-cover h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 w-full max-w-540 mb-2 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Login Failed! </strong>
                  <span className="block sm:inline">Email or password is wrong</span>
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                  </span>
                </div>}
        <div className="relative z-10 w-full max-w-540 bg-white bg-opacity-90 p-14 rounded-lg shadow-lg flex flex-col animate-fade-up">
          <div className="flex flex-col items-center ">
            <div className="flex items-center gap-1">
              <h2 className="text-xl mb-2 text-gray-dark">Welcome to</h2>
              <img className="h-5" src="/dark-icon.svg" />
            </div>

            <p className="mb-6 text-sm text-gray-normal">
              Don’t have an account? <a href="/signup" className="text-black italic font-bold underline">Sign up for free</a>
            </p>
          </div>
          <div className="flex flex-col">
            <div className="">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                  <PInput
                    type="text"
                    placeholder="Enter your email"
                    error={errors.email}
                    name="email"
                    register={register}
                    label="Email"
                  />
                </div>
                <div className="mt-4">
                  <PInput
                    type="password"
                    placeholder="Enter a new password"
                    error={errors.password}
                    name="password"
                    register={register}
                    label="Password"
                    info="It must be a combination of minimum 8 letters, numbers, and symbols."
                  />
                </div>
                <div className="mt-4 flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 disabled:text-lighttext disabled:border-lighttext text-gray-dark "
                    disabled={!isValid}
                  />
                  {isValid ? <label className="ml-2 block text-sm text-gray-dark">Remember me</label> : <label className="ml-2 block text-sm text-lighttext">Remember me</label>}
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full min-h-12 disabled:bg-normal-gray text-white py-2 rounded-md shadow-sm font-medium bg-[#FC0808]"
                  disabled={!isValid}
                >
                  LOGIN
                </button>
                
              </form>
            </div>
            <div className="flex">
              <div className="flex-1 h-px bg-dark-gray">
              </div>
              <p className="m-5 w-full text-center text-gray-dark">OR</p>
              <div className="flex-1 h-px bg-dark-gray">

              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <button className="min-h-12 w-full bg-white text-black border border-darktext py-2 rounded-md shadow-sm font-medium hover:bg-gray-100 flex items-center justify-center">
                <img src="/images/google-logo.svg" alt="Google" className="w-5 h-5 mr-2 text-gray-dark" />
                Log in with Google
              </button>
            </div>
          </div>

        </div>

      </div>

    </>
  );
}
