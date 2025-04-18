"use client"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect, useRef } from "react";
import { Book, Clock, Calendar, HelpCircle, FileText, BookOpen, Brain } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface StudyPlan {
  topic: string;
  roadmap: string[];
  resources: string[];
  created: Date;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash" 
});

// Create a system prompt to instruct the AI on its purpose
const SYSTEM_PROMPT = `You are StudyNOW Assistant, an AI specifically designed to help students with their academic needs.
Your main functions are:
1. Creating personalized study plans with clear timelines
2. Building learning roadmaps showing progression from basic to advanced concepts
3. Answering academic questions with simple, clear explanations
4. Providing study tips and techniques
5. Helping break down complex topics into digestible parts

Always provide concise, easy-to-understand answers. For complex topics, use analogies and examples.
When creating study plans, be specific about time allocations and learning objectives.`;

export default function StudyAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"chat" | "plan" | "roadmap" | "doubts">("chat");
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
  const [subject, setSubject] = useState("");
  const [timeframe, setTimeframe] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add initial welcome message
  useEffect(() => {
    setMessages([
      { 
        role: "assistant", 
        content: "Welcome to StudyNOW! I'm your study assistant. I can help you create study plans, build learning roadmaps, clear your doubts, and provide simple explanations. How can I help you today?" 
      }
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && mode === "chat") return;

    let prompt = input;
    
    // If we're in a specific mode, format the prompt accordingly
    if (mode === "plan" && subject && timeframe) {
      prompt = `Create a detailed study plan for ${subject} with a timeframe of ${timeframe}. Include daily/weekly goals, resources to use, and milestones to achieve.`;
      setMode("chat"); // Reset mode after use
    } else if (mode === "roadmap" && subject) {
      prompt = `Create a learning roadmap for ${subject} showing the progression from fundamentals to advanced concepts. Include the key topics, their sequence, and how they build upon each other.`;
      setMode("chat"); // Reset mode after use
    }

    const userMessage: Message = { role: "user", content: prompt };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    scrollToBottom();

    try {
      // Include the system prompt to guide the AI's responses
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: SYSTEM_PROMPT }],
          },
          {
            role: "model",
            parts: [{ text: "I understand my role as StudyNOW Assistant. I'll help students with study plans, roadmaps, and explanations in a clear, concise manner." }],
          },
        ],
      });

      const result = await chat.sendMessage(prompt);
      const response = result.response;
      const text = response.text();
      
      const assistantMessage: Message = { role: "assistant", content: text };
      setMessages(prev => [...prev, assistantMessage]);

      // If this was a study plan request, save it
      if (mode === "plan" || prompt.toLowerCase().includes("study plan")) {
        const newPlan: StudyPlan = {
          topic: subject || "General Study",
          roadmap: text.split('\n').filter(line => line.trim().length > 0),
          resources: [],
          created: new Date(),
        };
        setStudyPlans(prev => [...prev, newPlan]);
      }
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: Message = { 
        role: "assistant", 
        content: "Sorry, I encountered an error. Please try again." 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setSubject("");
      setTimeframe("");
      scrollToBottom();
    }
  };

  const handleModeChange = (newMode: "chat" | "plan" | "roadmap" | "doubts") => {
    setMode(newMode);
    if (newMode === "doubts") {
      setInput("Explain ");
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4 bg-gray-900">
      <header className="bg-blue-600 text-white p-4 rounded-lg mb-4 flex items-center">
        <BookOpen className="mr-2" size={24} />
        <h1 className="text-xl font-bold">StudyNOW Assistant</h1>
      </header>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-800 rounded-lg shadow">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg max-w-[80%] ${
              message.role === "user"
                ? "bg-blue-100 ml-auto"
                : "bg-gray-100"
            }`}
          >
            <div className="whitespace-pre-wrap">{message.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="p-4 rounded-lg bg-gray-100 max-w-[80%]">
            <div className="flex items-center gap-2">
              <div className="animate-pulse">Thinking</div>
              <div className="animate-bounce">.</div>
              <div className="animate-bounce delay-150">.</div>
              <div className="animate-bounce delay-300">.</div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {mode === "plan" && (
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h3 className="font-medium mb-2">Create Study Plan</h3>
          <div className="flex flex-col gap-2 md:flex-row">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject or Topic"
              className="flex-1 p-2 border rounded-lg"
            />
            <input
              type="text"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              placeholder="Timeframe (e.g., 2 weeks, 3 months)"
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              onClick={handleSubmit}
              disabled={!subject || !timeframe}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Generate Plan
            </button>
          </div>
        </div>
      )}

      {mode === "roadmap" && (
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h3 className="font-medium mb-2">Create Learning Roadmap</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject or Field"
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              onClick={handleSubmit}
              disabled={!subject}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Generate Roadmap
            </button>
          </div>
        </div>
      )}

      <div className="sticky bottom-0 bg-white p-2 rounded-lg shadow">
        <div className="flex gap-2 mb-2 overflow-x-auto py-1">
          <button
            onClick={() => handleModeChange("chat")}
            className={`px-3 py-1 rounded-lg flex items-center ${
              mode === "chat" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            <Brain size={16} className="mr-1" /> General
          </button>
          <button
            onClick={() => handleModeChange("plan")}
            className={`px-3 py-1 rounded-lg flex items-center ${
              mode === "plan" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            <Calendar size={16} className="mr-1" /> Study Plan
          </button>
          <button
            onClick={() => handleModeChange("roadmap")}
            className={`px-3 py-1 rounded-lg flex items-center ${
              mode === "roadmap" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            <Book size={16} className="mr-1" /> Roadmap
          </button>
          <button
            onClick={() => handleModeChange("doubts")}
            className={`px-3 py-1 rounded-lg flex items-center ${
              mode === "doubts" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            <HelpCircle size={16} className="mr-1" /> Clear Doubts
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "chat" ? "Ask me anything about your studies..." : ""}
            className="flex-1 p-3 border rounded-lg"
            disabled={isLoading || (mode !== "chat" && mode !== "doubts")}
          />
          <button
            type="submit"
            disabled={isLoading || (mode === "chat" && !input.trim())}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}