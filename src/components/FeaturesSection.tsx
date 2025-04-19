"use client";
import { FeatureCard } from "@/components/ui/FeatureCard";

const features = [
  {
    title: "Automated Data Analysis",
    description: "Quickly analyze data and extract insights with AI automation.",
    icon:"https://ik.imagekit.io/7b4kwmuj2/icon1.svg?updatedAt=1745051855939"
  },
  {
    title: "Predictive Analytics",
    description: "Forecast trends and make smarter decisions with AI predictions.",
    icon:"https://ik.imagekit.io/7b4kwmuj2/icon4.svg?updatedAt=1745051869021"
  },
  {
    title: "Natural Language Processing",
    description: "Process and understand human language for smarter interactions.",
    icon: "https://ik.imagekit.io/7b4kwmuj2/icon3.svg?updatedAt=1745052046763"
  },
  {
    title: "Customizable AI Models",
    description: "Easily adapt AI models to fit your business needs.",
    icon: "https://ik.imagekit.io/7b4kwmuj2/icon2.svg?updatedAt=1745051989080"
  },
  {
    title: "Real-Time Decision Making",
    description: "Make fast, data-driven decisions with AI-powered insights.",
    icon: "https://ik.imagekit.io/7b4kwmuj2/icon3.svg?updatedAt=1745052046763"
  },
  {
    title: "Scalable Infrastructure",
    description: "Scale your AI solutions effortlessly as your business grows.",
    icon: "https://ik.imagekit.io/7b4kwmuj2/icon3.svg?updatedAt=1745052046763"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="min-h-screen w-full from-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm text-gray-300 mb-4">
            Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            AI That Accelerates Your Business
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