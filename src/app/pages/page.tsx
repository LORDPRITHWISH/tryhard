
import {FloatingDock} from '@/components/ui/floating-dock'
import HeroPage from '@/components/Hero'
import React from 'react'
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
} from "@tabler/icons-react";
const HomePage = () => {
  return (
    <main className="min-h-screen">
    <div className="flex items-center justify-center h-[7rem] w-full">
    {/* <NavbarPage/> */}
    <FloatingDock 
      items={[
        { title: "Home",
          icon: (
            <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "#", },
        { title: "Components",
          icon: (
            <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "#", },
        { title: "Changelog",
          icon: (
            <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "#", },
        { title: "Twitter",
          icon: (
            <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "#", },
        { title: "GitHub",
          icon: (
            <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "#", },
        
      ]}
     />
    </div>
    <div className='page-transition'>
    <HeroPage/>

    </div>
    {/* footer */}
    </main>
  )
}

export default HomePage