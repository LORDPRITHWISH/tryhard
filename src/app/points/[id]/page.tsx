"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import TurnCards from "@/components/TurnCards";
import { useParams } from "next/navigation";

export default function Home() {
  const [spaceCards, setSpaceCards] = useState([]);
  const [Loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const formData = new FormData();
        if (id) {
          formData.append("id", id.toString());
        }

        const res = await axios.post("/api/flashcard", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        setSpaceCards(res.data.flashcard);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch flashcards", err);
      }
    };

    if (id) fetchCards();
  }, [id]);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-center items-center">
      {Loading ? (<h1>Loading...</h1>) : (spaceCards.length > 0 && <TurnCards cardData={spaceCards} />)}
      <div className="flex flex-col items-center w-full bg-transparent text-white font-sans">
        <h1 className="text-4xl font-bold mb-8">Welcome to TryHard</h1>
        <p className="text-lg">Explore the wonders of Knowledge!</p>
      </div>
    </div>
  );
}
