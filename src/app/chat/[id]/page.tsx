"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Send, FileText, Loader2 } from "lucide-react";

interface ChatMessage {
  role: "user" | "bot";
  content: string;
  timestamp: string;
}

export default function PDFMultiFileChatBot() {
  const { id } = useParams();
  const [question, setQuestion] = useState<string>("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const chatWindowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatBoldText = (text: string): JSX.Element[] => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  const getCurrentTime = (): string => {
    return new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError(null);
    
    const currentQuestion = question;
    setQuestion("");
    
    // Add user message immediately for better UX
    setChat(prevChat => [
      ...prevChat,
      { role: "user", content: currentQuestion, timestamp: getCurrentTime() }
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          question: currentQuestion,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setChat(prevChat => [
          ...prevChat,
          { role: "bot", content: data.answer, timestamp: getCurrentTime() }
        ]);
      } else {
        setError(data.error || "Failed to process the PDF.");
      }
    } catch (err: unknown) {
      setError("An error occurred while contacting the server.");
      console.error(err);
    } finally {
      setLoading(false);
      // Focus input after sending
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="flex flex-col h-screen max-h-screen bg-[#111827]">
      {/* Header */}
      <header className="bg-[#1F2937] border-b border-gray-800 p-4 shadow-md">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <FileText className="text-indigo-400 h-6 w-6" />
            <h1 className="text-2xl font-bold text-white">PDF Chat Assistant</h1>
          </div>
          {id && (
            <div className="text-sm text-gray-300 px-3 py-1 bg-gray-700 rounded-full">
              Document ID: {id}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden p-4 md:p-6 max-w-6xl w-full mx-auto">
        {/* Chat Window */}
        <div 
          ref={chatWindowRef}
          className="flex-1 overflow-y-auto bg-[#0B1121] rounded-lg h-[calc(100vh-220px)] p-4 mb-4"
        >
          {chat.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <FileText className="h-16 w-16 mb-4 text-indigo-500 opacity-50" />
              <p className="text-center max-w-md">
                Ask questions about your PDF documents and get instant answers. 
                Your conversation will appear here.
              </p>
            </div>
          ) : (
            chat.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.role === "user" ? "flex justify-end" : "flex justify-start"}`}
              >
                <div
                  className={`relative max-w-3/4 md:max-w-2/3 px-4 py-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-[#2D3748] text-white"
                  }`}
                >
                  <div className="whitespace-pre-wrap">
                    {formatBoldText(message.content)}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      message.role === "user" ? "text-indigo-200" : "text-gray-400"
                    }`}
                  >
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="bg-[#2D3748] rounded-2xl px-4 py-3 flex items-center">
                <Loader2 className="h-5 w-5 text-indigo-400 animate-spin mr-2" />
                <span className="text-gray-300">Thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="relative bg-[#1F2937] rounded-full p-1 shadow-lg">
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about your PDF..."
              className="w-full p-3 px-5 bg-transparent text-white placeholder-gray-400 focus:outline-none"
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 disabled:bg-gray-700 disabled:opacity-50 mr-1"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-900/30 border-l-4 border-red-500 text-red-200 rounded">
            <p className="text-sm">{error}</p>
          </div>
        )}
      </main>
    </div>
  );
}