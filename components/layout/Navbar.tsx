"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ModeToggle } from "../mode-toggle";
import { Logo } from "@/components/logo";
import { AuthDialog } from "@/components/AuthDialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLoading } from "../context/LoadingContext";

export const Navbar = () => {
  const [menuState, setMenuState] = React.useState(false);
  const { isLoading } = useLoading();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isLoading) {
      setProgress(10);
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(timer);
            return 95;
          }
          return prev + 1;
        });
      }, 100);
    } else {
      if (progress > 0) {
        setProgress(100);
        setTimeout(() => setProgress(0), 500);
      }
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isLoading]);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl relative"
      >
        {progress > 0 && (
          <Progress
            value={progress}
            className="absolute top-0 left-0 w-full h-[3px] rounded-none bg-transparent"
          />
        )}
        <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
          <div className="flex justify-between items-center py-3 lg:py-4">
            <div className="flex items-center">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Logo />
              </Link>
            </div>

            <div className="flex justify-end items-center gap-4">
              <div className="hidden lg:flex items-center gap-3">
                <AuthDialog />
                <Link href="/dashboard">
                  <Button size="sm">View as Guest</Button>
                </Link>
                <ModeToggle />
              </div>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div
              className={`${
                menuState ? "block" : "hidden"
              } bg-background lg:hidden col-span-3 mt-4 w-full rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 dark:shadow-none`}
            >
              <div className="flex flex-col space-y-3">
                <AuthDialog />
                <Link href="/dashboard">
                  <Button className="w-full">View as Guest</Button>
                </Link>
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
