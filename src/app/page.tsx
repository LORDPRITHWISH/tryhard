import HeroPage from "@/components/Hero";
import React from "react";
import PricingPage from "@/components/Pricing";
import { FeaturesSection } from "@/components/FeaturesSection";
import FintreeFooter from "@/components/FintreeFooter";
import TestimonialsSection from "@/components/Testimonial";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-black to-gray-900">
      <div className="flex-1 pt-20">
        <div className="space-y-20">
          <HeroPage />
          <FeaturesSection />
          <TestimonialsSection />
          {/* <PricingPage /> */}
        </div>
      </div>

      <FintreeFooter />
    </main>
  );
}
