"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Main Quiz Component
interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface RPGQuizProps {
  questions: Question[];
  onComplete?: (answers: string[]) => void;
}

export default function RPGQuiz({
  questions,
  onComplete = () => {},
}: RPGQuizProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<string[]>([]);
  const [direction, setDirection] = useState(1);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const totalSteps = questions.length;

  // Calculate current score
  const score = answers.filter((answer, index) => answer === questions[index].correctAnswer).length;

  const handleAnswerSelect = (selectedAnswer: string) => {
    // Check if this question has already been answered
    if (answers[currentStep - 1] !== undefined) {
      return; // Don't allow changing previous answers
    }

    const newAnswers = [...answers];
    newAnswers[currentStep - 1] = selectedAnswer;
    setAnswers(newAnswers);

    setShowFeedback(true);

    // Wait to show feedback before advancing
    setTimeout(() => {
      setShowFeedback(false);
      if (currentStep < totalSteps) {
        setDirection(1);
        setCurrentStep((prev) => prev + 1);
      } else {
        setIsCompleted(true);
        onComplete(newAnswers);
      }
    }, 1500); // Extended the time to give user more time to see feedback
  };

  const handleStepChange = (step: number) => {
    if (step <= answers.length + 1 && step <= totalSteps) {
      setDirection(step > currentStep ? 1 : -1);
      setCurrentStep(step);
    }
  };

  // Determine if we can navigate to a specific step
  const isStepNavigable = (step: number) => {
    return step <= answers.length + 1 && step !== currentStep;
  };

  // Check if current question is already answered (for review mode)
  const isCurrentQuestionAnswered = answers[currentStep - 1] !== undefined;

  // Effects
  const starfieldBackground = {
    backgroundImage: "radial-gradient(circle, rgba(20, 20, 40, 0.8) 0%, rgba(5, 5, 15, 1) 100%)",
    backgroundSize: "cover",
  };

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center p-4" style={starfieldBackground}>
      <motion.div
        className="mx-auto min-w-3xl max-w-7xl rounded-lg shadow-2xl overflow-hidden bg-gray-900 border border-purple-500 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with progress indicators */}
        <div className="relative bg-gray-800 py-4 px-8 border-b border-purple-500">
          <div className="flex items-center justify-center space-x-2">
            {questions.map((_, idx) => {
              const stepNum = idx + 1;
              const isAnswered = answers[idx] !== undefined;
              const isCorrect = answers[idx] === questions[idx].correctAnswer;

              return (
                <React.Fragment key={stepNum}>
                  <StepIndicator
                    step={stepNum}
                    currentStep={currentStep}
                    isAnswered={isAnswered}
                    isCorrect={isCorrect}
                    onClickStep={handleStepChange}
                    isNavigable={isStepNavigable(stepNum)}
                  />

                  {idx < questions.length - 1 && <ProgressConnector isCompleted={stepNum < answers.length + 1} isCorrect={isAnswered && isCorrect} />}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        {isCompleted ? (
          <CompleteScreen score={score} totalQuestions={totalSteps} answers={answers} questions={questions} />
        ) : (
          <div className="relative min-h-[24rem]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className=" w-fit mx-auto p-8"
              >
                <Question
                  questionData={questions[currentStep - 1]}
                  onAnswerSelect={handleAnswerSelect}
                  questionNumber={currentStep}
                  showFeedback={showFeedback || isCurrentQuestionAnswered}
                  selectedAnswer={answers[currentStep - 1]}
                  isReviewMode={isCurrentQuestionAnswered && !showFeedback}
                  isDisabled={showFeedback || isCurrentQuestionAnswered}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Review Mode Banner - shows when viewing answered questions */}
        {isCurrentQuestionAnswered && !showFeedback && !isCompleted && (
          <div className="bg-purple-900/70 border-t border-purple-500 p-2 text-center">
            <span className="text-purple-200 font-medium">
              <span className="text-yellow-300">★</span> REVIEW MODE <span className="text-yellow-300">★</span>
              You cannot change your answer
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gray-800 border-t border-purple-500 p-4 flex justify-between items-center">
          <div className="text-cyan-400 font-mono">
            <span className="text-purple-400">QUERY</span>: {currentStep} / {totalSteps}
          </div>

          <div className="text-cyan-400 font-mono">
            <span className="text-purple-400">SCORE</span>: {score} / {answers.length}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Question Component
interface QuestionProps {
  questionData: Question;
  onAnswerSelect: (selectedAnswer: string) => void;
  questionNumber: number;
  showFeedback: boolean;
  selectedAnswer: string | undefined;
  isDisabled: boolean;
  isReviewMode: boolean;
}

function Question({ questionData, onAnswerSelect, questionNumber, showFeedback, selectedAnswer, isDisabled, isReviewMode }: QuestionProps) {
  const { question, options, correctAnswer } = questionData;

  return (
    <div className="space-y-6">
      <motion.h2 className="text-xl font-bold text-cyan-300 mb-6" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <span className="text-purple-400">[{questionNumber}]</span> {question}
      </motion.h2>

      <div className="grid grid-cols-1 gap-4 ">
        {options.map((option, idx) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === correctAnswer;
          let optionStyle = "border border-cyan-600 bg-gray-800 text-gray-200";

          // When showing feedback or in review mode, highlight correct/incorrect
          if ((showFeedback || isReviewMode) && isSelected) {
            optionStyle = isCorrect ? "border-2 border-green-500 bg-green-900/30 text-green-300" : "border-2 border-red-500 bg-red-900/30 text-red-300";
          } else if ((showFeedback || isReviewMode) && isCorrect) {
            optionStyle = "border-2 border-green-500 bg-green-900/30 text-green-300";
          }

          return (
            <motion.button
              key={idx}
              className={`p-4 rounded-md text-left hover:bg-gray-700 hover:border-cyan-400 transition-all ${optionStyle} ${
                isDisabled && !isSelected && !isCorrect ? "opacity-70" : ""
              }`}
              whileHover={!isDisabled ? { scale: 1.02, boxShadow: "0 0 10px rgba(0, 216, 255, 0.5)" } : {}}
              onClick={() => !isDisabled && onAnswerSelect(option)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx + 0.3 }}
              disabled={isDisabled}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3">
                  <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-gray-700 border border-cyan-500 text-cyan-300">
                    {String.fromCharCode(65 + idx)}
                  </span>
                </div>
                <span>{option}</span>

                {/* Show feedback icons */}
                {(showFeedback || isReviewMode) && isSelected && (
                  <span className="ml-auto">{isCorrect ? <SuccessIcon className="h-6 w-6 text-green-500" /> : <FailIcon className="h-6 w-6 text-red-500" />}</span>
                )}

                {/* Always show correct answer in review mode */}
                {(showFeedback || isReviewMode) && !isSelected && isCorrect && (
                  <span className="ml-auto">
                    <SuccessIcon className="h-6 w-6 text-green-500" />
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Answer legend in review mode */}
      {isReviewMode && (
        <motion.div className="mt-6 p-4 rounded bg-gray-800/50 border border-cyan-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-sm">
              <div className="w-4 h-4 mr-2 rounded-full bg-green-500"></div>
              <span className="text-green-300">Correct Answer: {correctAnswer}</span>
            </div>
            {selectedAnswer !== correctAnswer && (
              <div className="flex items-center text-sm">
                <div className="w-4 h-4 mr-2 rounded-full bg-red-500"></div>
                <span className="text-red-300">Your Answer: {selectedAnswer}</span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Step Indicator Component
function StepIndicator({
  step,
  currentStep,
  isAnswered,
  isCorrect,
  onClickStep,
  isNavigable,
}: {
  step: number;
  currentStep: number;
  isAnswered: boolean;
  isCorrect: boolean;
  onClickStep: (step: number) => void;
  isNavigable: boolean;
}) {
  let bgColor = "bg-gray-700"; // Default unanswered
  let textColor = "text-gray-400";
  let borderColor = "border-gray-600";

  if (step === currentStep) {
    bgColor = "bg-cyan-900";
    textColor = "text-cyan-300";
    borderColor = "border-cyan-400";
  } else if (isAnswered) {
    if (isCorrect) {
      bgColor = "bg-green-900";
      textColor = "text-green-300";
      borderColor = "border-green-500";
    } else {
      bgColor = "bg-red-900";
      textColor = "text-red-300";
      borderColor = "border-red-500";
    }
  }

  const handleClick = () => {
    if (isNavigable) {
      onClickStep(step);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${borderColor} ${bgColor} ${textColor} ${
        isNavigable ? "cursor-pointer" : step === currentStep ? "cursor-default" : "cursor-not-allowed opacity-70"
      }`}
      whileHover={isNavigable ? { scale: 1.1 } : {}}
      animate={{ scale: [1, step === currentStep ? 1.15 : 1, 1] }}
      transition={{ duration: 0.5 }}
    >
      {isAnswered ? isCorrect ? <SuccessIcon className="h-4 w-4" /> : <FailIcon className="h-4 w-4" /> : <span className="text-sm">{step}</span>}
    </motion.div>
  );
}

// Progress Connector
function ProgressConnector({ isCompleted, isCorrect }: { isCompleted: boolean; isCorrect: boolean }) {
  return (
    <div className="relative h-1 w-12 bg-gray-700 overflow-hidden">
      <motion.div
        className={`absolute inset-0 ${isCorrect ? "bg-green-500" : "bg-cyan-500"}`}
        initial={{ width: 0 }}
        animate={{ width: isCompleted ? "100%" : "0%" }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}

// Completion Screen
function CompleteScreen({
  score,
  totalQuestions,
  answers,
  questions,
}: {
  score: number;
  totalQuestions: number;
  answers: string[];
  questions: Question[];
}) {
  const percentage = Math.round((score / totalQuestions) * 100);

  // Determine message based on score
  let message = "";
  let messageColor = "";

  if (percentage >= 90) {
    message = "Legendary Explorer! The cosmos bends to your will!";
    messageColor = "text-purple-300";
  } else if (percentage >= 70) {
    message = "Skilled Voyager! The stars guide your path.";
    messageColor = "text-cyan-300";
  } else if (percentage >= 50) {
    message = "Aspiring Navigator. Keep charting your course.";
    messageColor = "text-blue-300";
  } else {
    message = "Space Cadet. The universe has more to teach you.";
    messageColor = "text-gray-300";
  }

  return (
    <motion.div className="py-12 px-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <motion.h1 className="text-3xl font-bold text-cyan-300 mb-4" initial={{ y: -20 }} animate={{ y: 0 }} transition={{ delay: 0.2, type: "spring" }}>
        Quest Complete!
      </motion.h1>

      <motion.div className="mb-8" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring", stiffness: 120 }}>
        <div className="inline-flex items-center justify-center h-32 w-32 rounded-full bg-gray-800 border-4 border-purple-500 relative">
          <span className="text-4xl font-bold text-cyan-300">{percentage}%</span>
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-cyan-400"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: percentage / 100 }}
            transition={{ delay: 0.6, duration: 2 }}
            style={{
              background: `conic-gradient(from 0deg, #5eead4 0%, #5eead4 ${percentage}%, transparent ${percentage}%, transparent 100%)`,
              maskImage: "radial-gradient(transparent 60%, black 60%)",
            }}
          />
        </div>
      </motion.div>

      <motion.p className={`text-xl ${messageColor} mb-6`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        {message}
      </motion.p>

      <motion.div className="text-lg text-cyan-200 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        You answered <span className="text-purple-400 font-bold">{score}</span> out of <span className="text-purple-400 font-bold">{totalQuestions}</span> questions correctly.
      </motion.div>

      {/* Results Summary Table */}
      <motion.div className="max-w-lg mx-auto mt-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
        <h3 className="text-lg font-semibold text-cyan-300 mb-3">Question Summary</h3>
        <div className="space-y-2">
          {questions.map((q, idx) => {
            const userAnswer = answers[idx];
            const isCorrect = userAnswer === q.correctAnswer;

            return (
              <div key={idx} className="flex w-full p-2 rounded bg-gray-800/50 border border-gray-700">
                <div className="flex items-center w-3/4">
                  <div className={`h-5 w-5 rounded-full mr-3 ${isCorrect ? "bg-green-500" : "bg-red-500"}`}>
                    {isCorrect ? (
                      <SuccessIcon className="h-5 w-5 text-gray-900" />
                    ) : (
                      <FailIcon className="h-5 w-5 text-gray-900" />
                    )}
                  </div>
                  <div className="text-sm text-left">
                    <span className="text-gray-300">Q{idx + 1}: </span>
                    <span className="text-cyan-100 whitespace-normal break-words">{q.question}</span>
                  </div>
                </div>
                <div className="w-1/4 text-right text-sm ml-2">
                  {isCorrect ? (
                    <span className="text-green-300">{userAnswer}</span>
                  ) : (
                    <>
                      <div className="text-red-300">{userAnswer}</div>
                      <div className="text-green-300 text-xs">Correct: {q.correctAnswer}</div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Icons
function SuccessIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
    </svg>
  );
}

function FailIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
    </svg>
  );
}

// Example usage:
// import RPGQuiz from './components/RPGQuiz';
//
// const questions = [
//   {
//     question: "What planet is known as the 'Red Planet'?",
//     options: ["Venus", "Mars", "Jupiter", "Saturn"],
//     correctAnswer: "Mars"
//   },
//   {
//     question: "Which spell can create light in dark places?",
//     options: ["Fireball", "Light", "Darkness", "Teleport"],
//     correctAnswer: "Light"
//   },
//   // More questions...
// ];
//
// export default function QuizPage() {
//   const handleComplete = (answers) => {
//     console.log("Quiz completed with answers:", answers);
//   };
//
//   return (
//     <RPGQuiz
//       questions={questions}
//       onComplete={handleComplete}
//     />
//   );
// }
