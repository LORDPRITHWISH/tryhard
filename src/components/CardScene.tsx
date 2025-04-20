// components/CardScene.tsx
import { useState, useEffect, useRef } from "react";
import Card from "./Card";

export default function CardScene({ data }: any) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [nextCardIndex, setNextCardIndex] = useState(1);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const flipIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateHiddenCard = () => {
    // Logic handled through React state and rendering
  };

  const flipCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // After flip animation completes
    setTimeout(() => {
      // Update card indices
      setCurrentCardIndex(nextCardIndex);
      setNextCardIndex((nextCardIndex + 1) % data.length);

      // Toggle flip state
      setIsFlipped(!isFlipped);
      setIsAnimating(false);
    }, 1500); // Match transition duration
  };

  const handleIndicatorClick = (targetIndex: number) => {
    if (isAnimating) return;

    if (flipIntervalRef.current) {
      clearInterval(flipIntervalRef.current);
    }

    if (targetIndex !== currentCardIndex) {
      setNextCardIndex(targetIndex);
      flipCard();
    }
  };

  const startAutoFlip = () => {
    // Clear any existing interval
    if (flipIntervalRef.current) {
      clearInterval(flipIntervalRef.current);
    }

    // Random interval between 5-7 seconds
    const randomInterval = Math.floor(Math.random() * 2000) + 5000;

    flipIntervalRef.current = setInterval(() => {
      if (!isAnimating) {
        setNextCardIndex((currentCardIndex + 1) % data.length);
        flipCard();
      }
    }, randomInterval);
  };

  useEffect(() => {
    startAutoFlip();

    return () => {
      if (flipIntervalRef.current) {
        clearInterval(flipIntervalRef.current);
      }
    };
  }, [currentCardIndex, isAnimating]);

  return (
    <>
      <div className="card-scene w-[400px] h-[300px] perspective-1500 relative">
        <div
          ref={containerRef}
          className={`card-container w-full h-full relative preserve-3d transition-transform duration-[1.5s] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                     ${isFlipped ? "flipped" : ""}`}
        >
          <Card data={data[currentCardIndex]} isBack={false} />
          <Card data={data[nextCardIndex]} isBack={true} />
        </div>
      </div>

      <div className="card-indicator absolute bottom-[-40px] left-0 w-full flex justify-center gap-2.5">
        {data.map((_: any, i: any) => (
          <div
            key={i}
            className={`indicator w-3 h-3 rounded-full 
                       ${
                         i === currentCardIndex
                           ? "bg-[rgba(131,238,255,0.8)] transform scale-[1.3] shadow-[0_0_8px_rgba(131,238,255,0.6)]"
                           : "bg-[rgba(114,90,193,0.3)]"
                       }
                       transition-all duration-[0.4s] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                       cursor-pointer`}
            onClick={() => handleIndicatorClick(i)}
          />
        ))}
      </div>
    </>
  );
}
