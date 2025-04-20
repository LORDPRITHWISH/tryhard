"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, FileText, Sparkles } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    
    
    setTimeout(() => {
      
      switch(option) {
        case "new-chat":
          router.push("/chat/new");
          break;
        case "upload-document":
          router.push("/documents/upload");
          break;
        case "explore-features":
          router.push("/tutorials");
          break;
      }
    }, 600);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const options = [
    {
      id: "new-chat",
      title: "Start a New Chat",
      description: "Begin a conversation with the AI assistant",
      icon: <MessageSquare className="h-8 w-8" />,
      color: "from-indigo-500 to-purple-600"
    },
    {
      id: "upload-document",
      title: "Upload Documents",
      description: "Chat with your PDFs and other documents",
      icon: <FileText className="h-8 w-8" />,
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: "explore-features",
      title: "Explore Features",
      description: "Learn about what the AI assistant can do",
      icon: <Sparkles className="h-8 w-8" />,
      color: "from-emerald-500 to-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-300 mb-3"
          >
            Welcome to AI Chat Assistant
          </motion.h1>
          <motion.p 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Choose how you'd like to get started
          </motion.p>
        </div>
        
      
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
        >
          {options.map((option) => (
            <motion.div
              key={option.id}
              variants={itemVariants}
              className="relative"
            >
              <button
                onClick={() => handleOptionSelect(option.id)}
                disabled={selectedOption !== null}
                className={`w-full h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-left border-2 ${
                  selectedOption === option.id 
                    ? "border-indigo-500 ring-2 ring-indigo-300" 
                    : "border-transparent hover:border-indigo-200"
                }`}
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${option.color} text-white mb-4`}>
                  {option.icon}
                </div>
                
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {option.title}
                </h2>
                
                <p className="text-gray-600 mb-4">
                  {option.description}
                </p>
                
                <div className="flex items-center text-indigo-600 font-medium">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </div>
                
                {selectedOption === option.id && (
                  <div className="absolute inset-0 bg-white/70 rounded-xl flex items-center justify-center">
                    <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </button>
            </motion.div>
          ))}
        </motion.div>
        
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center text-sm text-gray-500"
        >
          
        </motion.div>
      </div>
    </div>
  );
}