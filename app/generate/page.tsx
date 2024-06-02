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

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    sources: [
      {
        src: videoUrl,
        type: 'video/mp4',
      },
    ],
    fluid: false, // Makes the player responsive
  };

  const [videoState, setVideoState] = useState<VideoGenerationState>(VideoGenerationState.Initial);

  const handleImageInput = useCallback((image: string | null) => {
    setUploadedImage(image)
  }, []);

  const handleNonEmptyInput = useCallback((text: string) => {
    setText(text)
  }, []);

  useEffect(() => {
    if (text.length > 0) {
      setSubmitEnabled(true)
    } else {
      setSubmitEnabled(false)
    }
  }, [uploadedImage, text]);

  const [loading, setLoading] = useState(false);

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
        body: JSON.stringify({ prompt: values.prompt }),
      });
      const sendData = await sendResponse.json()
      const jobID = sendData.jobID

      console.error("sendResponse----> " + sendData + " " + jobID)

      if (sendResponse.ok && jobID) {


        const timeout = 1000 * 60 * 10;
        const timeNow = Date.now()

        let receiveResponse
        do {
          receiveResponse = await fetch(`/api/generate?jobID=${jobID}`);


          if(receiveResponse.statusText != "NULL"){
            break
          }

          await sleep(1000 * 30)

        } while (!receiveResponse.ok && Date.now() - timeNow < timeout)

        const receiveData = await receiveResponse.json()
        console.log("sendResponse----> " + receiveData + " " + jobID)

        if (receiveResponse.ok) {
          setVideoUrl(receiveData.url)
          setVideoState(VideoGenerationState.Loaded)
          setVideoName(receiveData.name)
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




  function handleImageDelete() {
    setUploadedImage(null)
  }

  const modalRef = useRef(null);


  const closeModal = () => {
    setErrorMessage(undefined)
  };




  return (
    <>
      <div>
        {loading ? (
          <GeneratingLoader message="Generating video for you. Please don't close or refresh this page." />
        ) : (
          <div>
          </div>
        )}
      </div>
      {errorMessage ? (
        <div>
          <dialog ref={modalRef} id="my_modal_1" className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-blood-red">Something went wrong!</h3>
              <p className="py-4">{errorMessage}</p>
              <div className="modal-action">
                <button className="btn" onClick={closeModal}>Close</button>
              </div>
            </div>
          </dialog>
        </div>
      ) : (<div></div>)}

      <div className="absolute w-full bg-black bg-cover h-full px-20 flex items-center justify-center overflow-auto">
        <div className="flex flex-wrap-reverse w-full md:flex-nowrap md:space-y-0 md:space-x-4 h-screen pt-28 pb-12">
          {/* Left Panel */}
          <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col w-full md:w-1/2 space-y-4">
            <div className="flex flex-col bg-darkest-gray p-5 h-1/2 animate-fade-down" style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
              <div className="flex w-full justify-between">
                <h2 className="text-sm font-bold text-gray-smooth">Input Image</h2>
                <button className="cursor-pointer" type="button" onClick={handleImageDelete}>
                  <img src="/images/delete-icon.svg" alt="delete" className="" />
                </button>
              </div>

              <ImageUpload className="mt-2.5" onImageSelected={handleImageInput} uploadedImage={uploadedImage} />
            </div>
            <div className="bg-darkest-gray p-5 flex-1  animate-fade-down" style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}>
              <div className="h-full flex flex-col items-center">
                <div className="flex-1 w-full h-full ">

                  <TextareaWithCount
                    maxLength={320}
                    onNonEmptyInput={handleNonEmptyInput}
                    type="promt"
                    placeholder="Describe the shot."
                    error={errors.prompt}
                    name="prompt"
                    register={register}
                  />
                </div>

                <button
                  type="submit"
                  className="h-10 min-w-32 cursor-pointer disabled:cursor-not-allowed mt-5 disabled:bg-darker-gray bg-blood-red  text-white py-2 rounded-md shadow-sm font-medium"
                  disabled={!submitEnabled}
                >
                  Submit
                </button>
              </div>

            </div>
          </form>


          {/* Right Panel */}
          <div className="w-full md:w-1/2 min-h-10 bg-darkest-gray p-4 rounded flex items-center justify-center text-sm text-white animate-fade-down" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }} >
            {
              videoState === VideoGenerationState.Initial ? (
                <p>Your creations will show up here.</p>
              ) : videoState === VideoGenerationState.Loading ? (
                <p>Your creations will show up here loading.</p>
              ) : videoState === VideoGenerationState.Loaded ? (
                <div className=" h-full w-full flex flex-col gap-4">
                  <div className="h-full flex flex-col">
                    <div className="w-full  flex justify-between">
                      <p>{videoName}</p>
                      <button className="cursor-pointer">
                        <img src="/images/delete-icon.svg" alt="delete" className="" />
                      </button>
                    </div>
                    <div className="relative h-full  mt-2.5">
                      <CustomVideoPlayer videosrc={videoUrl!} />
                    </div>
                  </div>
                  <div className="bg-darker-gray rounded p-5 flex flex-col gap-4">
                    <div className="flex justify-between">
                      <p>Help us improve</p>
                      <img src="/images/cross-icon.svg" alt="cross" className="" />
                    </div>
                    <p>Did the video accurately represent the prompt you provided?</p>
                    <div className="flex flex-row justify-between items-end ">
                      <div className="flex gap-3" >
                        <button className="aspect-square rounded p-2.5 max-h-10 max-w-10 bg-[#E40513]">
                          <img src="/images/level-1-icon.svg" alt="cross" className="" />
                        </button>
                        <button className="aspect-square rounded p-2.5 max-h-10 max-w-10 bg-[#FA9006]">
                          <img src="/images/level-2-icon.svg" alt="cross" className="" />
                        </button>
                        <button className="aspect-square rounded p-2.5 max-h-10 max-w-10 bg-[#F4CA07] items-center">
                          <img src="/images/level-3-icon.svg" alt="cross" className="" />
                        </button>
                        <button className="aspect-square rounded p-2.5 max-h-10 max-w-10 bg-[#ADD805]">
                          <img src="/images/level-4-icon.svg" alt="cross" className="" />
                        </button>
                        <button className="aspect-square rounded p-2.5 max-h-10 max-w-10 bg-[#28A738]">
                          <img src="/images/level-5-icon.svg" alt="cross" className="" />
                        </button>
                      </div>

                      <p className="">01/03</p>

                    </div>


                  </div>
                </div>
              ) : (
                <p>Your creations will show up here failed.</p>
              )
            }
          </div>
        </div>

      </div>

    </>
  );
}
