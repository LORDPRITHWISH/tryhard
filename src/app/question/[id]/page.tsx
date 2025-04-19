"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import RPGQuiz from "@/components/RPGQuiz";
import { useParams } from "next/navigation";

export default function Home() {
  const [questions, setQuestions] = useState([]);

    const { id } = useParams();
  

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("/api/quiz", { params: { id } });
        setQuestions(res.data);
      } catch (err) {
        console.error("Failed to fetch questions", err);
      }
    };

    if (reference) fetchQuestions();
  }, [reference]);




  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <div className="App">
        {questions.length > 0 && (
          <RPGQuiz
            questions={questions}
            onComplete={(answers) => {
              console.log(`Quiz completed! Answers: ${answers.join(", ")}`);
            }}
          />
        )}
      </div>
    </main>
  );
}
