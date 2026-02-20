"use client"

import type { Difficulty, GameType } from "@/lib/game-utils"
import { DIFFICULTY_LABELS, GAME_TYPE_CONFIG, TOTAL_QUESTIONS } from "@/lib/game-utils"

interface StartScreenProps {
  gameType: GameType
  onStart: (difficulty: Difficulty) => void
  onBack: () => void
  highScores: Record<string, number>
}

const DIFFICULTY_ICONS: Record<Difficulty, string> = {
  fillestar: "\u{1f331}",
  mesatar: "\u{1f680}",
}

export function StartScreen({
  gameType,
  onStart,
  onBack,
  highScores,
}: StartScreenProps) {
  const config = GAME_TYPE_CONFIG[gameType]

  const getDifficultyLabel = (diff: Difficulty): string => {
    if (gameType === "rrokje") {
      return diff === "fillestar"
        ? "Fillëstar (fjalë të lehta)"
        : "Mesatar (fjalë të vështira)"
    }
    return DIFFICULTY_LABELS[diff]
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md animate-bounce-in">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 rounded-xl bg-card px-3 py-2 text-sm font-bold text-muted-foreground transition-all hover:bg-muted active:scale-95 border border-border"
          aria-label="Kthehu në kryefaqe"
        >
          {"\u2190 Kryefaqja"}
        </button>

        {/* Title */}
        <div className="mb-8 text-center">
          <div
            className={`
              mb-4 inline-flex h-20 w-20 items-center justify-center rounded-2xl
              text-3xl font-extrabold shadow-lg animate-float
              ${config.colorClass}
            `}
          >
            {config.emoji}
          </div>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl text-balance">
            {config.label}
          </h1>
          <p className="text-lg font-semibold text-muted-foreground">
            {config.description}
          </p>
        </div>

        {/* Difficulty Selection */}
        <div className="mb-6 space-y-3">
          <p className="text-center text-base font-bold text-foreground">
            Zgjidh nivelin:
          </p>

          {(["fillestar", "mesatar"] as Difficulty[]).map((diff) => {
            const scoreKey = `${gameType}-${diff}`
            const score = highScores[scoreKey] || 0

            return (
              <button
                key={diff}
                onClick={() => onStart(diff)}
                className={`
                  group relative w-full overflow-hidden rounded-2xl px-6 py-5 text-lg font-bold
                  transition-all duration-200 active:scale-95
                  ${
                    diff === "fillestar"
                      ? "bg-accent text-accent-foreground hover:brightness-110"
                      : "bg-primary text-primary-foreground hover:brightness-110"
                  }
                `}
              >
                <span className="relative z-10 flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">
                      {DIFFICULTY_ICONS[diff]}
                    </span>
                    <span>{getDifficultyLabel(diff)}</span>
                  </span>
                  {score > 0 && (
                    <span className="rounded-full bg-secondary px-3 py-1 text-sm font-bold text-secondary-foreground">
                      {"\u2b50"} {score}/{TOTAL_QUESTIONS}
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </div>

        {/* Info section */}
        <div className="rounded-2xl bg-card p-5 shadow-sm border border-border">
          <h2 className="mb-3 text-center text-base font-bold text-foreground">
            Si luhet?
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-lg">{"\u{1f3af}"}</span>
              <span>Zgjidh përgjigjen e saktë nga 4 mundësitë</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-lg">{"\u{1f4ca}"}</span>
              <span>{TOTAL_QUESTIONS} pyetje në çdo lojë</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-lg">{"\u{1f3c6}"}</span>
              <span>Mblidh sa më shumë pikë!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
