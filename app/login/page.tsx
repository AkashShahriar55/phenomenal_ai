"use client";
import PInput from "@/components/shared/input";
import {  SignInFormSchema, SignUpData, SignUpFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


export default function Login() {

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
  } = useForm<Pick<SignUpData,"email" | "password" | "remember_me">>({
    resolver: zodResolver(SignInFormSchema), // Apply the zodResolver
    mode: 'onChange', // Validate on change
  });


  const imageSrc = "/images/logout_bg.png";

  return (
    <>
      <div className="absolute w-full bg-loginPage bg-cover h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
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
              <form>
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
