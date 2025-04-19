"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import TurnCards from "@/components/TurnCards";
import { useParams } from "next/navigation";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  // Add other properties as needed
}

export default function Home() {
  const [spaceCards, setSpaceCards] = useState<Flashcard[]>([]);
  const params = useParams();
  const reference = params?.reference as string | undefined;

  useEffect(() => {
    const fetchCards = async () => {
      if (!reference) return;
      try {
        const formData = new FormData();
        formData.append("id", reference);

        const res = await axios.post("/api/flashcard", formData, {
          withCredentials: true,
        });

        if (res.data?.data) {
          setSpaceCards(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch flashcards", err);
      }
    };

    fetchCards();
  }, [reference]);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-center items-center">
      {spaceCards.length > 0 ? (
        // <TurnCards />
        <p>woww</p>
      ) : (
        <p className="text-lg text-gray-400">Loading flashcards...</p>
      )}
      <div className="flex flex-col items-center w-full bg-transparent text-white font-sans mt-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to TryHard</h1>
        <p className="text-lg">Explore the wonders of Knowledge!</p>
      </div>
    </div>
  );
}
