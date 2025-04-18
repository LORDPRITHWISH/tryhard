"use client";
import { useState, useEffect, useRef } from "react";

export default function SpaceCards() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Space data array
  const spaceData = [
    {
      symbol: "⋆",
      title: "Neutron Stars",
      facts: [
        "Neutron stars can rotate up to 600 times per second",
        "They have a diameter of only about 20 kilometers",
        "Their density is so extreme that a teaspoon would weigh billions of tons",
      ],
    },
    {
      symbol: "⊛",
      title: "Black Holes",
      facts: [
        "The point of no return around a black hole is called the event horizon",
        "Supermassive black holes exist at the center of most galaxies",
        "Time appears to slow down near a black hole's event horizon",
      ],
    },
    {
      symbol: "⊕",
      title: "Exoplanets",
      facts: [
        "Over 5,000 exoplanets have been confirmed as of 2024",
        "Some exoplanets orbit their stars in just a few hours",
        "There are 'rogue planets' that drift through space with no star",
      ],
    },
    {
      symbol: "≋",
      title: "Nebulae",
      facts: ["Nebulae are vast clouds of gas and dust in space", "They can be sites of new star formation", "The Pillars of Creation is one of the most famous nebulae"],
    },
    {
      symbol: "◎",
      title: "Pulsars",
      facts: [
        "Pulsars emit beams of radiation from their magnetic poles",
        "They can be used as cosmic lighthouses for navigation",
        "The first pulsar was discovered in 1967 by Jocelyn Bell Burnell",
      ],
    },
  ];

  // Simple transition to next card
  const goToNextCard = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % spaceData.length);
      setIsTransitioning(false);
    }, 300);
  };

  // Simple transition to previous card
  const goToPrevCard = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCard((prev) => (prev - 1 + spaceData.length) % spaceData.length);
      setIsTransitioning(false);
    }, 300);
  };

  // Toggle pause/play
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Handle auto-rotation with pause capability
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
    <div className="flex items-center justify-center min-h-screen w-full bg-transparent text-white font-sans">
      {/* Main container */}
      <div className="relative w-full max-w-lg px-4">
        {/* Card */}
        <div
          className={`relative h-96 w-full rounded-xl p-6 bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl border border-indigo-500/20 transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Symbol with glowing effect */}
          <div className="relative flex justify-center items-center mb-6">
            {/* Pulsing glow background */}
            {/* <div className="absolute w-20 h-20 bg-indigo-500/30 rounded-full opacity-20 animate-pulse"></div> */}
            {/* <div className="absolute w-16 h-16 bg-indigo-400/20 rounded-full opacity-10 animate-ping"></div> */}

            {/* Symbol */}
            <div className="relative flex justify-center items-center">
              {/* Pulsing glow background */}
              <div className="absolute w-20 h-20 bg-indigo-500/30 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute w-16 h-16 bg-indigo-400/20 rounded-full opacity-10 animate-ping"></div>

              {/* Symbol */}
              <div className="relative text-6xl font-mono text-indigo-300 z-10">{spaceData[currentCard].symbol}</div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl mb-6 font-semibold tracking-wider text-indigo-100 text-center">{spaceData[currentCard].title}</h2>

          {/* Facts */}
          <div className="space-y-3">
            {spaceData[currentCard].facts.map((fact, index) => (
              <p key={index} className="text-sm text-gray-300 text-center">
                {fact}
              </p>
            ))}
          </div>
        </div>

        {/* Control buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          {/* Pause/Play button */}
          <button
            onClick={togglePause}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors flex items-center"
            aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
          >
            <span className="mr-2">{isPaused ? "▶" : "❚❚"}</span>
            {isPaused ? "Resume" : "Pause"}
          </button>

          {/* Download as PDF button */}
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-md transition-colors flex items-center" aria-label="Download as PDF">
            <span className="mr-2">↓</span>
            PDF
          </button>
        </div>

        {/* Navigation controls */}
        <div className="absolute inset-x-0 top-1/2 flex justify-between items-center -translate-y-1/2 px-2">
          <button onClick={goToPrevCard} className="bg-gray-800/50 hover:bg-indigo-800/50 rounded-full p-2 text-white transition-colors" aria-label="Previous card">
            ←
          </button>
          <button onClick={goToNextCard} className="bg-gray-800/50 hover:bg-indigo-800/50 rounded-full p-2 text-white transition-colors" aria-label="Next card">
            →
          </button>
        </div>

        {/* Progress indicators */}
        <div className="mt-16 flex justify-center space-x-2">
          {spaceData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentCard(index);
                  setIsTransitioning(false);
                }, 300);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentCard ? "w-6 bg-indigo-500" : "w-2 bg-gray-600 hover:bg-indigo-400"}`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
