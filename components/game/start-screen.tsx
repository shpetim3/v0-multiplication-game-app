"use client"

import type { Difficulty } from "@/lib/game-utils"
import { DIFFICULTY_LABELS } from "@/lib/game-utils"

interface StartScreenProps {
  onStart: (difficulty: Difficulty) => void
  highScores: Record<Difficulty, number>
}

export function StartScreen({ onStart, highScores }: StartScreenProps) {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md animate-bounce-in">
        {/* Title */}
        <div className="mb-8 text-center">
          <div className="mb-4 animate-float text-6xl md:text-7xl">
            {"🧮"}
          </div>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl text-balance">
            Matematika Argëtuese
          </h1>
          <p className="text-lg font-semibold text-muted-foreground">
            Mëso tabelën e shumëzimit duke luajtur!
          </p>
        </div>

        {/* Difficulty Selection */}
        <div className="mb-6 space-y-3">
          <p className="text-center text-base font-bold text-foreground">
            Zgjidh nivelin:
          </p>

          {(["fillestar", "mesatar"] as Difficulty[]).map((diff) => (
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
                    {diff === "fillestar" ? "🌱" : "🚀"}
                  </span>
                  <span>{DIFFICULTY_LABELS[diff]}</span>
                </span>
                {highScores[diff] > 0 && (
                  <span className="rounded-full bg-secondary px-3 py-1 text-sm font-bold text-secondary-foreground">
                    {"⭐"} {highScores[diff]}/10
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>

        {/* Info section */}
        <div className="rounded-2xl bg-card p-5 shadow-sm border border-border">
          <h2 className="mb-3 text-center text-base font-bold text-foreground">
            Si luhet?
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-lg">{"🎯"}</span>
              <span>Zgjidh përgjigjen e saktë nga 4 mundësitë</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-lg">{"📊"}</span>
              <span>10 pyetje në çdo lojë</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-lg">{"🏆"}</span>
              <span>Mblidh sa më shumë pikë!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
