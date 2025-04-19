"use client"
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Book, Calendar, Brain, HelpCircle, Send, Bot, User, Check, Copy, Lightbulb, Zap, Map, Sparkles } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type AssistantMode = 'chat' | 'plan' | 'roadmap' | 'doubts';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<AssistantMode>('chat');
  const [subject, setSubject] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: "Hi! I'm your AI Study Assistant. I can help create study plans, build learning roadmaps, and answer your questions. How can I help you today?",
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  // Set "Explain" prefix for doubts mode
  useEffect(() => {
    if (mode === 'doubts' && !input) {
      setInput('Explain ');
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.selectionStart = inputRef.current.selectionEnd = 8;
      }
    }
  }, [mode]);

  const generateMockResponse = async (prompt: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (prompt.toLowerCase().includes('study plan') || prompt.toLowerCase().includes(' plan ')) {
      return `# Study Plan for ${prompt.includes('math') ? 'Mathematics' : 'the Subject'}

## Week 1: Fundamentals
- Day 1-2: Review basic concepts and principles
- Day 3-4: Practice with simple problems to build confidence
- Day 5-7: Begin exploring intermediate concepts

## Week 2: Building Knowledge
- Day 8-10: Deep dive into core theories and methods
- Day 11-12: Apply concepts to real-world scenarios
- Day 13-14: Self-assessment and review

## Resources
- Recommended textbooks
- Online courses: Khan Academy, Coursera
- Practice websites and tools

## Milestones
1. Complete basic concept review
2. Solve practice problems
3. Master core concepts
4. Create knowledge map`;
    }
    
    if (prompt.toLowerCase().includes('roadmap')) {
      return `# Learning Roadmap

## 1. Foundation Stage
- Basic concepts and principles
- Core fundamentals
- Essential tools and methods

## 2. Intermediate Level
- Advanced concepts
- Practical applications
- Real-world projects

## 3. Advanced Topics
- Specialized techniques
- Industry best practices
- Expert-level skills

## 4. Mastery
- Innovation and research
- Teaching others
- Contributing to the field`;
    }
    
    return `Let me help explain that concept:

1. **Key Points**:
   - Core principles and foundations
   - Practical applications
   - Common misconceptions

2. **Applications**:
   - Real-world examples
   - Practical use cases
   - Industry relevance

3. **Further Learning**:
   - Advanced topics
   - Related concepts
   - Recommended resources`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let prompt = input;
    if (mode === 'plan' && subject && timeframe) {
      prompt = `Create a study plan for ${subject} with timeframe ${timeframe}`;
      setMode('chat');
    } else if (mode === 'roadmap' && subject) {
      prompt = `Create a learning roadmap for ${subject}`;
      setMode('chat');
    }
    
    if (!prompt.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: prompt,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await generateMockResponse(prompt);
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyToClipboard = async (content: string, messageId: string) => {
    await navigator.clipboard.writeText(content);
    const messageElement = document.getElementById(messageId);
    if (messageElement) {
      messageElement.classList.add('copied');
      setTimeout(() => messageElement.classList.remove('copied'), 2000);
    }
  };

  const modes = [
    { id: 'chat', label: 'General', icon: <Brain className="w-4 h-4" />, color: 'from-blue-500 to-indigo-600' },
    { id: 'plan', label: 'Study Plan', icon: <Calendar className="w-4 h-4" />, color: 'from-emerald-500 to-teal-600' },
    { id: 'roadmap', label: 'Roadmap', icon: <Book className="w-4 h-4" />, color: 'from-purple-500 to-pink-600' },
    { id: 'doubts', label: 'Clear Doubts', icon: <HelpCircle className="w-4 h-4" />, color: 'from-amber-500 to-orange-600' },
  ] as const;

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-900 to-[#0a0d16] text-white overflow-hidden">
      <div className="flex flex-col w-full max-w-4xl mx-auto p-4 h-screen">
        {/* Header */}
        <header className="flex items-center gap-3 py-4 px-6 bg-gray-800/40 backdrop-blur-lg rounded-2xl mb-4 border border-gray-700/50 shadow-lg">
          <div className="relative">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-glow">
              <Book className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
              <Zap className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              TryHard Assistant
            </h1>
            <div className="flex items-center gap-1.5">
              <Lightbulb className="w-3 h-3 text-amber-400" />
              <p className="text-xs text-gray-400">Your AI-powered study companion</p>
            </div>
          </div>
          <div className="ml-auto">
            <div className="pulse-dot">
              <span className="pulse-dot-text">AI</span>
            </div>
          </div>
        </header>

        {/* Chat Container */}
        <div className="relative flex-1 overflow-hidden mb-4 rounded-2xl border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
          <div className="h-full overflow-y-auto px-4 py-4 scrollbar-thin">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  id={message.id}
                  className={`flex w-full animate-slideIn ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 mr-3">
                      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                  
                  <div
                    className={`group relative max-w-[80%] p-4 rounded-2xl shadow-md transition-all duration-200 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-tr-none'
                        : 'bg-gray-800/90 text-gray-100 rounded-tl-none backdrop-blur-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">
                      {message.content.split('\n').map((line, i) => {
                        if (line.startsWith('# ')) {
                          return <h1 key={i} className="text-xl font-bold my-2">{line.substring(2)}</h1>;
                        } else if (line.startsWith('## ')) {
                          return <h2 key={i} className="text-lg font-bold my-2">{line.substring(3)}</h2>;
                        } else if (line.startsWith('- ')) {
                          return <li key={i} className="ml-4 list-disc">{line.substring(2)}</li>;
                        } else if (line === '') {
                          return <br key={i} />;
                        } else {
                          return <p key={i} className="mb-2">{line}</p>;
                        }
                      })}
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      
                      {message.role === 'assistant' && (
                        <button
                          onClick={() => copyToClipboard(message.content, message.id)}
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded-full hover:bg-gray-700/50"
                        >
                          <Copy className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {message.role === 'user' && (
                    <div className="flex-shrink-0 ml-3">
                      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start animate-fadeIn">
                  <div className="flex-shrink-0 mr-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
                      <Bot className="w-5 h-5 text-white animate-pulse" />
                    </div>
                  </div>
                  <div className="bg-gray-800/90 backdrop-blur-sm text-gray-100 p-4 rounded-2xl rounded-tl-none shadow-md">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                      <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Modal Forms */}
          <div className={`absolute inset-0 bg-gray-900/70 backdrop-blur-sm transition-opacity duration-300 ${mode === 'plan' || mode === 'roadmap' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="h-full flex items-center justify-center p-6">
              <div className="w-full max-w-lg bg-gray-800/90 p-6 rounded-2xl border border-gray-700/70 backdrop-blur-lg shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  {mode === 'plan' ? (
                    <>
                      <Calendar className="w-5 h-5 text-emerald-400" />
                      <h3 className="font-medium text-lg text-emerald-400">Create Study Plan</h3>
                    </>
                  ) : (
                    <>
                      <Map className="w-5 h-5 text-purple-400" />
                      <h3 className="font-medium text-lg text-purple-400">Create Learning Roadmap</h3>
                    </>
                  )}
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Book className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={`Subject or ${mode === 'plan' ? 'Topic' : 'Field'}`}
                      className="w-full pl-10 p-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                    />
                  </div>
                  
                  {mode === 'plan' && (
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        placeholder="Timeframe (e.g., 2 weeks)"
                        className="w-full pl-10 p-3 bg-gray-900/50 border border-gray-700 rounded-xl text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                      />
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={!subject || (mode === 'plan' && !timeframe)}
                    className={`w-full p-3 rounded-xl font-medium transition-all ${
                      mode === 'plan'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700'
                        : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Generate {mode === 'plan' ? 'Study Plan' : 'Roadmap'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Input Panel */}
        <div className="relative bg-gray-800/40 p-5 rounded-2xl border border-gray-700/50 backdrop-blur-lg shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-2xl pointer-events-none opacity-80"></div>
          
          {/* Mode Selector */}
          <div className="flex gap-2 mb-4 overflow-x-auto py-1 scrollbar-hide">
            {modes.map((modeOption) => (
              <button
                key={modeOption.id}
                onClick={() => setMode(modeOption.id)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl font-medium transition-all ${
                  mode === modeOption.id
                    ? `bg-gradient-to-r ${modeOption.color} text-white`
                    : 'border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {modeOption.icon}
                {modeOption.label}
              </button>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <div className={`relative flex-1 transition-all duration-300 ${isFocused ? 'shadow-glow-sm' : ''}`}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder={mode === 'chat' ? "Ask me anything about your studies..." : ""}
                className="w-full p-3.5 pr-12 bg-gray-800/50 border border-gray-700/70 rounded-xl text-gray-100 resize-none min-h-[52px] max-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/70 transition-all duration-200 placeholder:text-gray-500"
                disabled={isLoading || (mode !== 'chat' && mode !== 'doubts')}
                rows={1}
              />
              {input && (
                <div className="absolute right-2 top-2 p-1 bg-gray-700/50 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 bottom-2 p-1.5 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;