"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";
import ClientLayout from "./clientLayout";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ClientLayout>
        <ThemeProvider>{children}</ThemeProvider>
      </ClientLayout>
    </SidebarProvider>
  );
}
