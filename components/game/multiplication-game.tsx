"use client"

import { useState, useEffect, useCallback } from "react"
import type { Difficulty, GameType } from "@/lib/game-utils"
import { HomeScreen } from "./home-screen"
import { StartScreen } from "./start-screen"
import { GameScreen } from "./game-screen"
import { ResultsScreen } from "./results-screen"
import { AbetarjaBook } from "./abetarja-book"

type AppState = "home" | "start" | "playing" | "results" | "abetarja"

const STORAGE_KEY = "meso-duke-luajtur-scores"

export function MultiplicationGame() {
  const [appState, setAppState] = useState<AppState>("home")
  const [selectedGameType, setSelectedGameType] = useState<GameType>("mbledhje")
  const [difficulty, setDifficulty] = useState<Difficulty>("fillestar")
  const [finalScore, setFinalScore] = useState(0)
  const [highScores, setHighScores] = useState<Record<string, number>>({})

  // Load high scores from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setHighScores(JSON.parse(saved))
      }
    } catch {
      // Silently ignore storage errors
    }
  }, [])

  const saveHighScore = useCallback(
    (gameType: GameType, diff: Difficulty, score: number) => {
      const key = `${gameType}-${diff}`
      const updated = { ...highScores }
      if (score > (updated[key] || 0)) {
        updated[key] = score
        setHighScores(updated)
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        } catch {
          // Silently ignore storage errors
        }
      }
    },
    [highScores],
  )

  const handleSelectGame = useCallback((gameType: GameType) => {
    setSelectedGameType(gameType)
    setAppState("start")
  }, [])

  const handleStart = useCallback((diff: Difficulty) => {
    setDifficulty(diff)
    setAppState("playing")
  }, [])

  const handleFinish = useCallback(
    (score: number) => {
      setFinalScore(score)
      saveHighScore(selectedGameType, difficulty, score)
      setAppState("results")
    },
    [selectedGameType, difficulty, saveHighScore],
  )

  const handlePlayAgain = useCallback(() => {
    setAppState("start")
  }, [])

  const handleGoHome = useCallback(() => {
    setAppState("home")
  }, [])

  const handleOpenAbetarja = useCallback(() => {
    setAppState("abetarja")
  }, [])

  const handleBack = useCallback(() => {
    if (appState === "playing") {
      setAppState("start")
    } else {
      setAppState("home")
    }
  }, [appState])

  switch (appState) {
    case "home":
      return <HomeScreen onSelectGame={handleSelectGame} onOpenAbetarja={handleOpenAbetarja} />
    case "start":
      return (
        <StartScreen
          gameType={selectedGameType}
          onStart={handleStart}
          onBack={handleGoHome}
          highScores={highScores}
        />
      )
    case "playing":
      return (
        <GameScreen
          gameType={selectedGameType}
          difficulty={difficulty}
          onFinish={handleFinish}
          onBack={handleBack}
        />
      )
    case "results":
      return (
        <ResultsScreen
          score={finalScore}
          gameType={selectedGameType}
          onPlayAgain={handlePlayAgain}
          onGoHome={handleGoHome}
        />
      )
    case "abetarja":
      return <AbetarjaBook onBack={handleGoHome} />
  }
}
