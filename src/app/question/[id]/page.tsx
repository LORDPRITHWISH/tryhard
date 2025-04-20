"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import RPGQuiz from "@/components/RPGQuiz";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number }>>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
    }));
    setStars(newStars);
  }, []);

  const { id } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const formData = new FormData();
        if (id) {
          formData.append("id", id.toString());
        }

        const res = await axios.post("/api/quiz", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
        console.log("data is ", res.data);
        setLoading(false);
        setQuestions(res.data.QNA);
      } catch (err) {
        console.error("Failed to fetch questions", err);
      }
    };

    if (id) fetchQuestions();
  }, [id]);

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <div className="App">
       
        <div className="absolute inset-0 overflow-hidden">
          {stars.map((star, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                left: `${star.x}%`,
                top: `${star.y}%`,
                opacity: Math.random() * 0.7 + 0.3,
                boxShadow: `0 0 ${star.size * 2}px ${star.size / 2}px rgba(255,255,255,0.8)`,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                repeatType: "mirror",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/50 via-purple-950/20 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.15),transparent_70%)]" />

        {Loading ? (
          <h1 className="text-4xl font-bold mb-8">Loading...</h1>
        ) : (
          <div className="flex flex-col items-center w-full bg-transparent text-white font-sans">
            <h1 className="text-4xl font-bold mb-8">Welcome to TryHard</h1>
            <p className="text-lg">Explore the wonders of Knowledge!</p>
            {questions.length > 0 && (
              <RPGQuiz
                questions={questions}
                onComplete={(answers) => {
                  console.log(`Quiz completed! Answers: ${answers.join(", ")}`);
                }}
              />
            )}
          </div>
        )}
      </div>
    </main>
  );
}
