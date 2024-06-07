"use client";
import ImageUpload from "@/components/generate/imageupload";
import TextareaWithCount from "@/components/generate/textareawithcount";
import React, { useCallback, useState, useEffect, useRef } from 'react';
import CustomVideoPlayer from "@/components/generate/customvideoplayer";
import { GenerateFormData, GenerateFormSchema } from "@/lib/types";
import * as z from "zod";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GeneratingLoader from "@/components/generate/modalloader";
import { error } from "console";
import { sleep } from "@/lib/utils";
import Survay from "@/components/generate/survay";
import AssetItem, { AssetItemData } from "@/components/allassets/assetitem";
import AssetItems from "@/components/allassets/assetitem";

enum VideoGenerationState {
  Initial,
  Loading,
  Loaded,
  Failed
}

export default function Generate() {



  const router = useRouter();
  const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [text, setText] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);
  const [videoState, setVideoState] = useState<VideoGenerationState>(VideoGenerationState.Initial);
  const [loading, setLoading] = useState(false);

  const handleImageInput = useCallback((image: string | null) => {
    setUploadedImage(image)
  }, []);

  const handleNonEmptyInput = useCallback((text: string) => {
    setText(text)
  }, []);


  const closeModal = () => {
    setErrorMessage(undefined)
  };


  function handleGenerationDelete() {
    setVideoState(VideoGenerationState.Initial)
  }


  function handleImageDelete() {
    setUploadedImage(null)
  }



  useEffect(() => {
    if (text.length > 0) {
      setSubmitEnabled(true)
    } else {
      setSubmitEnabled(false)
    }
  }, [uploadedImage, text]);



  /**
   * Form for the prompt for the code generation.
   * Zod used for validation.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<GenerateFormData>({
    resolver: zodResolver(GenerateFormSchema), // Apply the zodResolver
  });

  /**
   * Submit the prompt to the API to generate a response.
   * If the user is not subscribed and there are no remaining free tries, it will show a modal.
   * @param values (string) prompt for the code generation
   */
  const onSubmit = async (values: GenerateFormData) => {
    setLoading(true)
    try {
      console.log(values.prompt)
      /**
       * Send the messages to the API.
       * Stores the response.
       */

      const sendResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: values.prompt, duration: values.duration }),
      });
      const sendData = await sendResponse.json()
      const jobID = sendData.jobID

      console.error("sendResponse----> " + sendData + " " + jobID)

      if (sendResponse.ok && jobID) {

        let receiveResponse
        do {
          receiveResponse = await fetch(`/api/generate?jobID=${jobID}`);


          if (receiveResponse.status != 404) {
            break
          }

          await sleep(1000 * 30)

        } while (!receiveResponse.ok)

        const receiveData = await receiveResponse.json()
        console.log("sendResponse----> " + receiveData + " " + jobID)

        if (receiveResponse.ok) {
          setVideoUrl(receiveData.url)
          setVideoState(VideoGenerationState.Loaded)
          // Remove special characters and punctuation
          const cleanedString = values.prompt.replace(/[^\w\s]/gi, '');

          // Split the string into words
          const wordsArray = cleanedString.split(/\s+/);

          // Concatenate words with an underscore
          const transformedString = wordsArray.join('_');
          setVideoName(transformedString + ".mp4")
        } else {
          setErrorMessage(receiveData.error)
        }

      }





    } catch (error: any) {
      setLoading(false)
      console.log(error)

      // if the user is not subscribed and there are no remaining free tries, it will show a modal
      // if (error.response.status === 403) {
      //   // proModal.onOpen();

      // } else {
      //   console.log(error);
      //   // toast.error("Could not answer your question");
      // }
    } finally {
      setLoading(false)
      router.refresh();
    }

  };




  return (
    <>

      <div className="w-full bg-black px-20 flex justify-center">
        <div className="w-4/5 h-full flex flex-col">
          <div className="w-full h-1/2">
            <div className="w-full h-24"></div>
            <p className="text-2xl text-white">
              All Assets
            </p>

            <div className="h-56 bg-blood-red my-8 flex rounded-lg overflow-clip">
              <div className="bg-white w-1/2 h-full">

              </div>
              <div className="bg-darker-gray w-1/2 h-full">

              </div>
            </div>
          </div>
          <div className="w-full h-1/2 overflow-clip">
            <div className="w-full flex justify-between p-5 bg-[#151515]">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  className="text-white border-white bg-transparent"
                />
                <p className="text-white">
                  Name
                </p>
                <svg width="12" className="fill-white" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.251051 0.251051C0.585786 -0.0836838 1.1285 -0.0836838 1.46323 0.251051L6 4.78782L10.5368 0.251051C10.8715 -0.0836838 11.4142 -0.0836838 11.7489 0.251051C12.0837 0.585786 12.0837 1.1285 11.7489 1.46323L6.60609 6.60609C6.27136 6.94083 5.72864 6.94083 5.39391 6.60609L0.251051 1.46323C-0.0836838 1.1285 -0.0836838 0.585786 0.251051 0.251051Z" fill="white" />
                </svg>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-white">
                  Created
                </p>
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.251051 0.251051C0.585786 -0.0836838 1.1285 -0.0836838 1.46323 0.251051L6 4.78782L10.5368 0.251051C10.8715 -0.0836838 11.4142 -0.0836838 11.7489 0.251051C12.0837 0.585786 12.0837 1.1285 11.7489 1.46323L6.60609 6.60609C6.27136 6.94083 5.72864 6.94083 5.39391 6.60609L0.251051 1.46323C-0.0836838 1.1285 -0.0836838 0.585786 0.251051 0.251051Z" fill="white" />
                </svg>
                <div className="w-20"></div>
              </div>
            </div>

            <div className="w-full h-full">
              {
                items.map((item) => (
                  <AssetItem />
                ))
              }
            </div>
          </div>

        </div>




      </div>

    </>
  );
}


const items: Array<AssetItemData> = [
  {
    id: "1",
    name: "project 1",
    thumbnail: "/images/logout_bg.png",
    createdAt: "3 Hours Ago"
  },
  {
    id: "2",
    name: "project 1",
    thumbnail: "/images/logout_bg.png",
    createdAt: "3 Hours Ago"
  },
  {
    id: "3",
    name: "project 1",
    thumbnail: "/images/logout_bg.png",
    createdAt: "3 Hours Ago"
  },
  {
    id: "4",
    name: "project 1",
    thumbnail: "/images/logout_bg.png",
    createdAt: "3 Hours Ago"
  },
  {
    id: "5",
    name: "project 1",
    thumbnail: "/images/logout_bg.png",
    createdAt: "3 Hours Ago"
  },
  {
    id: "6",
    name: "project 1",
    thumbnail: "/images/logout_bg.png",
    createdAt: "3 Hours Ago"
  }, {
    id: "7",
    name: "project 1",
    thumbnail: "/images/logout_bg.png",
    createdAt: "3 Hours Ago"
  },
  {
    id: "8",
    name: "project 1",
    thumbnail: "/images/logout_bg.png",
    createdAt: "3 Hours Ago"
  }
]
