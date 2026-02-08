"use client"

import type { GameType } from "@/lib/game-utils"
import { TOTAL_QUESTIONS, GAME_TYPE_CONFIG } from "@/lib/game-utils"

interface ResultsScreenProps {
  score: number
  gameType: GameType
  onPlayAgain: () => void
  onGoHome: () => void
}

function getResultMessage(
  score: number,
): { emoji: string; title: string; subtitle: string } {
  const ratio = score / TOTAL_QUESTIONS
  if (ratio === 1) {
    return {
      emoji: "\u{1f3c6}",
      title: "Perfekt!",
      subtitle: "Te gjitha sakte! Je matematikan/e e vertete!",
    }
  }
  if (ratio >= 0.8) {
    return {
      emoji: "\u{1f31f}",
      title: "Shkelqyeshem!",
      subtitle: "Pothuajse perfekt! Vazhdo keshtu!",
    }
  }
  if (ratio >= 0.6) {
    return {
      emoji: "\u{1f44f}",
      title: "Shume mire!",
      subtitle: "Je duke bere progres te madh!",
    }
  }
  if (ratio >= 0.4) {
    return {
      emoji: "\u{1f4aa}",
      title: "Mire!",
      subtitle: "Vazhdo te ushtrohesh, po permirësohesh!",
    }
  }
  return {
    emoji: "\u{1f331}",
    title: "Fillim i mire!",
    subtitle: "Provo perseri, do te behesh me i/e mire!",
  }
}

export function ResultsScreen({
  score,
  gameType,
  onPlayAgain,
  onGoHome,
}: ResultsScreenProps) {
  const result = getResultMessage(score)
  const percentage = Math.round((score / TOTAL_QUESTIONS) * 100)
  const config = GAME_TYPE_CONFIG[gameType]

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md animate-bounce-in text-center">
        {/* Confetti-like decorations */}
        <div className="relative mb-6">
          {score >= 7 && (
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              aria-hidden="true"
            >
              {["\u{1f38a}", "\u2728", "\u{1f389}", "\u2b50", "\u{1f38a}"].map(
                (emoji, i) => (
                  <span
                    key={i}
                    className="absolute text-3xl animate-confetti"
                    style={{
                      left: `${15 + i * 17}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: `${2 + i * 0.3}s`,
                    }}
                  >
                    {emoji}
                  </span>
                ),
              )}
            </div>
          )}

          <div className="animate-star-spin text-7xl md:text-8xl">
            {result.emoji}
          </div>
        </div>

        {/* Game type badge */}
        <div className="mb-4 flex items-center justify-center">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold ${config.colorClass}`}
          >
            {config.emoji} {config.label}
          </span>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-3xl font-extrabold text-foreground md:text-4xl text-balance">
          {result.title}
        </h2>
        <p className="mb-8 text-lg font-semibold text-muted-foreground text-pretty">
          {result.subtitle}
        </p>

        {/* Score Display */}
        <div className="mb-8 rounded-3xl bg-card p-6 shadow-lg border border-border">
          <div className="mb-4">
            <span className="text-6xl font-extrabold text-primary md:text-7xl">
              {score}
            </span>
            <span className="text-2xl font-bold text-muted-foreground md:text-3xl">
              /{TOTAL_QUESTIONS}
            </span>
          </div>

          {/* Stars row */}
          <div className="mb-4 flex items-center justify-center gap-1">
            {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
              <span
                key={i}
                className={`text-2xl transition-all duration-300 ${
                  i < score ? "animate-star-spin" : "opacity-20 grayscale"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {"\u2b50"}
              </span>
            ))}
          </div>

          {/* Percentage */}
          <div className="flex items-center justify-center gap-2">
            <div className="h-3 w-32 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-accent transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-sm font-bold text-muted-foreground">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onPlayAgain}
            className="w-full rounded-2xl bg-primary px-6 py-5 text-xl font-extrabold text-primary-foreground transition-all duration-200 hover:brightness-110 active:scale-95"
          >
            {"\u{1f504}"} Luaj Perseri
          </button>
          <button
            onClick={onGoHome}
            className="w-full rounded-2xl bg-card px-6 py-4 text-base font-bold text-muted-foreground transition-all duration-200 hover:bg-muted active:scale-95 border border-border"
          >
            {"\u2190"} Kthehu ne Kryefaqe
          </button>
        </div>
      </div>
    </div>
  )
}
