import {FloatingDock} from '@/components/ui/floating-dock'
import HeroPage from '@/components/Hero'
import React from 'react'
import PricingPage from '@/components/Pricing'
import {FeaturesSection} from '@/components/FeaturesSection'
import FintreeFooter from '@/components/FintreeFooter'

import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
} from "@tabler/icons-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navigation Section */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center justify-center h-20 w-full">
          <FloatingDock 
            items={[
              { 
                title: "Home",
                icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
                href: "#" 
              },
              { 
                title: "Components",
                icon: <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
                href: "#" 
              },
              { 
                title: "Changelog",
                icon: <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
                href: "#" 
              },
              { 
                title: "Twitter",
                icon: <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
                href: "#" 
              },
              { 
                title: "GitHub",
                icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
                href: "#" 
              },
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-20">
        <div className="space-y-20">
          <HeroPage />
          <FeaturesSection />
          <PricingPage />
        </div>
      </div>
      
      {/* Footer */}
      <FintreeFooter />
    </main>
  );
}
