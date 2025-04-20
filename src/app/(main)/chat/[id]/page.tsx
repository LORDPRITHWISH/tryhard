"use client";

import type React from "react";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Send, FileText, Loader2, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

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
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const chatWindowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatBoldText = (text: string) => {
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
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError(null);
    setIsTyping(true);

 
    setChat((prevChat) => [...prevChat, { role: "user", content: question }]);

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
      setIsTyping(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chat, isTyping]);

  return (
    <div className="flex flex-col  bg-gradient-to-r from-blue-950 to-gray-900 p-4 md:p-8">
      <Card className="min-h-screen flex flex-col flex-1 shadow-xl border-0 bg-gradient-to-r from-blue-950 to-gray-900 text-white backdrop-blur-sm">
        <CardHeader className="border-b bg-gradient-to-r from-[#3b82f6] to-[#3d73cb] text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <FileText className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl md:text-2xl font-bold py-5 flex align-middle justify-center">
              PDF Chat Assistant
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <div
            ref={chatWindowRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-transparent"
          >
            {chat.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-300 space-y-4">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                  <Bot className="h-8 w-8 text-[#3b82f6]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">
                    Welcome to PDF Chat Assistant
                  </h3>
                  <p className="max-w-md mt-2">
                    Ask questions about your PDF documents and get instant
                    answers.
                  </p>
                </div>
              </div>
            ) : (
              chat.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex w-full",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-start gap-2 max-w-[80%]",
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <Avatar
                      className={cn(
                        "h-8 w-8 border-2",
                        message.role === "user"
                          ? "bg-[#3b82f6] border-violet-300"
                          : "bg-[#2e7dfd] border-purple-300"
                      )}
                    >
                      <AvatarFallback>
                        {message.role === "user" ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 text-sm md:text-base animate-fade-in",
                        message.role === "user"
                          ? "bg-[#2e7df6] text-white rounded-tr-none"
                          : "bg-gray-700 text-white rounded-tl-none"
                      )}
                    >
                      {formatBoldText(message.content)}
                    </div>
                  </div>
                </div>
              ))
            )}

            {isTyping && (
              <div className="flex items-start gap-2">
                <Avatar className="h-8 w-8 bg-[#3b82f6] border-2 border-purple-300">
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3">
                  <div className="flex space-x-1">
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="px-4 py-2 bg-red-900/50 border-l-4 border-red-500 text-white text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-gray-700 bg-gray-800 backdrop-blur-sm rounded-b-lg"
          >
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question about your PDF..."
                className="flex-1 bg-gray-700 text-white border-gray-600 focus:border-[#5393fa] focus:ring-[#3b82f6] placeholder:text-gray-400"
                disabled={loading}
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#0a68ff] hover:bg-[#3b83f6] text-white"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
