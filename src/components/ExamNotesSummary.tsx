"use client";
// components/ConceptNotesSummary.tsx
import React, { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, Lightbulb, Beaker, Code, Calculator, Atom } from "lucide-react";

// Define our data types
type Concept = {
  concept: string;
  explanation: string;
};

type TopicSection = {
  topic: string;
  keys: Concept[];
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

// Component props
interface ExamNotesSummaryProps {
  data: ConceptsData;
}

// Get icon for topic
const getTopicIcon = (topic: string) => {
  switch (topic) {
    case "Biology":
      return <Beaker size={20} className="text-green-400" />;
    case "Computer Science":
      return <Code size={20} className="text-blue-400" />;
    case "Statistics":
      return <Calculator size={20} className="text-purple-400" />;
    case "Chemistry":
      return <Atom size={20} className="text-red-400" />;
    default:
      return <BookOpen size={20} className="text-yellow-400" />;
  }
};

// Individual concept card component
const ConceptCard: React.FC<{ concept: Concept }> = ({ concept }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-700 rounded-lg mb-3 overflow-hidden shadow-md">
      <div className="bg-indigo-900 p-3 font-medium flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-blue-300 text-lg">{concept.concept}</h3>
        {isOpen ? <ChevronUp size={20} className="text-blue-300" /> : <ChevronDown size={20} className="text-blue-300" />}
      </div>
      {isOpen && (
        <div className="p-4 bg-gray-900">
          <p className="text-gray-300">{concept.explanation}</p>
        </div>
      )}
    </div>
  );
};

// Topic section component
const TopicSection: React.FC<{ section: TopicSection }> = ({ section }) => {
  const [isOpen, setIsOpen] = useState(true);
  const icon = getTopicIcon(section.topic);

  return (
    <div className="border border-gray-700 rounded-lg mb-6 overflow-hidden shadow-md">
      <div className="bg-blue-900 p-4 font-medium flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-blue-200 text-xl">{section.topic}</h2>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-blue-300" /> : <ChevronDown size={20} className="text-blue-300" />}
      </div>
      {isOpen && (
        <div className="p-4 bg-gray-900">
          {section.keys.map((concept, idx) => (
            <ConceptCard key={idx} concept={concept} />
          ))}
        </div>
      )}
    </div>
  );
};

// Main component
const ExamNotesSummary: React.FC<ExamNotesSummaryProps> = ({ data }) => {
  const [isOverviewOpen, setIsOverviewOpen] = useState(true);
  const topics = data.summary["Key Concepts and Definitions"];

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-950 text-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-300">🌌 Course Concepts Explorer</h1>
        <div className="text-sm bg-blue-900 text-blue-200 px-3 py-1 rounded-full">JIS University</div>
      </div>

      {/* Overview Section */}
      <div className="border border-gray-700 rounded-lg mb-6 overflow-hidden shadow-md">
        <div className="bg-blue-800 p-4 font-medium flex justify-between items-center cursor-pointer" onClick={() => setIsOverviewOpen(!isOverviewOpen)}>
          <div className="flex items-center gap-2">
            <Lightbulb size={18} className="text-yellow-300" />
            <h2 className="text-blue-100">Overview</h2>
          </div>
          {isOverviewOpen ? <ChevronUp size={20} className="text-blue-300" /> : <ChevronDown size={20} className="text-blue-300" />}
        </div>
        {isOverviewOpen && (
          <div className="p-4 bg-gray-900 bg-opacity-50">
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              {data.summary.summary.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Subject Topics */}
      <h2 className="text-xl font-bold mb-4 text-blue-300 flex items-center gap-2">
        <BookOpen size={20} className="text-blue-400" />
        <span>Key Concepts by Subject</span>
      </h2>

      {topics.map((section, idx) => (
        <TopicSection key={idx} section={section} />
      ))}
    </div>
  );
};

export default ExamNotesSummary;
