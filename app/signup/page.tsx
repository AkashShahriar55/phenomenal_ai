"use client";
import PInput from "@/components/shared/input";
import { SignUpData, SignUpFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


export default function SignUp() {


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
  } = useForm<SignUpData>({
    resolver: zodResolver(SignUpFormSchema), // Apply the zodResolver
    mode: 'onChange', // Validate on change
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  // Watch the input value
  const password = watch('password', '');
  const endSrc = password?.trim() === '' ? "/images/eye-icon.svg" : passwordVisible ? "/images/eye-icon-open.png" : "/images/eye-icon-active.svg"
  const passwordType = passwordVisible ? "text" : "password"
  const handlePasswordVisibility = () => {
    passwordVisible ? setPasswordVisible(false) : setPasswordVisible(true)
  }

  return (
    <>
      <div className="absolute w-full bg-loginPage bg-cover h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 w-full max-w-5xl bg-white p-14 rounded-lg shadow-lg flex flex-col animate-fade-up">
          <div className="flex flex-col items-center ">
            <h2 className="text-2xl mb-2 text-gray-normal"> <span className="font-semibold">Create</span> an account</h2>
            <p className="mb-6 text-sm text-gray-dark">
              Already have an account? <a href="/login" className="text-gray-dark italic font-bold underline">LOG IN</a>
            </p>
          </div>
          <div className="flex">
            <div className="w-1/2 pr-9">
              <form>
                <div className="grid grid-cols-2 gap-5">
                  <PInput
                    type="text"
                    placeholder="Enter your first name"
                    error={errors.first_name}
                    name="first_name"
                    register={register}
                    label="First Name"
                  />
                  <PInput
                    type="text"
                    placeholder="Enter your last name"
                    error={errors.last_name}
                    name="last_name"
                    register={register}
                    label="Last Name"
                  />
                </div>
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
                    type={passwordType}
                    placeholder="Enter a new password"
                    error={errors.password}
                    name="password"
                    register={register}
                    label="Password"
                    info="It must be a combination of minimum 8 letters, numbers, and symbols."
                    endIconSrc={endSrc}
                    onEndIconClicked={handlePasswordVisibility}
                  />
                </div>
                <div className="mt-4 flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 disabled:text-lighttext disabled:border-lighttext text-gray-dark "
                    disabled={!isValid}
                    {...register("remember_me", {
                      required: true
                  })}
                  />
                  {isValid ? <label className="ml-2 block text-sm text-gray-dark">Remember me</label> : <label className="ml-2 block text-sm text-lighttext">Remember me</label>}

                </div>
                <button
                  type="submit"
                  className="mt-6 w-full min-h-12 disabled:bg-normal-gray text-white py-2 rounded-md shadow-sm font-medium bg-[#FC0808]"
                  disabled={!isValid}
                >
                  REGISTER
                </button>
              </form>
            </div>
            <div className="flex flex-col">
              <div className="flex-1 w-px bg-dark-gray mx-4">
              </div>
              <p className="my-5 w-full text-center text-gray-dark">OR</p>
              <div className="flex-1 w-px bg-dark-gray mx-4">

              </div>
            </div>

            <div className="w-1/2 pl-9 flex flex-col items-center justify-center">
              <button className="w-full bg-white text-gray-dark border border-graytext py-2 rounded-md shadow-sm font-medium hover:bg-gray-100 flex items-center justify-center">
                <img src="/images/google-logo.svg" alt="Google" className="w-5 h-5 mr-2 text-gray-normal" />
                Sign up with Google
              </button>
              <p className="mt-4 text-[10px] text-gray-500 text-center ">
                *By signing up, you agree that the data you provide shall be kept private and used strictly
                for research purposes. This data may also be utilized for promotional and marketing activities. Your privacy is of utmost importance to us, and we are committed to ensuring that your information is handled with the highest level of security and confidentiality.</p>
            </div>
          </div>

        </div>

      </div>

    </>
  );
}
