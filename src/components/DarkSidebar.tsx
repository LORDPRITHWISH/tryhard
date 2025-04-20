"use client";
import React, { useState, ReactNode } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { cn } from "@/lib/utils";
import { SignInButton, SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import {
  IconBrandTabler,
  IconUserBolt,
  IconSettings,
  IconNewSection,
  IconChartBubble,
  IconArrowLeft,
} from "@tabler/icons-react";
import { useParams } from "next/navigation";

type Props = {
  children: ReactNode;
};

export function DarkSidebar({ children }: Props) {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const id = params?.id;

  const links = [
    {
      label: "Summarize",
      href: `/summary/${id}`,
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "NoteCards",
      href: `/points/${id}`,
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Chat",
      href: `/chat/${id}`,
      icon: (
        <IconNewSection className="h-5 w-5 text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      label: "QNA",
      href: `/questions/${id}`,
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
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
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} className="" />
              ))}

              <SignedOut>
                <div className="flex w-full items-center justify-between">
                  <SignInButton />
                  <div className="h-5 w-5 text-neutral-500 dark:text-neutral-300">
                    <SignInButton />
                  </div>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="flex w-full items-center justify-between">
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="flex flex-1 overflow-auto">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
          {children}
        </div>
      </div>
    </div>
  );
}
