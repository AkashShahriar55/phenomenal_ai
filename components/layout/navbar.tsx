"use client";
import useScroll from "@/lib/hooks/use-scroll";
import { Session } from "next-auth";
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Logo from "./logo";
import React, { useState } from 'react';
import { signOut } from "next-auth/react";

export default function NavBar({ session }: { session: Session | null }) {
  const scrolled = useScroll(50);


  const router = useRouter()
  const pathname = usePathname();
  const getNavComponent = () => {
    if (pathname.startsWith('/generate') || pathname.startsWith("/allassets")) { // Updated condition
      return <GenerateNavBar userName={session?.user?.name || "N/A"} pathName={pathname} onAllAssets={() => { router.push("/allassets") }} onGenerate={() => { router.push("/generate") }} onAccountSettings={() => { router.push("/accountsettings") }} onLogOut={() => { signOut() }} />;
    } else if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
      return <SimpleNavbar router={router} />;
    } else if (pathname.startsWith("/trynow")) {
      return <></>
    } else if (pathname.startsWith("/confirm-email")) {
      return <></>
    } else if (pathname.startsWith('/')) {
      return <HomeNavBar  router={router} session={session} />;
    } else {
      return <></>
    }
  };



  return (
    <>
      <div
        className={`fixed top-0 w-full flex justify-center animation-slide-down ${scrolled
          ? "bg-black/50 backdrop-blur-xl"
          : "bg-black/0"
          } z-30 transition-all`}
      >
        {getNavComponent()}
      </div>
    </>
  );
}

function HomeNavBar({ router, session }: { router: AppRouterInstance, session: Session | null }) {

  return (
    <div className="flex py-5 px-20 items-center justify-between w-full bg-gradient-to-b from-black to-transparent">
      <Logo />
      <div>
        <div>
          {
            session ?
              <div className="dropdown dropdown-end">
                <button tabIndex={0} role="button" className=" btn border bg-transparent hover:bg-transparent hover:border-white border-white text-sm text-white rounded flex items-center justify-center"><img src="/images/profile-icon.png" alt="diamond" className="mr-2.5" />{session?.user?.name || "N/A"}<img src="/images/dropdown-icon.png" alt="diamond" className="ml-4" /></button>
                <ul tabIndex={0} className="menu dropdown-content z-[1] border border-[#777777] mt-2 shadow bg-[#222222] rounded w-52 ">
                  <li className="hover:bg-white  hover:rounded-lg group"><button onClick={() => { router.push("/accountsettings") }} className="text-white group-hover:text-gray-dark"><svg className="fill-white group-hover:fill-[#111111]" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 4.5C6.06999 4.5 4.5 6.06999 4.5 8C4.5 9.93001 6.06999 11.5 8 11.5C9.93001 11.5 11.5 9.93001 11.5 8C11.5 6.06999 9.93001 4.5 8 4.5ZM8 10.9167C6.39185 10.9167 5.08333 9.60815 5.08333 8C5.08333 6.39185 6.39185 5.08333 8 5.08333C9.60815 5.08333 10.9167 6.39185 10.9167 8C10.9167 9.60815 9.60815 10.9167 8 10.9167Z" strokeWidth="0.25" />
                    <path d="M14.4167 6.83333L13.5599 6.82849C13.4155 6.13749 13.1463 5.48722 12.7567 4.89307L13.3619 4.2878C13.4722 4.17786 13.5331 4.03145 13.5331 3.87565C13.5331 3.71956 13.4725 3.57288 13.3622 3.46265L12.5374 2.63778C12.3098 2.4102 11.9392 2.41048 11.7122 2.63778L11.1035 3.23962C10.5128 2.85368 9.86279 2.5848 9.16667 2.44067V1.58333C9.16667 1.26176 8.90491 1 8.58333 1H7.41667C7.09509 1 6.83333 1.26176 6.83333 1.58333L6.82849 2.4401C6.13721 2.5848 5.48722 2.85368 4.89335 3.24333L4.2878 2.63778C4.06051 2.41048 3.68994 2.41048 3.46265 2.63778L2.63778 3.46265C2.52755 3.57288 2.46688 3.71956 2.46688 3.87565C2.46688 4.03145 2.52783 4.17786 2.63778 4.28752L3.23962 4.8962C2.85368 5.48722 2.58451 6.13749 2.44067 6.83333H1.58333C1.26176 6.83333 1 7.09509 1 7.41667V8.58333C1 8.90491 1.26176 9.16667 1.58333 9.16667L2.4401 9.17151C2.58508 9.86336 2.85396 10.5133 3.24333 11.1069L2.63778 11.7122C2.4102 11.9398 2.4102 12.3098 2.63778 12.5374L3.46265 13.3622C3.68994 13.5898 4.06051 13.5892 4.2878 13.3622L4.89648 12.7604C5.48722 13.1463 6.13721 13.4152 6.83333 13.5593V14.4167C6.83333 14.7382 7.09509 15 7.41667 15H8.58333C8.90491 15 9.16667 14.7382 9.16667 14.4167L9.17151 13.5599C9.86279 13.4152 10.5128 13.1463 11.1066 12.7567L11.7122 13.3622C11.9392 13.5892 12.3098 13.5898 12.5374 13.3622L13.3622 12.5374C13.5898 12.3098 13.5898 11.9398 13.3622 11.7122L12.7604 11.1038C13.146 10.5133 13.4149 9.86336 13.5593 9.16667H14.4167C14.7382 9.16667 15 8.90491 15 8.58333V7.41667C15 7.09509 14.7382 6.83333 14.4167 6.83333ZM14.4167 8.58333H13.5593C13.2816 8.58333 13.0472 8.77588 12.9891 9.05188C12.8589 9.67224 12.6177 10.2553 12.2722 10.7848C12.1181 11.0203 12.1477 11.3223 12.3442 11.5194L12.9498 12.1249L12.1246 12.9498L11.5191 12.3442C11.3228 12.1477 11.0212 12.1184 10.7845 12.2722C10.2547 12.618 9.67196 12.8592 9.05159 12.9891C8.77588 13.0472 8.58333 13.2816 8.58333 13.5593V14.4167H7.41667V13.5593C7.41667 13.2816 7.22412 13.0472 6.94812 12.9891C6.32804 12.8592 5.74528 12.618 5.21521 12.2719C5.11438 12.2061 5.00159 12.1739 4.88993 12.1739C4.7404 12.1739 4.59342 12.2317 4.48092 12.3442L3.87508 12.9498L3.05021 12.1246L3.65605 11.5191C3.85229 11.3223 3.88192 11.0203 3.72782 10.7848C3.38232 10.2553 3.14107 9.67224 3.0109 9.05159C2.9528 8.77588 2.71838 8.58333 2.44067 8.58333H1.58333V7.41667H2.44067C2.71838 7.41667 2.9528 7.22412 3.0109 6.94812C3.14079 6.32833 3.38204 5.74528 3.72782 5.21521C3.87964 4.98307 3.84945 4.67403 3.65576 4.48063L3.05021 3.87508L3.87537 3.05021L4.48092 3.65576C4.67773 3.85258 4.97909 3.88192 5.21549 3.72782C5.74528 3.38204 6.32804 3.14079 6.9484 3.0109C7.22412 2.9528 7.41667 2.71838 7.41667 2.44067V1.58333H8.58333V2.44067C8.58333 2.71838 8.77588 2.9528 9.05188 3.0109C9.67196 3.14079 10.2547 3.38204 10.7848 3.72811C11.0209 3.8822 11.3228 3.85258 11.5191 3.65576L12.1249 3.05021L12.9498 3.87508L12.3442 4.48063C12.1506 4.67403 12.1204 4.98307 12.2722 5.21521C12.618 5.74528 12.8592 6.32833 12.9891 6.9484C13.0472 7.22412 13.2816 7.41667 13.5593 7.41667H14.4167V8.58333Z" strokeWidth="0.25" />
                  </svg>Account Settings</button></li>
                  <li className="hover:bg-white hover:rounded-lg group"><button onClick={() => { signOut() }} className="text-white group-hover:text-gray-dark"><svg className="fill-white group-active:fill-white  group-hover:fill-[#111111]" width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.1946 6.16001V0.691352C6.1946 0.311098 6.50569 0 6.88595 0C7.2662 0 7.5773 0.311098 7.5773 0.691352V6.16001C7.5773 6.54026 7.2662 6.85136 6.88595 6.85136C6.50569 6.85136 6.1946 6.54026 6.1946 6.16001ZM11.2276 1.7838C10.9304 1.54182 10.4948 1.59022 10.2528 1.88059C10.0109 2.17788 10.0524 2.61342 10.3496 2.85539C11.6356 3.90624 12.3753 5.45487 12.3753 7.11412C12.3753 10.1424 9.90721 12.6104 6.87898 12.6104C3.85075 12.6104 1.38267 10.1424 1.38267 7.11412C1.38267 5.59314 1.99106 4.18278 3.09032 3.13193C3.36686 2.86921 3.38069 2.43367 3.11106 2.15713C2.84835 1.88059 2.41281 1.86676 2.13627 2.13639C0.760466 3.44996 0 5.21993 0 7.12099C0 10.9165 3.08354 14 6.87901 14C10.6745 14 13.758 10.9165 13.758 7.12099C13.758 5.04693 12.8316 3.10428 11.2207 1.7906L11.2276 1.7838Z" />
                  </svg>
                    Log Out</button></li>
                </ul>
              </div> :
              <div>
                <button
                  className="rounded-md hover:bg-blood-red border-white mr-2 p-1.5 px-4 text-sm text-white transition-all"
                  onClick={() => router.push('/login')}
                >
                  LOGIN
                </button>
                <button
                  className="rounded-md border border-white p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => router.push('/signup')}
                >
                  SIGN UP
                </button>
              </div>
          }

        </div>
      </div>
    </div>
  )
}


function SimpleNavbar({ router }: { router: AppRouterInstance }) {
  return (
    <div className="flex py-5 px-20 items-center justify-between w-full bg-gradient-to-b from-black to-transparent">
      <Logo />
    </div>
  )
}


interface GenerateNavBarProps {
  userName: string;
  pathName: string;
  onGenerate: () => void;
  onAllAssets: () => void;
  onAccountSettings: () => void;
  onLogOut: () => void;
}

const GenerateNavBar: React.FC<GenerateNavBarProps> = ({ userName, pathName, onGenerate, onAllAssets, onAccountSettings, onLogOut }) => {



  return (
    <div className="flex py-5 px-20 items-center justify-between w-full">
      <Logo />
      <div>
        <div className="flex flex-wrap gap-4">
          <button onClick={onGenerate} className={` btn ${pathName.startsWith("/generate") ? "bg-blood-red" : "bg-dark-gray "} text-sm w-40 text-white px-4 py-2 rounded`}>GENERATE</button>
          <button onClick={onAllAssets} className={`btn ${pathName.startsWith("/allassets") ? "bg-blood-red" : "bg-dark-gray "} text-sm text-white rounded w-40 flex items-center justify-center`}><img src="/images/diamond-icon.svg" alt="diamond" className="mr-2.5" />ALL ASSETS</button>

          <div className="dropdown dropdown-end">
            <button tabIndex={0} role="button" className=" btn border bg-transparent hover:bg-transparent hover:border-white border-white text-sm text-white rounded flex items-center justify-center"><img src="/images/profile-icon.png" alt="diamond" className="mr-2.5" />{userName}<img src="/images/dropdown-icon.png" alt="diamond" className="ml-4" /></button>
            <ul tabIndex={0} className="menu dropdown-content z-[1] border border-[#777777] mt-2 shadow bg-[#222222] rounded w-52 ">
              <li className="hover:bg-white  hover:rounded-lg group"><button onClick={onAccountSettings} className="text-white group-hover:text-gray-dark"><svg className="fill-white group-hover:fill-[#111111]" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4.5C6.06999 4.5 4.5 6.06999 4.5 8C4.5 9.93001 6.06999 11.5 8 11.5C9.93001 11.5 11.5 9.93001 11.5 8C11.5 6.06999 9.93001 4.5 8 4.5ZM8 10.9167C6.39185 10.9167 5.08333 9.60815 5.08333 8C5.08333 6.39185 6.39185 5.08333 8 5.08333C9.60815 5.08333 10.9167 6.39185 10.9167 8C10.9167 9.60815 9.60815 10.9167 8 10.9167Z" strokeWidth="0.25" />
                <path d="M14.4167 6.83333L13.5599 6.82849C13.4155 6.13749 13.1463 5.48722 12.7567 4.89307L13.3619 4.2878C13.4722 4.17786 13.5331 4.03145 13.5331 3.87565C13.5331 3.71956 13.4725 3.57288 13.3622 3.46265L12.5374 2.63778C12.3098 2.4102 11.9392 2.41048 11.7122 2.63778L11.1035 3.23962C10.5128 2.85368 9.86279 2.5848 9.16667 2.44067V1.58333C9.16667 1.26176 8.90491 1 8.58333 1H7.41667C7.09509 1 6.83333 1.26176 6.83333 1.58333L6.82849 2.4401C6.13721 2.5848 5.48722 2.85368 4.89335 3.24333L4.2878 2.63778C4.06051 2.41048 3.68994 2.41048 3.46265 2.63778L2.63778 3.46265C2.52755 3.57288 2.46688 3.71956 2.46688 3.87565C2.46688 4.03145 2.52783 4.17786 2.63778 4.28752L3.23962 4.8962C2.85368 5.48722 2.58451 6.13749 2.44067 6.83333H1.58333C1.26176 6.83333 1 7.09509 1 7.41667V8.58333C1 8.90491 1.26176 9.16667 1.58333 9.16667L2.4401 9.17151C2.58508 9.86336 2.85396 10.5133 3.24333 11.1069L2.63778 11.7122C2.4102 11.9398 2.4102 12.3098 2.63778 12.5374L3.46265 13.3622C3.68994 13.5898 4.06051 13.5892 4.2878 13.3622L4.89648 12.7604C5.48722 13.1463 6.13721 13.4152 6.83333 13.5593V14.4167C6.83333 14.7382 7.09509 15 7.41667 15H8.58333C8.90491 15 9.16667 14.7382 9.16667 14.4167L9.17151 13.5599C9.86279 13.4152 10.5128 13.1463 11.1066 12.7567L11.7122 13.3622C11.9392 13.5892 12.3098 13.5898 12.5374 13.3622L13.3622 12.5374C13.5898 12.3098 13.5898 11.9398 13.3622 11.7122L12.7604 11.1038C13.146 10.5133 13.4149 9.86336 13.5593 9.16667H14.4167C14.7382 9.16667 15 8.90491 15 8.58333V7.41667C15 7.09509 14.7382 6.83333 14.4167 6.83333ZM14.4167 8.58333H13.5593C13.2816 8.58333 13.0472 8.77588 12.9891 9.05188C12.8589 9.67224 12.6177 10.2553 12.2722 10.7848C12.1181 11.0203 12.1477 11.3223 12.3442 11.5194L12.9498 12.1249L12.1246 12.9498L11.5191 12.3442C11.3228 12.1477 11.0212 12.1184 10.7845 12.2722C10.2547 12.618 9.67196 12.8592 9.05159 12.9891C8.77588 13.0472 8.58333 13.2816 8.58333 13.5593V14.4167H7.41667V13.5593C7.41667 13.2816 7.22412 13.0472 6.94812 12.9891C6.32804 12.8592 5.74528 12.618 5.21521 12.2719C5.11438 12.2061 5.00159 12.1739 4.88993 12.1739C4.7404 12.1739 4.59342 12.2317 4.48092 12.3442L3.87508 12.9498L3.05021 12.1246L3.65605 11.5191C3.85229 11.3223 3.88192 11.0203 3.72782 10.7848C3.38232 10.2553 3.14107 9.67224 3.0109 9.05159C2.9528 8.77588 2.71838 8.58333 2.44067 8.58333H1.58333V7.41667H2.44067C2.71838 7.41667 2.9528 7.22412 3.0109 6.94812C3.14079 6.32833 3.38204 5.74528 3.72782 5.21521C3.87964 4.98307 3.84945 4.67403 3.65576 4.48063L3.05021 3.87508L3.87537 3.05021L4.48092 3.65576C4.67773 3.85258 4.97909 3.88192 5.21549 3.72782C5.74528 3.38204 6.32804 3.14079 6.9484 3.0109C7.22412 2.9528 7.41667 2.71838 7.41667 2.44067V1.58333H8.58333V2.44067C8.58333 2.71838 8.77588 2.9528 9.05188 3.0109C9.67196 3.14079 10.2547 3.38204 10.7848 3.72811C11.0209 3.8822 11.3228 3.85258 11.5191 3.65576L12.1249 3.05021L12.9498 3.87508L12.3442 4.48063C12.1506 4.67403 12.1204 4.98307 12.2722 5.21521C12.618 5.74528 12.8592 6.32833 12.9891 6.9484C13.0472 7.22412 13.2816 7.41667 13.5593 7.41667H14.4167V8.58333Z" strokeWidth="0.25" />
              </svg>Account Settings</button></li>
              <li className="hover:bg-white hover:rounded-lg group"><button onClick={onLogOut} className="text-white group-hover:text-gray-dark"><svg className="fill-white group-active:fill-white  group-hover:fill-[#111111]" width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.1946 6.16001V0.691352C6.1946 0.311098 6.50569 0 6.88595 0C7.2662 0 7.5773 0.311098 7.5773 0.691352V6.16001C7.5773 6.54026 7.2662 6.85136 6.88595 6.85136C6.50569 6.85136 6.1946 6.54026 6.1946 6.16001ZM11.2276 1.7838C10.9304 1.54182 10.4948 1.59022 10.2528 1.88059C10.0109 2.17788 10.0524 2.61342 10.3496 2.85539C11.6356 3.90624 12.3753 5.45487 12.3753 7.11412C12.3753 10.1424 9.90721 12.6104 6.87898 12.6104C3.85075 12.6104 1.38267 10.1424 1.38267 7.11412C1.38267 5.59314 1.99106 4.18278 3.09032 3.13193C3.36686 2.86921 3.38069 2.43367 3.11106 2.15713C2.84835 1.88059 2.41281 1.86676 2.13627 2.13639C0.760466 3.44996 0 5.21993 0 7.12099C0 10.9165 3.08354 14 6.87901 14C10.6745 14 13.758 10.9165 13.758 7.12099C13.758 5.04693 12.8316 3.10428 11.2207 1.7906L11.2276 1.7838Z" />
              </svg>
                Log Out</button></li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}