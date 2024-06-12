"use client";
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { GenerateFormData, GenerateFormSchema, ProfileUpdate, ProfileUpdateSchema, SignUpData, SignUpFormSchema } from "@/lib/types";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PInput, { SInput } from "@/components/shared/input";
import { useSession } from 'next-auth/react';
import fetchClient from '@/lib/fetch-client';
import Loader from '@/components/generate/loader';
import { useRouter } from 'next/navigation';


export default function accountsettings() {

  const router = useRouter();
  const { data: session, status,update } = useSession()

  const [passwordEditing, setPasswordEditing] = useState(false)

  const [updating, setUpdating] = useState(false)


  async function onSubmit(data: ProfileUpdate) {


    setUpdating(true)
    try {
      const response = await fetchClient({
        method: "PATCH",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "v1/auth/me",
        body: JSON.stringify(data),
      });


      if (!response.ok) {
        throw response;
      }


      await update({ type: "MANUAL" });
      setUpdating(false)
      router.refresh()
    } catch (error) {
      setUpdating(false)

      if (error instanceof Response) {
        const response = await error.json();
        console.log(JSON.stringify(response))
        if (!response.errors) {
          throw error;
        }

        return Object.keys(response.errors).map((errorKey) => {
          setError(errorKey, { type: 'manual', message: response.errors[errorKey] });
        });
      }

      throw new Error("An error has occurred during registration request");
    }
  }

  /**
  * Form for the prompt for the code generation.
  * Zod used for validation.
  */
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    setError,
    watch,
    clearErrors,
    setValue
  } = useForm<ProfileUpdate>({
    resolver: zodResolver(ProfileUpdateSchema), // Apply the zodResolver
    mode: 'onChange', // Validate on change,
    reValidateMode: 'onChange',
    values: {
      firstName: session?.user?.firstName!,
      lastName: session?.user?.lastName!,
      email: session?.user?.email!
    }
  });

  function handleEdit() {
    if(passwordEditing){
      setPasswordEditing(false)
      setValue("newPassword",undefined)
      setValue("oldPassword",undefined)
      clearErrors("newPassword")
      clearErrors("oldPassword")
    }else{
      setPasswordEditing(true)
    }
    
  }

  return (
    <>

      <div className="absolute h-full w-full bg-black px-56 flex justify-center items-center">
        <div className="w-full">
          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-2xl text-white">Account Settings</p>
              <div className="grid grid-cols-2 gap-10 mt-10">
                <PInput
                  type="text"
                  placeholder="Enter your first name"
                  error={errors.firstName}
                  name="firstName"
                  register={register}
                  label="First Name"
                  bgColor="bg-[#151515]"
                  textColor="text-white"
                  borderColor='border-white'
                  onChange={() => clearErrors('firstName')}
                />
                <PInput
                  type="text"
                  placeholder="Enter your last name"
                  error={errors.email}
                  name="email"
                  register={register}
                  label="Email Address"
                  bgColor="bg-[#151515]"
                  textColor="text-white"
                  borderColor='border-white'
                  onChange={() => clearErrors('email')}
                />
                <PInput
                  type="text"
                  placeholder="Enter your last name"
                  error={errors.lastName}
                  name="lastName"
                  register={register}
                  label="Last name"
                  bgColor="bg-[#151515]"
                  textColor="text-white"
                  borderColor='border-white'
                  onChange={() => clearErrors('lastName')}
                />
                <div>
                  <div  >
                    <label className={`block text-sm  text-white`}>Password</label>
                    <div className='relative flex items-center mt-1'>
                      <input
                        type="password"
                        placeholder="********"
                        className={`block w-full  invalid:border-blood-red text-gray-dark placeholder-gray-light px-3 py-2 min-h-12 bg-[#151515] border border-transparent  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        disabled
                      />

                      <button className='cursor-pointer absolute right-3 text-white text-sm underline' role="button" type='button' onClick={handleEdit} >
                        {passwordEditing ? "Cancel" : "Edit"}
                      </button>
                    </div>
                  </div>
                  {passwordEditing &&
                    <div className='w-full'>

                      <SInput
                        type="text"
                        placeholder="Enter new password"
                        error={errors.newPassword}
                        name="newPassword"
                        register={register}
                        label="Last Name"
                        onChange={() => clearErrors('newPassword')}
                        endIconSrc='images/eye-icon-white.svg'
                      />
                      <SInput
                        type="text"
                        placeholder="Enter old password"
                        error={errors.oldPassword}
                        name="oldPassword"
                        register={register}
                        label="Old password"
                        onChange={() => clearErrors('oldPassword')}
                        endIconSrc='images/eye-icon-white.svg'
                      />
                    </div>
                  }
                </div>
                <div className='w-full h-full'>

                </div>

              </div>
              <button type='submit' className='btn mt-50' disabled={!isDirty || isSubmitting}>
                {updating ? <Loader className="size-5 fill-white" /> : "Save Changes"}
              </button>
            </form>

          </div>
        </div>
      </div>

    </>
  );
}


