"use client"

import { TOTAL_QUESTIONS } from "@/lib/game-utils"

interface ProgressBarProps {
  current: number
  score: number
}

export function ProgressBar({ current, score }: ProgressBarProps) {
  const progress = (current / TOTAL_QUESTIONS) * 100

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm font-bold">
        <span className="text-muted-foreground">
          Pyetja {current + 1} nga {TOTAL_QUESTIONS}
        </span>
        <span className="flex items-center gap-1 text-foreground">
          {"⭐"} {score} pikë
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
