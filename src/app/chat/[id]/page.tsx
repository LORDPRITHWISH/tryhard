"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

interface ChatMessage {
  role: "user" | "bot";
  content: string;
}

export default function PDFMultiFileChatBot() {
  const { id } = useParams();
  const [question, setQuestion] = useState<string>("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const chatWindowRef = useRef<HTMLDivElement>(null);

  const formatBoldText = (text: string): JSX.Element[] => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          question,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setChat((prevChat) => [
          ...prevChat,
          { role: "user", content: question },
          { role: "bot", content: data.answer },
        ]);
      } else {
        setError(data.error || "Failed to process the PDF.");
      }
    } catch (err: unknown) {
      setError("An error occurred while contacting the server." + err);
    } finally {
      setQuestion("");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="container mx-auto p-6 bg-red-50 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-red-700 mb-4">
        PDF Chat Assistant
      </h1>

      <div
        ref={chatWindowRef}
        className="chat-window border rounded-lg p-4 h-96 overflow-y-auto bg-white mb-4 shadow-inner scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-red-100"
      >
        {chat.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <p
              className={`p-2 rounded-lg inline-block ${
                message.role === "user"
                  ? "bg-red-500 text-white"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {formatBoldText(message.content)}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here"
          className="focus:border-red dark:text-red-600 text-red-700 mt-1 p-2 block w-full border border-red-300 rounded-md focus:ring-red-500 focus:border-red-300 focus:outline-none focus:ring-0"
          required
        />

        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition ease-in-out"
          disabled={loading}
        >
          {loading ? "Processing..." : "Ask Question"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}
