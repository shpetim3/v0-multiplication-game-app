"use client"

import { TOTAL_QUESTIONS } from "@/lib/game-utils"

interface ResultsScreenProps {
  score: number
  onPlayAgain: () => void
}

function getResultMessage(score: number): { emoji: string; title: string; subtitle: string } {
  const ratio = score / TOTAL_QUESTIONS
  if (ratio === 1) {
    return {
      emoji: "🏆",
      title: "Perfekt!",
      subtitle: "Të gjitha saktë! Je matematikan/e e vërtetë!",
    }
  }
  if (ratio >= 0.8) {
    return {
      emoji: "🌟",
      title: "Shkëlqyeshëm!",
      subtitle: "Pothuajse perfekt! Vazhdo kështu!",
    }
  }
  if (ratio >= 0.6) {
    return {
      emoji: "👏",
      title: "Shumë mirë!",
      subtitle: "Je duke bërë progres të madh!",
    }
  }
  if (ratio >= 0.4) {
    return {
      emoji: "💪",
      title: "Mirë!",
      subtitle: "Vazhdo të ushtrohesh, po përmirësohesh!",
    }
  }
  return {
    emoji: "🌱",
    title: "Fillim i mirë!",
    subtitle: "Provo përsëri, do të bëhesh më i/e mirë!",
  }
}

export function ResultsScreen({ score, onPlayAgain }: ResultsScreenProps) {
  const result = getResultMessage(score)
  const percentage = Math.round((score / TOTAL_QUESTIONS) * 100)

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md animate-bounce-in text-center">
        {/* Confetti-like decorations */}
        <div className="relative mb-6">
          {score >= 7 && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
              {["🎊", "✨", "🎉", "⭐", "🎊"].map((emoji, i) => (
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
              ))}
            </div>
          )}

          <div className="animate-star-spin text-7xl md:text-8xl">
            {result.emoji}
          </div>
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
                {"⭐"}
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

        {/* Play Again */}
        <button
          onClick={onPlayAgain}
          className="w-full rounded-2xl bg-primary px-6 py-5 text-xl font-extrabold text-primary-foreground transition-all duration-200 hover:brightness-110 active:scale-95"
        >
          <span className="mr-2">{"🔄"}</span>
          Luaj Përsëri
        </button>
      </div>
    </div>
  )
}
