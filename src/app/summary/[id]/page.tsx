"use client";
// pages/concept-notes.tsx
import type { NextPage } from "next";
import Head from "next/head";
// import ConceptNotesSummary from "../components/ConceptNotesSummary";
import ExamNotesSummary from "@/components/ExamNotesSummary";

const ConceptNotesPage: NextPage = () => {
  // This would typically come from an API, database, or static props
  const conceptsData = {
    summary: {
      "Key Concepts and Definitions": [
        {
          concept: "Photosynthesis",
          explanation:
            "Photosynthesis is the process used by plants, algae, and some bacteria to convert light energy into chemical energy in the form of sugars. This process requires chlorophyll and occurs in chloroplasts, utilizing carbon dioxide and water as reactants.",
        },
        {
          concept: "Ecosystems",
          explanation:
            "An ecosystem is a community of living organisms (plants, animals, microbes) interacting with each other and their non-living environment (air, water, soil). These interactions create a complex web of energy flow and nutrient cycling.",
        },
        {
          concept: "Data Structures",
          explanation:
            "Data structures are ways of organizing and storing data in a computer so that it can be used efficiently. Common examples include arrays, linked lists, trees, and graphs, each with its own strengths and weaknesses in terms of time and space complexity.",
        },
        {
          concept: "Algorithms",
          explanation:
            "An algorithm is a step-by-step procedure for solving a specific problem or performing a task. Algorithms are fundamental to computer science and are used to design efficient and effective programs.",
        },
        {
          concept: "Databases",
          explanation:
            "A database is a structured set of data organized and accessed electronically from a computer system. They are designed for efficient storage, retrieval, and management of data, typically using a database management system (DBMS).",
        },
        {
          concept: "Network Security",
          explanation:
            "Network security encompasses the policies and practices adopted to prevent and monitor unauthorized access, misuse, modification, or denial of a computer network and network-accessible resources.",
        },
        {
          concept: "Hypothesis Testing",
          explanation:
            "Hypothesis testing is a statistical method used to make inferences about a population based on a sample of data. It involves formulating a null hypothesis (no effect) and an alternative hypothesis, then using statistical tests to determine whether to reject or fail to reject the null hypothesis.",
        },
        {
          concept: "Regression Analysis",
          explanation:
            "Regression analysis is a statistical method used to model the relationship between a dependent variable and one or more independent variables. It helps to understand how changes in the independent variables affect the dependent variable, allowing for prediction and understanding of causal relationships.",
        },
        {
          concept: "Organic Chemistry",
          explanation:
            "Organic chemistry is the study of the structure, properties, composition, reactions, and preparation of carbon-containing compounds, which include not only hydrocarbons but also compounds with any number of other elements, including hydrogen (most commonly), nitrogen, oxygen, halogens, phosphorus, silicon, and sulfur.",
        },
        {
          concept: "Pharmacology",
          explanation:
            "Pharmacology is the branch of medicine and biology concerned with the study of drug action, where a drug can be broadly defined as any man-made, natural, or endogenous molecule which exerts a biochemical or physiological effect on the cell, tissue, organ, or organism.",
        },
      ],
      formulas: [],
      datesAndFacts: [],
      summary: [
        "The provided document is an exam schedule for various programs at JIS University, covering a wide range of disciplines including Agriculture, Biotechnology, Resources, Microbiology, Computer Science and Engineering, and many more. The schedule provides course codes, titles, exam dates, and times.",
        "Each department offers a variety of courses at different academic levels (B.Sc., M.Sc., M.Tech., etc.)",
        "The courses cover fundamental concepts within each field and more specialized topics relevant to specific programs.",
      ],
      memoryTips: [],
    },
  };

  return (
    <div className="min-h-screen ">
 
      <main className="container mx-auto py-8 px-4">
        <ExamNotesSummary data={conceptsData} />
      </main>

    </div>
  );
};

export default ConceptNotesPage;
