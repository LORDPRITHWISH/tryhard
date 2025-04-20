"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import RPGQuiz from "@/components/RPGQuiz";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [Loading, setLoading] = useState(true);


 

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
        setLoading(false);
      }
    };

    if (id) fetchQuestions();
  }, [id]);

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <div className="App">
       
        {Loading ? (
          <h1 className="text-4xl font-bold mb-8">Loading...</h1>
        ) : (
          <div className="flex flex-col items-center w-full bg-transparent text-white font-sans">
            <h1 className="text-4xl font-bold mb-3 mt-2">Welcome to TryHard</h1>
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
