"use client";
import { auth } from "@/lib/auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import SignUp from "../signup/page";
import fetchClient from "@/lib/fetch-client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { string } from "zod";


export default function ConfirmEmail() {
    const { data: session, status } = useSession()
    const searchParams = useSearchParams();
    const hash = searchParams.get("hash");

    const [error,setError] = useState<string>('')

    const confirmEmail = async (hash:string) => {
        try {
            const response = await fetchClient({
              method: "POST",
              url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "v1/auth/email/confirm",
              body:JSON.stringify({hash:hash})
            });
      
            console.log("-----confirm email---- \n" + JSON.stringify(response))
      
            if (!response.ok) {
              throw response;
            }

          } catch (error) {
            
            if (error instanceof Response) {
              const response = await error.json();
              console.log("-----resend confirm ---- \n" + JSON.stringify(response))
              if (!response.errors) {
                throw error;
              }
      
              return Object.keys(response.errors).map((errorKey) => {
                
              });
            }
      
            throw new Error("An error has occurred during registration request");
          }
    }


    useEffect(()=>{
        if(hash){
            confirmEmail(hash)
        }
    })



    

    


    async function handleResend(){
        try {
            const response = await fetchClient({
              method: "POST",
              url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "v1/auth/email/confirm/resend"
            });
      
            console.log("-----resend confirm---- \n" + JSON.stringify(response))
      
            if (!response.ok) {
              throw response;
            }

          } catch (error) {
            
            if (error instanceof Response) {
              const response = await error.json();
              console.log("-----resend confirm ---- \n" + JSON.stringify(response))
              if (!response.errors) {
                throw error;
              }
      
              return Object.keys(response.errors).map((errorKey) => {
                
              });
            }
      
            throw new Error("An error has occurred during registration request");
          }
    }



    return (<>
        <div className="absolute bg-black h-full w-full flex items-center justify-center">

            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-darkest-gray flex flex-col items-center p-5 gap-4">
                <div className="font-bold text-xl text-white">Verify your email address.</div>
                <p className="text-gray-700 text-base text-center">
                    We have sent a verification link to your email {session?.user?.email} <a onClick={handleResend} className="link text italic text-white">Resend</a>
                </p>
                <button onClick={()=>{signOut()}} className="btn px-6 bg-blood-red text-white">
                    Login to another
                </button>
            </div>
        </div>
    </>)
}

