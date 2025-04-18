// components/Card.tsx
import { SpaceFact } from "../types";
import { useEffect, useRef } from "react";

interface CardProps {
  data: SpaceFact;
  isBack?: boolean;
}

export default function Card({ data, isBack = false }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const symbol = cardRef.current.querySelector(".symbol");
    const title = cardRef.current.querySelector(".content h2");
    const paragraphs = cardRef.current.querySelectorAll(".content p");

    if (symbol instanceof HTMLElement) {
      symbol.style.animation = "none";
      symbol.offsetHeight; // Force reflow
      symbol.style.animation = "symbolFadeIn 0.8s forwards 0.4s ease-out";
    }

    if (title instanceof HTMLElement) {
      title.style.animation = "none";
      title.offsetHeight; // Force reflow
      title.style.animation = "fadeUpIn 0.6s forwards 0.6s ease-out";
    }

    paragraphs.forEach((p, i) => {
      if (p instanceof HTMLElement) {
        p.style.animation = "none";
        p.offsetHeight; // Force reflow
        p.style.animation = `fadeUpIn 0.6s forwards ${0.7 + i * 0.1}s ease-out`;
      }
    });
  }, [data]);

  return (
    <div
      ref={cardRef}
      className={`card absolute w-full h-full backface-hidden rounded-xl p-8 flex flex-col justify-center items-center text-center
                  bg-gradient-to-br from-[rgba(30,20,60,0.8)] to-[rgba(15,10,30,0.95)]
                  shadow-[0_0_15px_rgba(114,90,193,0.5),0_0_30px_rgba(114,90,193,0.2)]
                  border border-[rgba(138,116,218,0.3)] 
                  transition-all duration-300 ease-in-out
                  hover:shadow-[0_0_25px_rgba(114,90,193,0.8),0_0_40px_rgba(114,90,193,0.4)]
                  ${isBack ? "card-back" : "card-front"}`}
    >
      <div className="symbol text-6xl mb-6 transform-gpu translate-z-30 opacity-0">{data.symbol}</div>
      <div className="content w-full font-orbitron leading-relaxed text-base tracking-wider transform-gpu translate-z-20">
        <h2 className="mb-3 text-[22px] text-[#a4fbff] uppercase opacity-0 transform translate-y-5">{data.title}</h2>
        {data.facts.map((fact, i) => (
          <p key={i} className="mb-2 text-[#e0e0ff] opacity-0 transform translate-y-4">
            {fact}
          </p>
        ))}
      </div>
    </div>
  );
}
