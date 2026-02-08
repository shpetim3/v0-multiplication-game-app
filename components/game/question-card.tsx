"use client"

import { useState, useCallback } from "react"
import type { Question } from "@/lib/game-utils"
import { getEncouragement, getRetryMessage } from "@/lib/game-utils"

interface QuestionCardProps {
  question: Question
  onAnswer: (correct: boolean) => void
}

const OPTION_COLORS = [
  "bg-primary text-primary-foreground hover:brightness-110",
  "bg-accent text-accent-foreground hover:brightness-110",
  "bg-secondary text-secondary-foreground hover:brightness-110",
  "bg-[hsl(280,60%,55%)] text-[hsl(0,0%,100%)] hover:brightness-110",
]

export function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{
    type: "correct" | "wrong"
    message: string
  } | null>(null)

  const handleSelect = useCallback(
    (option: string) => {
      if (selected !== null) return

      setSelected(option)

      const isCorrect = option === question.correctAnswer

      if (isCorrect) {
        setFeedback({ type: "correct", message: getEncouragement() })
      } else {
        setFeedback({ type: "wrong", message: getRetryMessage() })
      }

      setTimeout(
        () => {
          setSelected(null)
          setFeedback(null)
          onAnswer(isCorrect)
        },
        isCorrect ? 1200 : 1500,
      )
    },
    [selected, question.correctAnswer, onAnswer],
  )

  return (
    <div className="animate-fade-in-up w-full">
      {/* Question Display */}
      <div className="mb-8 rounded-3xl bg-card p-6 text-center shadow-lg border border-border md:p-8">
        {question.type === "math" ? (
          <>
            <p className="mb-1 text-sm font-bold text-muted-foreground uppercase tracking-wide">
              Sa ben?
            </p>
            <div className="flex items-center justify-center gap-2 text-foreground">
              <span className="text-5xl font-extrabold md:text-6xl">
                {question.num1}
              </span>
              <span className="text-4xl font-bold text-primary md:text-5xl">
                {question.operator}
              </span>
              <span className="text-5xl font-extrabold md:text-6xl">
                {question.num2}
              </span>
              <span className="text-4xl font-bold text-muted-foreground md:text-5xl">
                = ?
              </span>
            </div>
          </>
        ) : (
          <>
            <p className="mb-3 text-sm font-bold text-muted-foreground uppercase tracking-wide">
              {question.prompt}
            </p>
            <div className="inline-block rounded-2xl bg-muted px-6 py-3">
              <span className="text-4xl font-extrabold text-foreground md:text-5xl">
                {question.word}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {question.options.map((option, index) => {
          let stateClasses = ""

          if (selected !== null) {
            if (option === question.correctAnswer) {
              stateClasses =
                "!bg-[hsl(var(--game-success))] !text-[hsl(0,0%,100%)] animate-pop ring-4 ring-[hsl(var(--game-success)/0.3)]"
            } else if (option === selected) {
              stateClasses =
                "!bg-[hsl(var(--game-error))] !text-[hsl(0,0%,100%)] animate-shake opacity-80"
            } else {
              stateClasses = "opacity-40"
            }
          }

          // For syllable text options, use smaller text
          const isTextOption = question.type === "syllable" && option.includes("-")
          const textSize = isTextOption
            ? "text-base font-extrabold md:text-lg"
            : "text-2xl font-extrabold md:text-3xl"

          return (
            <button
              key={`${option}-${index}`}
              onClick={() => handleSelect(option)}
              disabled={selected !== null}
              className={`
                relative rounded-2xl px-4 py-5 ${textSize}
                transition-all duration-200 active:scale-95 md:py-6
                ${OPTION_COLORS[index]}
                ${stateClasses}
                ${selected === null ? "animate-pulse-glow" : ""}
              `}
              aria-label={`Pergjigja ${option}`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {feedback && (
        <div
          className={`
            mt-6 animate-bounce-in rounded-2xl p-4 text-center text-lg font-bold
            ${
              feedback.type === "correct"
                ? "bg-[hsl(var(--game-success)/0.15)] text-[hsl(var(--game-success))]"
                : "bg-[hsl(var(--game-error)/0.15)] text-[hsl(var(--game-error))]"
            }
          `}
          role="alert"
        >
          <span className="mr-2 text-2xl">
            {feedback.type === "correct" ? "\u{1f389}" : "\u{1f60a}"}
          </span>
          {feedback.message}
          {feedback.type === "wrong" && (
            <p className="mt-1 text-base font-semibold">
              Pergjigja e sakte: {question.correctAnswer}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
