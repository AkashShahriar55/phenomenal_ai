"use client";
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { GenerateFormData, GenerateFormSchema } from "@/lib/types";
import { useRouter } from 'next/navigation'
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sleep } from "@/lib/utils";
import AssetItem, { AssetItemData } from "@/components/allassets/assetitem";

enum VideoGenerationState {
  Initial,
  Loading,
  Loaded,
  Failed
}

export default function Generate() {



  const router = useRouter();




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
