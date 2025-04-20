"use client";

import { MainMenusGradientCard } from "@/components/AnimatedCard";
import { useParams } from "next/navigation";
import { TiFlash } from "react-icons/ti";

const Cardlist = [
  {
    title: "summary",
    description: "Explore the laws of nature.",
    withArrow: true,
    circleSize: 400,
    link: "/summary/",
    icon: <TiFlash size={50} />,
  },
  {
    title: "Flash Cards",
    description: "Discover the points.",
    withArrow: true,
    circleSize: 400,
    link: "/points/",
    icon: <TiFlash size={50} />,
  },
  {
    title: "Quiz",
    description: "Learn while answering questions.",
    withArrow: true,
    circleSize: 400,
    link: "/questions/",
    icon: <TiFlash size={50} />,
  },
  {
    title: "Chat",
    description: "Don't wait for last moment doubts",
    withArrow: true,
    circleSize: 400,
    link: "/chat/",
    icon: <TiFlash size={50} />,
  },
];

export default function AnimatedCardDemo() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="relative h-screen items-center grid w-5/6 grid-cols-1 gap-7 p-2 md:grid-cols-4 mx-auto justify-center">
      {Cardlist.map((card, index) => (
        <MainMenusGradientCard
          key={index}
          title={card.title}
          description={card.description}
          withArrow={card.withArrow}
          circleSize={card.circleSize}
          link={`${card.link}/${id}`}
        >
          <div className="flex h-full w-full items-center justify-center">
            {card.icon}
          </div>
        </MainMenusGradientCard>
      ))}
    </div>
  );
}
