export type GameType = "shumezim" | "mbledhje" | "zbritje" | "pjestim" | "rrokje"
export type Difficulty = "fillestar" | "mesatar"

export interface MathQuestion {
  type: "math"
  num1: number
  num2: number
  operator: string
  correctAnswer: string
  options: string[]
}

export interface SyllableQuestion {
  type: "syllable"
  word: string
  prompt: string
  correctAnswer: string
  options: string[]
}

export type Question = MathQuestion | SyllableQuestion

export const TOTAL_QUESTIONS = 10

export interface GameTypeConfig {
  label: string
  emoji: string
  colorClass: string
  description: string
}

export const GAME_TYPE_CONFIG: Record<GameType, GameTypeConfig> = {
  mbledhje: {
    label: "Mbledhja",
    emoji: "+",
    colorClass: "bg-accent text-accent-foreground",
    description: "Mëso mbledhjen e numrave",
  },
  zbritje: {
    label: "Zbritja",
    emoji: "-",
    colorClass: "bg-secondary text-secondary-foreground",
    description: "Mëso zbritjen e numrave",
  },
  shumezim: {
    label: "Shumëzimi",
    emoji: "\u00d7",
    colorClass: "bg-primary text-primary-foreground",
    description: "Mëso tabelën e shumëzimit",
  },
  pjestim: {
    label: "Pjesëtimi",
    emoji: "\u00f7",
    colorClass: "bg-[hsl(280,60%,55%)] text-[hsl(0,0%,100%)]",
    description: "Mëso pjesëtimin e numrave",
  },
  rrokje: {
    label: "Rrokjet",
    emoji: "Aa",
    colorClass: "bg-[hsl(340,65%,55%)] text-[hsl(0,0%,100%)]",
    description: "Mëso rrokjet e gjuhës shqipe",
  },
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  fillestar: "Fillëstar (1-5)",
  mesatar: "Mesatar (1-10)",
}

export const DIFFICULTY_RANGES: Record<Difficulty, [number, number]> = {
  fillestar: [1, 5],
  mesatar: [1, 10],
}

// --- Syllable Data ---

interface SyllableWord {
  word: string
  rrokje: string[]
}

const SYLLABLE_WORDS_EASY: SyllableWord[] = [
  { word: "lule", rrokje: ["lu", "le"] },
  { word: "derë", rrokje: ["de", "rë"] },
  { word: "dorë", rrokje: ["do", "rë"] },
  { word: "bukë", rrokje: ["bu", "kë"] },
  { word: "pulë", rrokje: ["pu", "lë"] },
  { word: "topë", rrokje: ["to", "pë"] },
  { word: "lopë", rrokje: ["lo", "pë"] },
  { word: "macë", rrokje: ["ma", "cë"] },
  { word: "mollë", rrokje: ["mo", "llë"] },
  { word: "shtëpi", rrokje: ["shtë", "pi"] },
  { word: "libër", rrokje: ["li", "bër"] },
  { word: "pemë", rrokje: ["pe", "më"] },
  { word: "dimër", rrokje: ["di", "mër"] },
  { word: "verë", rrokje: ["ve", "rë"] },
  { word: "dritë", rrokje: ["dri", "të"] },
  { word: "fushë", rrokje: ["fu", "shë"] },
  { word: "lumi", rrokje: ["lu", "mi"] },
  { word: "mali", rrokje: ["ma", "li"] },
  { word: "goja", rrokje: ["go", "ja"] },
  { word: "babi", rrokje: ["ba", "bi"] },
  { word: "mami", rrokje: ["ma", "mi"] },
  { word: "nëna", rrokje: ["në", "na"] },
  { word: "punë", rrokje: ["pu", "në"] },
  { word: "këngë", rrokje: ["kë", "ngë"] },
  { word: "miku", rrokje: ["mi", "ku"] },
  { word: "dielli", rrokje: ["die", "lli"] },
  { word: "hëna", rrokje: ["hë", "na"] },
  { word: "ylli", rrokje: ["y", "lli"] },
  { word: "rruga", rrokje: ["rru", "ga"] },
  { word: "bletë", rrokje: ["ble", "të"] },
]

const SYLLABLE_WORDS_MEDIUM: SyllableWord[] = [
  ...SYLLABLE_WORDS_EASY,
  { word: "dritare", rrokje: ["dri", "ta", "re"] },
  { word: "fëmijë", rrokje: ["fë", "mi", "jë"] },
  { word: "fluturë", rrokje: ["flu", "tu", "rë"] },
  { word: "makinë", rrokje: ["ma", "ki", "në"] },
  { word: "limonë", rrokje: ["li", "mo", "në"] },
  { word: "bananë", rrokje: ["ba", "na", "në"] },
  { word: "muzikë", rrokje: ["mu", "zi", "kë"] },
  { word: "familje", rrokje: ["fa", "mi", "lje"] },
  { word: "mësues", rrokje: ["më", "su", "es"] },
  { word: "nxënës", rrokje: ["nxë", "nës"] },
  { word: "shkollë", rrokje: ["shko", "llë"] },
  { word: "kafshë", rrokje: ["ka", "fshë"] },
  { word: "kopësht", rrokje: ["ko", "pësht"] },
  { word: "detyrë", rrokje: ["de", "ty", "rë"] },
  { word: "abetare", rrokje: ["a", "be", "ta", "re"] },
  { word: "rëshira", rrokje: ["rë", "shi", "ra"] },
  { word: "vëgimë", rrokje: ["vë", "gi", "më"] },
  { word: "kalemi", rrokje: ["ka", "le", "mi"] },
  { word: "korizi", rrokje: ["ko", "ri", "zi"] },
  { word: "betejë", rrokje: ["be", "te", "jë"] },
]

// --- Helpers ---

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

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// --- Math Question Generators ---

function generateMathOptions(
  correctAnswer: number,
  min: number,
  max: number,
): string[] {
  const wrongAnswers = new Set<number>()

  while (wrongAnswers.size < 3) {
    let wrong: number
    const strategy = Math.random()
    if (strategy < 0.33) {
      wrong = correctAnswer + randomInt(-3, 3)
    } else if (strategy < 0.66) {
      wrong = correctAnswer + randomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1)
    } else {
      wrong = randomInt(min * 2, max * max)
    }
    if (wrong !== correctAnswer && wrong >= 0 && !wrongAnswers.has(wrong)) {
      wrongAnswers.add(wrong)
    }
  }

  return shuffle([
    String(correctAnswer),
    ...Array.from(wrongAnswers).map(String),
  ])
}

function generateAdditionQuestion(difficulty: Difficulty): MathQuestion {
  const [min, max] = DIFFICULTY_RANGES[difficulty]
  const rangeMax = difficulty === "fillestar" ? 10 : 20
  const num1 = randomInt(min, rangeMax)
  const num2 = randomInt(min, rangeMax)
  const correct = num1 + num2

  return {
    type: "math",
    num1,
    num2,
    operator: "+",
    correctAnswer: String(correct),
    options: generateMathOptions(correct, 0, rangeMax * 2),
  }
}

function generateSubtractionQuestion(difficulty: Difficulty): MathQuestion {
  const rangeMax = difficulty === "fillestar" ? 10 : 20
  let num1 = randomInt(2, rangeMax)
  let num2 = randomInt(1, rangeMax)
  // Ensure positive result
  if (num2 > num1) {
    ;[num1, num2] = [num2, num1]
  }
  const correct = num1 - num2

  return {
    type: "math",
    num1,
    num2,
    operator: "-",
    correctAnswer: String(correct),
    options: generateMathOptions(correct, 0, rangeMax),
  }
}

function generateMultiplicationQuestion(difficulty: Difficulty): MathQuestion {
  const [min, max] = DIFFICULTY_RANGES[difficulty]
  const num1 = randomInt(min, max)
  const num2 = randomInt(min, max)
  const correct = num1 * num2

  return {
    type: "math",
    num1,
    num2,
    operator: "\u00d7",
    correctAnswer: String(correct),
    options: generateMathOptions(correct, min, max * max),
  }
}

function generateDivisionQuestion(difficulty: Difficulty): MathQuestion {
  const [min, max] = DIFFICULTY_RANGES[difficulty]
  // Generate a * b, then ask (a*b) / a = b
  const divisor = randomInt(Math.max(min, 1), max)
  const quotient = randomInt(min, max)
  const dividend = divisor * quotient

  return {
    type: "math",
    num1: dividend,
    num2: divisor,
    operator: "\u00f7",
    correctAnswer: String(quotient),
    options: generateMathOptions(quotient, 0, max * max),
  }
}

// --- Syllable Question Generator ---

function formatSyllables(rrokje: string[]): string {
  return rrokje.join("-")
}

function generateWrongBreakdown(
  correctWord: SyllableWord,
  allWords: SyllableWord[],
): string {
  // Strategy 1: Use breakdown from another word
  const otherWords = allWords.filter((w) => w.word !== correctWord.word)
  if (otherWords.length > 0 && Math.random() < 0.5) {
    return formatSyllables(pickRandom(otherWords).rrokje)
  }

  // Strategy 2: Create a wrong breakdown by shifting split
  const word = correctWord.word
  const len = word.length
  if (len >= 3) {
    const splitPoint = randomInt(1, len - 1)
    const wrong = word.slice(0, splitPoint) + "-" + word.slice(splitPoint)
    if (wrong !== formatSyllables(correctWord.rrokje)) {
      return wrong
    }
  }

  // Fallback to another word's breakdown
  return formatSyllables(pickRandom(allWords.filter((w) => w.word !== correctWord.word)).rrokje)
}

function generateSyllableQuestion(difficulty: Difficulty): SyllableQuestion {
  const wordList =
    difficulty === "fillestar" ? SYLLABLE_WORDS_EASY : SYLLABLE_WORDS_MEDIUM
  const wordData = pickRandom(wordList)
  const syllableCount = wordData.rrokje.length

  // Randomly choose question type
  const questionType = Math.random() < 0.5 ? "count" : "breakdown"

  if (questionType === "count") {
    // "Sa rrokje ka fjala X?"
    const correctAnswer = String(syllableCount)
    const wrongOptions = new Set<string>()

    while (wrongOptions.size < 3) {
      const wrong = String(
        Math.max(1, syllableCount + randomInt(-2, 2)),
      )
      if (wrong !== correctAnswer && !wrongOptions.has(wrong)) {
        wrongOptions.add(wrong)
      }
    }

    return {
      type: "syllable",
      word: wordData.word,
      prompt: "Sa rrokje ka kjo fjalë?",
      correctAnswer,
      options: shuffle([correctAnswer, ...Array.from(wrongOptions)]),
    }
  } else {
    // "Si ndahet fjala X ne rrokje?"
    const correctBreakdown = formatSyllables(wordData.rrokje)
    const wrongOptions = new Set<string>()

    while (wrongOptions.size < 3) {
      const wrong = generateWrongBreakdown(wordData, wordList)
      if (wrong !== correctBreakdown && !wrongOptions.has(wrong)) {
        wrongOptions.add(wrong)
      }
    }

    return {
      type: "syllable",
      word: wordData.word,
      prompt: "Si ndahet në rrokje?",
      correctAnswer: correctBreakdown,
      options: shuffle([correctBreakdown, ...Array.from(wrongOptions)]),
    }
  }
}

// --- Main Generator ---

export function generateQuestion(
  gameType: GameType,
  difficulty: Difficulty,
): Question {
  switch (gameType) {
    case "mbledhje":
      return generateAdditionQuestion(difficulty)
    case "zbritje":
      return generateSubtractionQuestion(difficulty)
    case "shumezim":
      return generateMultiplicationQuestion(difficulty)
    case "pjestim":
      return generateDivisionQuestion(difficulty)
    case "rrokje":
      return generateSyllableQuestion(difficulty)
  }
}

// --- Messages ---

export function getEncouragement(): string {
  const messages = [
    "Bravo! Ti je i/e shkëlqyer!",
    "Fantastikë! Vazhdo kështu!",
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
