"use client"

import { useState, useCallback, useMemo } from "react"
import type { Difficulty, GameType } from "@/lib/game-utils"
import {
  generateQuestion,
  TOTAL_QUESTIONS,
  GAME_TYPE_CONFIG,
  DIFFICULTY_LABELS,
} from "@/lib/game-utils"
import { ProgressBar } from "./progress-bar"
import { QuestionCard } from "./question-card"

interface GameScreenProps {
  gameType: GameType
  difficulty: Difficulty
  onFinish: (score: number) => void
  onBack: () => void
}

export function GameScreen({
  gameType,
  difficulty,
  onFinish,
  onBack,
}: GameScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [questionKey, setQuestionKey] = useState(0)

  const config = GAME_TYPE_CONFIG[gameType]

  const question = useMemo(
    () => generateQuestion(gameType, difficulty),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gameType, difficulty, questionKey],
  )

  const handleAnswer = useCallback(
    (correct: boolean) => {
      const newScore = correct ? score + 1 : score
      const nextIndex = currentIndex + 1

      if (nextIndex >= TOTAL_QUESTIONS) {
        setTimeout(() => onFinish(newScore), 200)
      } else {
        setScore(newScore)
        setCurrentIndex(nextIndex)
        setQuestionKey((prev) => prev + 1)
      }
    },
    [score, currentIndex, onFinish],
  )

  const diffLabel =
    gameType === "rrokje"
      ? difficulty === "fillestar"
        ? "Fillëstar"
        : "Mesatar"
      : DIFFICULTY_LABELS[difficulty]

  return (
    <div className="flex min-h-[100dvh] flex-col px-4 py-6 md:py-8">
      <div className="mx-auto w-full max-w-md">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="rounded-xl bg-card px-3 py-2 text-sm font-bold text-muted-foreground transition-all hover:bg-muted active:scale-95 border border-border"
            aria-label="Kthehu prapa"
          >
            {"\u2190 Kthehu"}
          </button>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex h-7 w-7 items-center justify-center rounded-lg text-xs font-extrabold ${config.colorClass}`}
            >
              {config.emoji}
            </span>
            <span className="rounded-xl bg-card px-3 py-2 text-sm font-bold text-foreground border border-border">
              {diffLabel}
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressBar current={currentIndex} score={score} />
        </div>

        {/* Question */}
        <QuestionCard
          key={questionKey}
          question={question}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  )
}
