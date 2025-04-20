"use client";
import { FeatureCard } from "@/components/ui/FeatureCard";

const features = [
  {
    title: "Smart Document Upload",
    description: "Upload PDFs or PPTs and let AI handle the rest—from conversion to analysis.",
    icon: "https://ik.imagekit.io/7b4kwmuj2/icon1.svg?updatedAt=1745051855939"
  },
  {
    title: "AI-Powered Summaries",
    description: "Get concise and effective summaries for faster revision and better retention.",
    icon: "https://ik.imagekit.io/7b4kwmuj2/icon2.svg?updatedAt=1745051989080"
  },
  {
    title: "Interactive Study Plans",
    description: "Personalized revision guides and study plans generated from your materials.",
    icon: "https://ik.imagekit.io/7b4kwmuj2/icon3.svg?updatedAt=1745052046763"
  },
  {
    title: "MCQ Practice & Scoring",
    description: "Test your knowledge with auto-generated questions and get instant scores.",
    icon: "https://ik.imagekit.io/7b4kwmuj2/icon4.svg?updatedAt=1745051869021"
  },
  {
    title: "Subject-Specific AI Agents",
    description: "Access expert AI agents for subjects like Computer Networks, DBMS, and more.",
    icon: "https://ik.imagekit.io/7b4kwmuj2/icon3.svg?updatedAt=1745052046763"
  },
  {
    title: "Gamified Learning Experience",
    description: "Earn points and track your progress as you study smarter with AI.",
    icon: "https://ik.imagekit.io/7b4kwmuj2/icon1.svg?updatedAt=1745051855939"
  }

];

export const FeaturesSection = () => {
  return (
    <section className=" bg-gradient-to-r from-black to-gray-900 min-h-1xl w-full py-7 px-4 sm:px-6 lg:px-8 mb-0.5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
        <div className="inline-block border border-gray-600 px-4 py-1 rounded-md mb-4">
            <span className="text-gray-400">Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            AI That Accelerates Your Studies
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Unleash the Power of AI with These Cutting-Edge Features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};