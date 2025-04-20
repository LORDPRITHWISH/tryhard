"use client";

import { MainMenusGradientCard } from "@/components/AnimatedCard";
import { useParams } from "next/navigation";
import { RiFileTextLine, RiSdCardLine, RiQuestionLine, RiChatSmile3Line } from "react-icons/ri";

const CardList = [
  {
    title: "Summary",
    description: "Explore the key concepts and main ideas",
    withArrow: true,
    circleSize: 400,
    link: "/summary/",
    icon: <RiFileTextLine size={50} />,
    color: "from-blue-400 to-cyan-300"
  },
  {
    title: "Flash Cards",
    description: "Review important points and definitions",
    withArrow: true,
    circleSize: 400,
    link: "/points/",
    icon: <RiSdCardLine size={50} />,
    color: "from-purple-400 to-indigo-400"
  },
  {
    title: "Quiz",
    description: "Test your knowledge with interactive questions",
    withArrow: true,
    circleSize: 400,
    link: "/questions/",
    icon: <RiQuestionLine size={50} />,
    color: "from-pink-400 to-rose-400"
  },
  {
    title: "Chat",
    description: "Get instant answers to your questions",
    withArrow: true,
    circleSize: 400,
    link: "/chat/",
    icon: <RiChatSmile3Line size={50} />,
    color: "from-amber-400 to-orange-400"
  },
];

export default function AnimatedCardDemo() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4">
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">
          Choose Your Learning Path
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Select an option below to start exploring and mastering the material
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CardList.map((card, index) => (
          <MainMenusGradientCard
            key={index}
            title={card.title}
            description={card.description}
            withArrow={card.withArrow}
            circleSize={card.circleSize}
            link={`${card.link}/${id}`}
            className={`bg-gradient-to-br ${card.color} bg-opacity-10`}
          >
            <div className="flex h-full w-full items-center justify-center">
              {card.icon}
            </div>
          </MainMenusGradientCard>
        ))}
      </div>
    </div>
  );
}