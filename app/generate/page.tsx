"use client";
import ImageUpload from "@/components/generate/imageupload";
import TextareaWithCount from "@/components/generate/textareawithcount";
import React, { useCallback, useState, useEffect, useRef } from 'react';
import CustomVideoPlayer from "@/components/generate/customvideoplayer";
import { GenerateFormData, GenerateFormSchema, GenerationResponse, SocketErrorResponse } from "@/lib/types";
import * as z from "zod";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GeneratingLoader from "@/components/generate/modalloader";
import { error } from "console";
import { sleep } from "@/lib/utils";
import Survay from "@/components/generate/survay";
import { useSession } from "next-auth/react";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

enum VideoGenerationState {
  Initial,
  Loading,
  Loaded,
  Failed
}

export default function Generate() {
  const { data: session, status } = useSession()
  const token = session?.accessToken


  const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [text, setText] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);
  const [videoState, setVideoState] = useState<VideoGenerationState>(VideoGenerationState.Initial);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState<Socket>()

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
    setValue
  } = useForm<GenerateFormData>({
    resolver: zodResolver(GenerateFormSchema), // Apply the zodResolver
  });

  /**
   * Submit the prompt to the API to generate a response.
   * If the user is not subscribed and there are no remaining free tries, it will show a modal.
   * @param values (string) prompt for the code generation
   */
  const onSubmit = async (values: GenerateFormData) => {
    socket?.emit("generate", values, (val: any) => {
      console.log(val)
    })
  };




  //////// Socket programming here ////////


  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");



  //// handle connection with socket /////
  function onConnect(socket: Socket) {
    setIsConnected(true);
    setTransport(socket.io.engine.transport.name);
    socket.emit("lookupGeneration")
    socket.io.engine.on("upgrade", (transport) => {
      setTransport(transport.name);
    });
  }


  //// handle disconnection with socket /////
  function onDisconnect() {
    setIsConnected(false);
    setTransport("N/A");
  }

  ///// on generate response /////

  function onGenerateResponse(value: GenerationResponse) {
    console.log("generate response --- > " + JSON.stringify(value))
    if (value.status === "Generating") {
      setVideoState(VideoGenerationState.Loading)
      const output = value.output
      if (output) {
        setValue("prompt", output.prompt)
      }
    } else if (value.status === "Generated") {
      const output = value.output
      if (output) {
        console.log("outoput there")
        if (output.outputPath) {
          setVideoState(VideoGenerationState.Loaded)
          setVideoUrl(output.outputPath)
        }
        // Remove special characters and punctuation
        const cleanedString = output.prompt.replace(/[^\w\s]/gi, '');

        // Split the string into words
        const wordsArray = cleanedString.split(/\s+/);

        // Concatenate words with an underscore
        const transformedString = wordsArray.join('_') + `_${output.duration}.mp4`;
        setVideoName(transformedString)
        setValue("prompt", output.prompt)
      }
    } else if (value.status === "Failed") {

    } else {

    }
  }




  ///// handling error here /////
  function onError(error: SocketErrorResponse) {
    console.log("error--->" + JSON.stringify(error))
  }




  useEffect(() => {
    if (token) {
      const token = session?.accessToken
      const socket = io("http://localhost:3001/" + "panel", {
        query: { token }
      })
      setSocket(socket)

      if (socket.connected) {
        onConnect(socket);
      }




      socket.on("connect", () => { onConnect(socket) });
      socket.on("disconnect", onDisconnect);
      socket.on("generate", onGenerateResponse)
      socket.on("error", onError)

      return () => {
        socket.off("connect", () => { onConnect(socket) });
        socket.off("disconnect", onDisconnect);
        socket.off("generate", onGenerateResponse)
        socket.off("error", onError)
      };
    }

  }, [token]);






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
          <dialog id="my_modal_1" className="modal modal-open">
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
          <div className="absolute flex z-10 bottom-2 end-2 items-center gap-2 ">
            <div className={` size-2  ${isConnected && "bg-green-500" || "bg-red-500"} rounded-full `}></div>
            <p>{isConnected && "Connected" || "Disconnected"}</p>
          </div>
          {/* Left Panel */}
          <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col w-full md:w-1/2 space-y-4">
            <div className="flex flex-col bg-darkest-gray p-5 h-1/2 animate-fade-down" style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
              <div className="flex w-full justify-between">
                <h2 className="text-sm font-bold text-gray-smooth">Input Image</h2>
                {uploadedImage ? (
                  <button className="cursor-pointer" type="button" onClick={handleImageDelete}>
                    <img src="/images/delete-icon.svg" alt="image-delete" className="" />
                  </button>
                ) : (
                  <div></div>
                )}

              </div>

              <ImageUpload className="mt-2.5" onImageSelected={handleImageInput} uploadedImage={uploadedImage} />
            </div>
            <div className="bg-darkest-gray p-5 flex-1  animate-fade-down" style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}>
              <div className="h-full flex flex-col items-center">
                <div className="w-full flex items-center">
                  <select defaultValue={4} className="select mr-5 max-w-xs"  {...register('duration', { required: 'duration is required' })}>
                    <option value={4}>4s</option>
                    <option value={8}>8s</option>
                    <option value={12}>12s</option>
                  </select>
                  <p>{errors.duration?.message}</p>
                </div>
                <div className="flex-1 w-full h-full mt-5">
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
                  className="h-10 min-w-32  flex items-center justify-center cursor-pointer disabled:cursor-not-allowed mt-5 disabled:bg-darker-gray bg-blood-red  text-white py-2 rounded-md shadow-sm font-medium"
                  disabled={!submitEnabled || videoState === VideoGenerationState.Loading}
                >
                  {
                    videoState === VideoGenerationState.Loading ? <>
                      <svg aria-hidden="true" role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
                      </svg>
                      Generating
                    </> : <>
                      Submit
                    </>
                  }

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
                      <p>{videoName && videoName.length > 50 ? videoName.substring(0, 50) + '...' : videoName}</p>
                      <button className="cursor-pointer" onClick={handleGenerationDelete}>
                        <img src="/images/delete-icon.svg" alt="video-delete" className="" />
                      </button>
                    </div>
                    <div className="relative h-full  mt-2.5">
                      <CustomVideoPlayer videosrc={videoUrl!} filename={videoName!} />
                    </div>
                  </div>
                  <Survay />
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
