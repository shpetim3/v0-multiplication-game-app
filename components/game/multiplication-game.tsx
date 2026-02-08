"use client"

import { useState, useEffect, useCallback } from "react"
import type { Difficulty } from "@/lib/game-utils"
import { StartScreen } from "./start-screen"
import { GameScreen } from "./game-screen"
import { ResultsScreen } from "./results-screen"

type GameState = "start" | "playing" | "results"

export function MultiplicationGame() {
  const [gameState, setGameState] = useState<GameState>("start")
  const [difficulty, setDifficulty] = useState<Difficulty>("fillestar")
  const [finalScore, setFinalScore] = useState(0)
  const [highScores, setHighScores] = useState<Record<Difficulty, number>>({
    fillestar: 0,
    mesatar: 0,
  })

  // Load high scores from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("shumezo-highscores")
      if (saved) {
        setHighScores(JSON.parse(saved))
      }
    } catch {
      // Silently ignore storage errors
    }
  }, [])

  const saveHighScore = useCallback(
    (diff: Difficulty, score: number) => {
      const updated = { ...highScores }
      if (score > updated[diff]) {
        updated[diff] = score
        setHighScores(updated)
        try {
          localStorage.setItem("shumezo-highscores", JSON.stringify(updated))
        } catch {
          // Silently ignore storage errors
        }
      }
    },
    [highScores],
  )

  const handleStart = useCallback((diff: Difficulty) => {
    setDifficulty(diff)
    setGameState("playing")
  }, [])

  const handleFinish = useCallback(
    (score: number) => {
      setFinalScore(score)
      saveHighScore(difficulty, score)
      setGameState("results")
    },
    [difficulty, saveHighScore],
  )

  const handlePlayAgain = useCallback(() => {
    setGameState("start")
  }, [])

  const handleBack = useCallback(() => {
    setGameState("start")
  }, [])

  switch (gameState) {
    case "start":
      return <StartScreen onStart={handleStart} highScores={highScores} />
    case "playing":
      return (
        <GameScreen
          difficulty={difficulty}
          onFinish={handleFinish}
          onBack={handleBack}
        />
      )
    case "results":
      return (
        <ResultsScreen score={finalScore} onPlayAgain={handlePlayAgain} />
      )
  }
}
