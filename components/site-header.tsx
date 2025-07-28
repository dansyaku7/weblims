"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLoading } from "./context/LoadingContext";

export function SiteHeader() {
  const { isLoading } = useLoading();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isLoading) {
      setProgress(10);
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 95 ? 95 : prev + 1));
      }, 100);
    } else {
      if (progress > 0) {
        setProgress(100);
        setTimeout(() => setProgress(0), 500);
      }
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isLoading]);

  return (
    <header className="relative flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      {progress > 0 && (
        <Progress
          value={progress}
          className="absolute top-0 left-0 w-full h-[3px] rounded-none bg-transparent"
        />
      )}

      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="text-base font-medium">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
