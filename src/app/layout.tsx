"use client";
import "@/css/satoshi.css";
import "@/css/style.css";

import { Sidebar } from "@/components/Layouts/sidebar";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Header } from "@/components/Layouts/header";
// import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useState, type PropsWithChildren } from "react";
import { Providers } from "./providers";
import { usePathname, useRouter } from "next/navigation";
import SignUp from "@/components/Auth/Signup";
import SignIn from "@/components/Auth/Signin";
import { verifyUser } from "@/lib/auth-apis/auth";
// import SignIn from "./auth/sign-in/page";
// import { useRouter } from "next/router";

// export const metadata = {
//   title: {
//     template: "%s | NextAdmin - Next.js Dashboard Kit",
//     default: "NextAdmin - Next.js Dashboard Kit",
//   },
//   description:
//     "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
// };

export default function RootLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();

  const checkUserLogin =async()=>{
    try {
      const res = await verifyUser();
      if(res?.data?.user) {
        router.push("/");
      } else {
        router.push("/sign-in");
      }
    } catch (error) {
      console.log("Error while verify user", error);
    }
  }
  useEffect(()=>{
    checkUserLogin();
  },[])
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />
            {
            pathname.includes('sign-up') ? <SignUp/> :
            pathname.includes('sign-in') ? <SignIn/> :
          <div className="flex min-h-screen">
            <Sidebar />

            <div className="w-full bg-gray-3 dark:bg-[#020d1a]">
              <Header />

              <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                {children}
              </main>
            </div>
          </div>}
        </Providers>
      </body>
    </html>
  );
}
