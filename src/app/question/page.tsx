"use client";
import RPGQuiz from "@/components/RPGQuiz";

const questions = [
  {
    question: "What is the most effective weapon against a werewolf?",
    options: ["Iron sword", "Silver dagger", "Fire spell", "Oak staff"],
    correctAnswer: "Silver dagger",
  },
  {
    question: "Which legendary creature is known to turn people to stone with its gaze?",
    options: ["Dragon", "Phoenix", "Medusa", "Kraken"],
    correctAnswer: "Medusa",
  },
  {
    question: "In D&D, which class is primarily known for its healing abilities?",
    options: ["Wizard", "Rogue", "Cleric", "Barbarian"],
    correctAnswer: "Cleric",
  },
  {
    question: "What material is commonly used to ward off vampires?",
    options: ["Gold", "Garlic", "Obsidian", "Emerald"],
    correctAnswer: "Garlic",
  },
  {
    question: "What material is commonly used to ward off vampires?",
    options: ["Gold", "Garlic", "Obsidian", "Emerald"],
    correctAnswer: "Garlic",
  },
  {
    question: "What material is commonly used to ward off vampires?",
    options: ["Gold", "Garlic", "Obsidian", "Emerald"],
    correctAnswer: "Garlic",
  },
  {
    question: "What material is commonly used to ward off vampires?",
    options: ["Gold", "Garlic", "Obsidian", "Emerald"],
    correctAnswer: "Garlic",
  },
  {
    question: "What material is commonly used to ward off vampires?",
    options: ["Gold", "Garlic", "Obsidian", "Emerald"],
    correctAnswer: "Garlic",
  },
  {
    question: "What material is commonly used to ward off vampires?",
    options: ["Gold", "Garlic", "Obsidian", "Emerald"],
    correctAnswer: "Garlic",
  },
  {
    question: "What material is commonly used to ward off vampires?",
    options: ["Gold", "Garlic", "Obsidian", "Emerald"],
    correctAnswer: "Garlic",
  },
];

export default function Home() {
  return (
    <div>
      <div className="App">
        <RPGQuiz
          questions={questions}
          theme="fantasy" // Options: "fantasy", "scifi", "medieval"
          onComplete={(score, total) => {
            console.log(`Quiz completed! Score: ${score}/${total}`);
          }}
        />
      </div>
      );
    </div>
  );
}
