"use client";
// components/ConceptNotesSummary.tsx
import React, { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, Lightbulb, Beaker, Database, Network, FileText, FlaskRound, Rocket, Star } from "lucide-react";

// Define our data types
type Concept = {
  concept: string;
  explanation: string;
};

type ConceptsData = {
  summary: {
    "Key Concepts and Definitions": Concept[];
    formulas: any[];
    datesAndFacts: any[];
    summary: string[];
    memoryTips: any[];
  };
};

// Group concepts by category for better organization
type ConceptCategory = {
  name: string;
  icon: React.ReactNode;
  concepts: Concept[];
};

// Component props
interface ExamNotesSummaryProps {
  data: ConceptsData;
}

// Individual concept card component
const ConceptCard: React.FC<{ concept: Concept }> = ({ concept }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-blue-900 rounded-lg mb-3 overflow-hidden shadow-md">
      <div className="bg-blue-900 p-3 font-medium flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-blue-100 text-lg">{concept.concept}</h3>
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

// Category section component
const CategorySection: React.FC<{ category: ConceptCategory }> = ({ category }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border border-blue-950 rounded-lg mb-6 overflow-hidden shadow-md">
      <div className="bg-blue-900 bg-opacity-50 p-4 font-medium flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-2">
          {category.icon}
          <h2 className="text-blue-200 text-xl">{category.name}</h2>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-blue-300" /> : <ChevronDown size={20} className="text-blue-300" />}
      </div>
      {isOpen && (
        <div className="p-4 bg-gray-900 bg-opacity-70">
          {category.concepts.map((concept, idx) => (
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

  // Group concepts into logical categories
  const allConcepts = data.summary["Key Concepts and Definitions"];

  const categories: ConceptCategory[] = [
    {
      name: "Biology Concepts",
      icon: <Beaker size={20} className="text-green-400" />,
      concepts: allConcepts.filter((c) => ["Photosynthesis", "Ecosystems", "Organic Chemistry"].includes(c.concept)),
    },
    {
      name: "Computer Science",
      icon: <Database size={20} className="text-blue-400" />,
      concepts: allConcepts.filter((c) => ["Data Structures", "Algorithms", "Databases", "Network Security"].includes(c.concept)),
    },
    {
      name: "Statistics & Analysis",
      icon: <FileText size={20} className="text-purple-400" />,
      concepts: allConcepts.filter((c) => ["Hypothesis Testing", "Regression Analysis"].includes(c.concept)),
    },
    {
      name: "Chemistry & Medicine",
      icon: <FlaskRound size={20} className="text-red-400" />,
      concepts: allConcepts.filter((c) => ["Pharmacology", "Organic Chemistry"].includes(c.concept)),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-950 text-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-300 flex items-center gap-2">
          <Rocket size={24} className="text-blue-400" />
          Cosmic Concepts Explorer
        </h1>
        <div className="text-sm bg-blue-950 text-blue-200 px-3 py-1 rounded-full flex items-center gap-1">
          <Star size={14} className="text-yellow-300" />
          JIS University
        </div>
      </div>

      {/* Overview Section */}
      <div className="border border-blue-900 rounded-lg mb-6 overflow-hidden shadow-md">
        <div className="bg-blue-900 bg-opacity-40 p-4 font-medium flex justify-between items-center cursor-pointer" onClick={() => setIsOverviewOpen(!isOverviewOpen)}>
          <div className="flex items-center gap-2">
            <Lightbulb size={18} className="text-yellow-300" />
            <h2 className="text-blue-200">Overview</h2>
          </div>
          {isOverviewOpen ? <ChevronUp size={20} className="text-blue-300" /> : <ChevronDown size={20} className="text-blue-300" />}
        </div>
        {isOverviewOpen && (
          <div className="p-4 bg-gray-900 bg-opacity-60">
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              {data.summary.summary.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Subject Categories */}
      <h2 className="text-xl font-bold mb-4 text-blue-300 flex items-center gap-2">
        <BookOpen size={20} className="text-blue-400" />
        <span>Key Concepts by Subject</span>
      </h2>

      {categories.map((category, idx) => (
        <CategorySection key={idx} category={category} />
      ))}
    </div>
  );
};

export default ExamNotesSummary;
