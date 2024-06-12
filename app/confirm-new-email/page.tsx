"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import fetchClient from "@/lib/fetch-client";
import { useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import GeneratingLoader from "@/components/generate/modalloader";
import { useRouter } from "next/navigation";


export default function ConfirmEmail() {
    const { data: session, status ,update} = useSession()

    const router = useRouter()
    const searchParams = useSearchParams();
    const hashValue = searchParams.get("hash");
    const [verifying, setVerifying] = useState(false);
    const [sending, setSending] = useState(false);



    async function confirmEmail(){
        setVerifying(true)
        try {
            console.log(JSON.stringify({hash:hashValue}))
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "v1/auth/email/confirm/new",{
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify({hash:hashValue})
            });
    
      
            if (!response.ok) {
              throw response;
            }

            await update({ type: "MANUAL" });
            

            router.push("/")
          } catch (error) {
            setVerifying(false)
            console.log("error ----- > " + JSON.stringify(error))
            if (error instanceof Response) {

              const response = await error.json();
            
              if (!response.errors) {
                throw error;
              }
      
              return Object.keys(response.errors).map((errorKey) => {
                
              });
            }
      
            throw new Error("An error has occurred during registration request");
          }
    }

    



    

    


    async function handleResend(){
        setSending(true)
        try {
            const response = await fetchClient({
              method: "POST",
              url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "v1/auth/email/confirm/resend"
            });
      
        
      
            if (!response.ok) {
              throw response;
            }

            setSending(false)

          } catch (error) {
            setSending(false)
            if (error instanceof Response) {
              const response = await error.json();
           
              if (!response.errors) {
                throw error;
              }
      
              return Object.keys(response.errors).map((errorKey) => {
                
              });
            }
      
            throw new Error("An error has occurred during registration request");
          }
    }



    if(hashValue){
        return (<>
            <div className="absolute bg-black h-full w-full flex items-center justify-center">
    
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-darkest-gray flex flex-col items-center p-5 gap-4">
                    <p className="text-gray-700 text-base text-center">
                        Welcome {session?.user?.email} . Click verify to proceed.   
                    </p>
    
                    <button onClick={()=>{confirmEmail()}} className="btn px-6 bg-blood-red text-white">
                        Verify
                    </button>
                </div>
            </div>
        </>)
    }else{
        return (<>
            <div className="absolute bg-black h-full w-full flex items-center justify-center">
    
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-darkest-gray flex flex-col items-center p-5 gap-4">
                    <div className="font-bold text-xl text-white">Verify your email address.</div>
                    <p className="text-gray-700 text-base text-center">
                        We have sent a verification link to your email {session?.user?.email}
                        {sending ? <p onClick={handleResend} className="text italic text-gray-light"> Sending...</p> : <a onClick={handleResend} className="link text italic text-white"> Resend</a>} 
                        
                    </p>
    
                    <button onClick={()=>{signOut()}} className="btn px-6 bg-blood-red text-white">
                        Login to another
                    </button>
                </div>
            </div>
        </>)
    }
    
}

