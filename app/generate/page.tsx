"use client";
import ImageUpload from "@/components/generate/imageupload";
import TextareaWithCount from "@/components/generate/textareawithcount";
import React, { useCallback, useState, useEffect } from 'react';
import CustomVideoPlayer from "@/components/generate/customvideoplayer";

enum VideoGenerationState {
  Initial,
  Loading,
  Loaded,
  Failed
}

export default function Generate() {

  const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [text, setText] = useState<string>('');

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    sources: [
      {
        src: 'https://vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4',
      },
    ],
    fluid: false, // Makes the player responsive
  };

  const [videoState, setVideoState] = useState<VideoGenerationState>(VideoGenerationState.Loading);

  const handleImageInput = useCallback((image: string | null) => {
    setUploadedImage(image)
  }, []);

  const handleNonEmptyInput = useCallback((text: string) => {
    setText(text)
  }, []);

  useEffect(() => {
    if (uploadedImage && text.length > 0) {
      setSubmitEnabled(true)
    } else {
      setSubmitEnabled(false)
    }
  }, [uploadedImage, text]);

  const imageSrc = "/images/logout_bg.png";

  return (
    <>
      <div className="absolute w-full bg-black bg-cover h-full px-20 flex items-center justify-center overflow-auto">
        <div className="flex flex-wrap-reverse w-full md:flex-nowrap md:space-y-0 md:space-x-4 h-screen pt-28 pb-12">
          {/* Left Panel */}
          <form action="" className="flex flex-col w-full md:w-1/2 space-y-4">
            <div className="flex flex-col bg-darkest-gray p-5 h-1/2 animate-fade-down"  style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
              <h2 className="text-sm font-bold text-gray-smooth">Input Image</h2>
              <ImageUpload className="mt-2.5" onImageSelected={handleImageInput} />
            </div>
            <div className="bg-darkest-gray p-5 flex-1  animate-fade-down"  style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}>
              <div className="h-full flex flex-col items-center">
                <div className="flex-1 w-full h-full ">
                  <TextareaWithCount maxLength={320} onNonEmptyInput={handleNonEmptyInput} />
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
                      <p>Sometext</p>
                      <img src="/images/delete-icon.svg" alt="delete" className="" />
                    </div>
                    <div className="relative h-full  mt-2.5">
                      <CustomVideoPlayer options={videoJsOptions} />
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
                          <img src="/images/level-5-icon.svg"  alt="cross" className="" />
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
