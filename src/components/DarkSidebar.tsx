"use client";
import React, { useState, ReactNode } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";

import { cn } from "@/lib/utils";
import { SignInButton, SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import {
  IconBrandGithub,
  IconHome,
  IconNewSection,
  IconChartBubble,
} from "@tabler/icons-react";
type Props = {
  children: ReactNode;
};

export function DarkSidebar({ children }: Props) {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Home",
      href: "/home",
      icon: <IconHome className="h-5 w-5 text-neutral-500 dark:text-neutral-300" />,
    },
    {
      label: "Points",
      href: "/points",
      icon: <IconNewSection className="h-5 w-5 text-neutral-500 dark:text-neutral-300" />,
    },
    {
      label: "Chat",
      href: "/chat/[id]",
      icon: <IconChartBubble className="h-5 w-5 text-neutral-500 dark:text-neutral-300" />,
    },
    // {
    //   label: "About",
    //   href: "/about",
    //   icon: <IconBrandX className="h-5 w-5 text-neutral-500 dark:text-neutral-300" />,
    // },
    {
      label: "Github",
      href:"https://github.com/LORDPRITHWISH/tryhard",
      icon: <IconBrandGithub className="h-5 w-5 text-neutral-500 dark:text-neutral-300" />,
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
            <div className="h-5 w-5 text-neutral-500 dark:text-neutral-300">
            <UserButton />
              </div> 
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} className="" />
              ))}
              <div>
                <SignedOut>
                  <div className="h-5 w-5 text-neutral-500 dark:text-neutral-300 ">
                  <SignInButton />
                  </div>
                  
                </SignedOut>
                <SignedIn></SignedIn>
              </div>
              
            </div>
          </div>
          <div>
            
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