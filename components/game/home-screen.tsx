"use client"

import type { GameType } from "@/lib/game-utils"
import { GAME_TYPE_CONFIG } from "@/lib/game-utils"

interface HomeScreenProps {
  onSelectGame: (gameType: GameType) => void
  onOpenAbetarja: () => void
}

const GAME_ORDER: GameType[] = [
  "mbledhje",
  "zbritje",
  "shumezim",
  "pjestim",
  "rrokje",
]

const CARD_STYLES: Record<GameType, { bg: string; iconBg: string; border: string }> = {
  mbledhje: {
    bg: "bg-[hsl(142,71%,97%)]",
    iconBg: "bg-accent text-accent-foreground",
    border: "border-[hsl(142,50%,85%)]",
  },
  zbritje: {
    bg: "bg-[hsl(45,93%,96%)]",
    iconBg: "bg-secondary text-secondary-foreground",
    border: "border-[hsl(45,60%,82%)]",
  },
  shumezim: {
    bg: "bg-[hsl(217,91%,96%)]",
    iconBg: "bg-primary text-primary-foreground",
    border: "border-[hsl(217,60%,85%)]",
  },
  pjestim: {
    bg: "bg-[hsl(280,60%,96%)]",
    iconBg: "bg-[hsl(280,60%,55%)] text-[hsl(0,0%,100%)]",
    border: "border-[hsl(280,40%,85%)]",
  },
  rrokje: {
    bg: "bg-[hsl(340,65%,96%)]",
    iconBg: "bg-[hsl(340,65%,55%)] text-[hsl(0,0%,100%)]",
    border: "border-[hsl(340,40%,85%)]",
  },
}

export function HomeScreen({ onSelectGame, onOpenAbetarja }: HomeScreenProps) {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center px-4 py-8 md:py-12">
      <div className="w-full max-w-md animate-bounce-in">
        {/* Header */}
        <div className="mb-8 text-center md:mb-10">
          <div className="mb-3 animate-float text-5xl font-extrabold text-primary md:text-6xl">
            1+1
          </div>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl text-balance">
            Mëso Duke Luajtur!
          </h1>
          <p className="text-base font-semibold text-muted-foreground text-pretty">
            Zgjidh lëndën që dëshiron të mësosh
          </p>
        </div>

        {/* Game Cards */}
        <div className="flex flex-col gap-3">
          {GAME_ORDER.map((gameType, index) => {
            const config = GAME_TYPE_CONFIG[gameType]
            const styles = CARD_STYLES[gameType]

            return (
              <button
                key={gameType}
                onClick={() => onSelectGame(gameType)}
                className={`
                  group flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4
                  text-left transition-all duration-200 active:scale-[0.97]
                  hover:shadow-md hover:-translate-y-0.5
                  ${styles.bg} ${styles.border}
                  animate-fade-in-up
                `}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Icon */}
                <div
                  className={`
                    flex h-14 w-14 shrink-0 items-center justify-center rounded-xl
                    text-2xl font-extrabold shadow-sm
                    transition-transform duration-200 group-hover:scale-110
                    ${styles.iconBg}
                  `}
                >
                  {config.emoji}
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-extrabold text-foreground">
                    {config.label}
                  </h2>
                  <p className="text-sm font-medium text-muted-foreground">
                    {config.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="shrink-0 text-lg text-muted-foreground transition-transform duration-200 group-hover:translate-x-1">
                  {"\u203A"}
                </div>
              </button>
            )
          })}

          {/* Abetarja Card */}
          <button
            onClick={onOpenAbetarja}
            className={`
              group flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4
              text-left transition-all duration-200 active:scale-[0.97]
              hover:shadow-md hover:-translate-y-0.5
              bg-[hsl(25,80%,96%)] border-[hsl(25,50%,82%)]
              animate-fade-in-up
            `}
            style={{ animationDelay: `${GAME_ORDER.length * 80}ms` }}
          >
            {/* Icon */}
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl font-extrabold shadow-sm transition-transform duration-200 group-hover:scale-110 bg-[hsl(25,70%,50%)] text-[hsl(0,0%,100%)]"
            >
              Ab
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-extrabold text-foreground">
                Abetarja
              </h2>
              <p className="text-sm font-medium text-muted-foreground">
                Shfleto Abetaren e vjetër shqipe
              </p>
            </div>

            {/* Arrow */}
            <div className="shrink-0 text-lg text-muted-foreground transition-transform duration-200 group-hover:translate-x-1">
              {"\u203A"}
            </div>
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-8 rounded-2xl bg-card p-4 text-center shadow-sm border border-border">
          <p className="text-sm font-semibold text-muted-foreground">
            Për fëmijë 6-10 vjeç  |  10 pyetje për lojë
          </p>
        </div>
      </div>
    </div>
  )
}
