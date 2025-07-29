'use client';

import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import SignUp from "@/components/Auth/Signup";
import SignIn from "@/components/Auth/Signin";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { verifyUser } from "@/lib/auth-apis/auth";
import ForgotPassword from "@/components/Auth/forgot-password/ForgotPassword";
import ResetPassword from "@/components/Auth/reset-password/ResetPassword";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkUserLogin();
  }, []);

  const checkUserLogin = async () => {
    try {
      const res = await verifyUser();
      if (res?.data?.user) {
        router.push("/");
      } else {
        router.push("/sign-in");
      }
    } catch (error) {
      console.log("Error while verify user", error);
    }
  };

  if (!mounted) return null;

  if (pathname.includes("sign-up")) return <SignUp />;
  if (pathname.includes("sign-in")) return <SignIn />;
  if (pathname.includes("forgot-password")) return <ForgotPassword />;
  if (pathname.includes("reset-password")) return <ResetPassword />;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full bg-gray-3 dark:bg-[#020d1a]">
        <Header />
        <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
