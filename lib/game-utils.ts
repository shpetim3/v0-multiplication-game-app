export type Difficulty = "fillestar" | "mesatar"

export interface Question {
  num1: number
  num2: number
  correctAnswer: number
  options: number[]
}

export const TOTAL_QUESTIONS = 10

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  fillestar: "Fillestar (1-5)",
  mesatar: "Mesatar (1-10)",
}

export const DIFFICULTY_RANGES: Record<Difficulty, [number, number]> = {
  fillestar: [1, 5],
  mesatar: [1, 10],
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function generateQuestion(difficulty: Difficulty): Question {
  const [min, max] = DIFFICULTY_RANGES[difficulty]
  const num1 = randomInt(min, max)
  const num2 = randomInt(min, max)
  const correctAnswer = num1 * num2

  const wrongAnswers = new Set<number>()

  while (wrongAnswers.size < 3) {
    let wrong: number

    const strategy = Math.random()
    if (strategy < 0.33) {
      wrong = correctAnswer + randomInt(-3, 3)
    } else if (strategy < 0.66) {
      wrong = randomInt(min, max) * randomInt(min, max)
    } else {
      wrong = correctAnswer + randomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1)
    }

    if (wrong !== correctAnswer && wrong > 0 && !wrongAnswers.has(wrong)) {
      wrongAnswers.add(wrong)
    }
  }

  const options = shuffle([correctAnswer, ...Array.from(wrongAnswers)])

  return { num1, num2, correctAnswer, options }
}

export function getEncouragement(): string {
  const messages = [
    "Bravo! Ti je i/e shkëlqyer!",
    "Fantastike! Vazhdo kështu!",
    "E mrekullueshme! Je shumë i/e zgjuar!",
    "Saktë! Ti je yll!",
    "Perfekt! Vazhdo!",
  ]
  return messages[Math.floor(Math.random() * messages.length)]
}

export function getRetryMessage(): string {
  const messages = [
    "Provo përsëri! Ti mundesh!",
    "Pothuajse! Provo edhe një herë!",
    "Mos u dorëzo! Provo përsëri!",
    "Afër ishe! Provo edhe njëherë!",
  ]
  return messages[Math.floor(Math.random() * messages.length)]
}
