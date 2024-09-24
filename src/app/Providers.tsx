"use client";

import { TooltipProvider } from "@/components/Tooltip";
import { ToastContainer } from "react-toastify";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      {children}
      <ToastContainer />
    </TooltipProvider>
  );
}
