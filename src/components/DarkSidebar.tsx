"use client";
import React, { useState, ReactNode } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
// import { motion } from "framer-motion"; // FIXED: was wrong path
import { cn } from "@/lib/utils";
import { SignInButton, SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
type Props = {
  children: ReactNode;
};

export function DarkSidebar({ children }: Props) {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Home",
      href: "/home",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Points",
      href: "/points",
      icon: <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Chat",
      href: "/chat",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "About",
      href: "/about",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Question",
      href: "/question",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
  ];

  return (
    <div
      className={cn(
        "sticky flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="sticky flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {/* <Logo /> */}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} className="" />
              ))}
              <div>
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn></SignedIn>
              </div>
            </div>
          </div>
          <div>
            <div className="flex w-full items-center justify-between ">
              <UserButton />
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Child content here */}
      <div className="flex flex-1 overflow-auto">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">{children}</div>
      </div>
    </div>
  );
}
