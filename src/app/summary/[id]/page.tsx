"use client";

import ExamNotesSummary from "@/components/ExamNotesSummary";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

// Define the TopicSection type
type TopicSection = {
  title: string;
  content: string;
};

type ConceptsData = {
  summary: {
    "Key Concepts and Definitions": TopicSection[];
    formulas?: { formula: string; description: string }[];
    datesAndFacts?: { date: string; fact: string }[];
    summary: string[];
    memoryTips?: { tip: string; description: string }[];
  };
};

export default function ConceptNotesPage() {
  const [conceptsData, setconceptsData] = useState<ConceptsData | null>(null);
  const [Loading, setLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const formData = new FormData();
        if (id) {
          formData.append("id", id.toString());
        }

        const res = await axios.post("/api/summary", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        console.log("data is ", res.data);
        setconceptsData(res.data); // assuming res.data = { summary: [...] }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch Summary", err);
      }
    };

    if (id) fetchSummary();
  }, [id]);

  return (
    <div className="min-h-screen">
      {Loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading...</p>
        </div>
      ) : (
        conceptsData &&
        conceptsData.summary.length > 0 && (
          <main className="container mx-auto py-8 px-4">
            <ExamNotesSummary data={conceptsData.summary} />
          </main>
        )
      )}
    </div>
  );
}
