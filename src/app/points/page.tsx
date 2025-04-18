"use client";
import { useState, useEffect, useRef } from "react";

export default function SpaceFlipCards() {
  const [currentCard, setCurrentCard] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [direction, setDirection] = useState("next");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const spaceCards = [
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
    {
      symbol: "◈",
      title: "Galaxies",
      facts: [
        "The Milky Way contains between 100-400 billion stars",
        "Galaxies can be spiral, elliptical, or irregular in shape",
        "Most galaxies are between 10 billion and 13.6 billion years old",
      ],
    },
    {
      symbol: "✧",
      title: "Solar Flares",
      facts: [
        "Solar flares can eject billions of tons of matter into space",
        "A large flare can release energy equivalent to millions of hydrogen bombs",
        "They can disrupt radio communications and power grids on Earth",
      ],
    },
    {
      symbol: "⊗",
      title: "Quasars",
      facts: [
        "Quasars are among the brightest objects in the universe",
        "They are powered by supermassive black holes at galaxy centers",
        "Some quasars produce more energy than 1,000 galaxies combined",
      ],
    },
    {
      symbol: "◬",
      title: "Dark Matter",
      facts: [
        "Dark matter makes up about 27% of the universe",
        "It cannot be directly observed as it doesn't emit light",
        "Its existence is inferred from gravitational effects on visible matter",
      ],
    },
    {
      symbol: "⧖",
      title: "Cosmic Microwave Background",
      facts: [
        "The CMB is the oldest light in the universe",
        "It dates back to about 380,000 years after the Big Bang",
        "Temperature variations in the CMB reveal the early universe's structure",
      ],
    },
  ];

  // Clear any existing timeout when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Set up the card rotation interval
  useEffect(() => {
    const rotateCard = () => {
      setFlipping(true);
      setDirection("next");

      // Clear any existing timeout
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Set timeout to change card after animation starts
      timeoutRef.current = setTimeout(() => {
        setCurrentCard((prev) => (prev + 1) % spaceCards.length);

        // Reset flipping state after animation completes
        setTimeout(() => {
          setFlipping(false);
        }, 600);
      }, 400);
    };

    // Set interval for card rotation
    const intervalId = setInterval(rotateCard, 6000);

    // Clean up interval on unmount
    return () => {
      clearInterval(intervalId);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [spaceCards.length]);

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full bg-black overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, rgba(25,10,40,1) 0%, rgba(5,5,15,1) 70%, rgba(0,0,0,1) 100%)",
        backgroundSize: "cover",
      }}
    >
      {/* Star field background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out`,
            }}
          />
        ))}

        {/* Add nebula clouds */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, rgba(128,0,255,0.4) 0%, rgba(0,0,0,0) 60%), radial-gradient(circle at 70% 60%, rgba(75,0,130,0.4) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
      </div>

      {/* Main container */}
      <div className="relative w-full max-w-lg px-4">
        {/* 3D space for card */}
        <div className="relative h-96 w-full perspective">
          {/* Card */}
          <div
            className={`relative w-full h-full transition-all duration-1000 transform-style`}
            style={{
              transform: flipping ? `rotate${direction === "next" ? "Y" : "X"}(${direction === "next" ? "180deg" : "-180deg"})` : "rotateY(0deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Front face */}
            <div
              className="absolute inset-0 backface-hidden w-full h-full rounded-xl flex flex-col items-center justify-center p-6 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(20,20,40,0.8) 0%, rgba(10,10,30,0.9) 100%)",
                boxShadow: "0 0 20px rgba(128, 0, 255, 0.4), 0 0 40px rgba(75, 0, 130, 0.2), inset 0 0 4px rgba(150, 100, 255, 0.3)",
                border: "1px solid rgba(150, 100, 255, 0.3)",
                backfaceVisibility: "hidden",
              }}
            >
              {/* Symbol */}
              <div
                className="text-7xl mb-6 font-mono"
                style={{
                  color: "#7DF9FF",
                  textShadow: "0 0 10px rgba(125, 249, 255, 0.8), 0 0 20px rgba(64, 224, 208, 0.4)",
                  animation: "pulse 2s infinite ease-in-out",
                }}
              >
                {spaceCards[currentCard].symbol}
              </div>

              {/* Title */}
              <h2
                className="text-3xl mb-6 font-mono tracking-wider"
                style={{
                  color: "#E0FFFF",
                  textShadow: "0 0 5px rgba(224, 255, 255, 0.5)",
                }}
              >
                {spaceCards[currentCard].title}
              </h2>

              {/* Facts */}
              <div className="space-y-3">
                {spaceCards[currentCard].facts.map((fact, index) => (
                  <p
                    key={index}
                    className="text-sm font-mono"
                    style={{
                      color: "#B0E0E6",
                      textShadow: "0 0 2px rgba(176, 224, 230, 0.3)",
                    }}
                  >
                    {fact}
                  </p>
                ))}
              </div>
            </div>

            {/* Back face (identical structure but flipped) */}
            <div
              className="absolute inset-0 backface-hidden w-full h-full rounded-xl flex flex-col items-center justify-center p-6 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(20,20,40,0.8) 0%, rgba(10,10,30,0.9) 100%)",
                boxShadow: "0 0 20px rgba(128, 0, 255, 0.4), 0 0 40px rgba(75, 0, 130, 0.2), inset 0 0 4px rgba(150, 100, 255, 0.3)",
                border: "1px solid rgba(150, 100, 255, 0.3)",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              {/* This content will be updated in the DOM after flip animation */}
              <div
                className="text-7xl mb-6 font-mono"
                style={{
                  color: "#7DF9FF",
                  textShadow: "0 0 10px rgba(125, 249, 255, 0.8), 0 0 20px rgba(64, 224, 208, 0.4)",
                  animation: "pulse 2s infinite ease-in-out",
                }}
              >
                {spaceCards[currentCard].symbol}
              </div>

              <h2
                className="text-3xl mb-6 font-mono tracking-wider"
                style={{
                  color: "#E0FFFF",
                  textShadow: "0 0 5px rgba(224, 255, 255, 0.5)",
                }}
              >
                {spaceCards[currentCard].title}
              </h2>

              <div className="space-y-3">
                {spaceCards[currentCard].facts.map((fact, index) => (
                  <p
                    key={index}
                    className="text-sm font-mono"
                    style={{
                      color: "#B0E0E6",
                      textShadow: "0 0 2px rgba(176, 224, 230, 0.3)",
                    }}
                  >
                    {fact}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress indicators */}
        <div className="absolute -bottom-10 left-0 right-0 flex justify-center space-x-2">
          {spaceCards.map((_, index) => (
            <div
              key={index}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: index === currentCard ? "24px" : "16px",
                backgroundColor: index === currentCard ? "rgba(125, 249, 255, 0.8)" : "rgba(75, 0, 130, 0.5)",
                boxShadow: index === currentCard ? "0 0 8px rgba(125, 249, 255, 0.6)" : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .perspective {
          perspective: 1500px;
        }

        .transform-style {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
