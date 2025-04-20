"use client";
import { useState, useEffect, useRef } from "react";

interface TurnCardsProps {
  cardData: {
    title: string;
    symbol: string;
    facts: string[];
  }[];
}

export default function TurnCards({ cardData }: TurnCardsProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  if (!cardData) {
    return <div>Loading...</div>;
  }

  const goToNextCard = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % cardData.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToPrevCard = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCard((prev) => (prev - 1 + cardData.length) % cardData.length);
      setIsTransitioning(false);
    }, 300);
  };

  // Toggle pause/play
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(goToNextCard, 6000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  return (
    <div className="flex items-center justify-center w-full bg-transparent text-white font-sans py-10">
      <div className="relative w-full max-w-2xl px-4">
        <div
          className={`relative h-96 w-full rounded-xl p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 shadow-xl border border-indigo-500/20 transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="relative flex justify-center items-center mb-6">
            <div className="relative flex justify-center items-center">
              <div className="absolute w-20 h-20 bg-indigo-500/30 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute w-16 h-16 bg-indigo-400/20 rounded-full opacity-10 animate-ping"></div>

              <div className="relative text-6xl font-mono text-indigo-300 z-10">
                {cardData[currentCard].symbol}
              </div>
            </div>
          </div>

          <h2 className="text-2xl mb-6 font-semibold tracking-wider text-indigo-100 text-center">
            {cardData[currentCard].title}
          </h2>

          <div className="space-y-2">
            {cardData[currentCard].facts.map((fact, index) => (
              <p key={index} className="text-md text-gray-300 text-start">
                * {fact}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={togglePause}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors flex items-center"
            aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
          >
            <span className="mr-2">{isPaused ? "▶" : "❚❚"}</span>
            {isPaused ? "Resume" : "Pause"}
          </button>

          <button
            className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-md transition-colors flex items-center"
            aria-label="Download as PDF"
          >
            <span className="mr-2">↓</span>
            PDF
          </button>
        </div>

        <div className="absolute inset-x-0 top-1/3 flex justify-between items-center translate-y-3 px-8">
          <button
            onClick={goToPrevCard}
            className="bg-gray-600/50 hover:bg-slate-950/50 rounded-full p-2 text-white transition-colors"
            aria-label="Previous card"
          >
            ←
          </button>
          <button
            onClick={goToNextCard}
            className="bg-gray-600/50 hover:bg-slate-950/50 rounded-full p-2 text-white transition-colors"
            aria-label="Next card"
          >
            →
          </button>
        </div>

        <div className="mt-16 flex justify-center space-x-2">
          {cardData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentCard(index);
                  setIsTransitioning(false);
                }, 300);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentCard
                  ? "w-6 bg-indigo-500"
                  : "w-2 bg-gray-600 hover:bg-indigo-400"
              }`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
