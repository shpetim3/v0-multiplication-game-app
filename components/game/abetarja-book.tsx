"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { ABETARJA_PAGES } from "@/lib/abetarja-data"

interface AbetarjaBookProps {
  onBack: () => void
}

export function AbetarjaBook({ onBack }: AbetarjaBookProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isReadingMode, setIsReadingMode] = useState(false)
  const touchStartX = useRef(0)
  const totalPages = ABETARJA_PAGES.length

  const goNext = useCallback(() => {
    if (isAnimating || currentPage >= totalPages - 1) return
    setDirection("left")
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1)
      setDirection(null)
      setIsAnimating(false)
    }, 250)
  }, [totalPages, currentPage, isAnimating])

  const goPrev = useCallback(() => {
    if (isAnimating || currentPage <= 0) return
    setDirection("right")
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentPage((prev) => prev - 1)
      setDirection(null)
      setIsAnimating(false)
    }, 250)
  }, [currentPage, isAnimating])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX
      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext()
        else goPrev()
      }
    },
    [goNext, goPrev],
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext()
      else if (e.key === "ArrowLeft") goPrev()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goNext, goPrev])

  const page = ABETARJA_PAGES[currentPage]
  const isFirst = currentPage === 0
  const isLast = currentPage === totalPages - 1

  // Reading mode - fullscreen image viewer
  if (isReadingMode) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-black">
        {/* Image display */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <img
            src={`/images/abetarja/page-${currentPage + 1}.jpg`}
            alt={`Faqja ${currentPage + 1}`}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Bottom controls */}
        <div className="bg-black/80 backdrop-blur-sm px-4 py-3 flex items-center justify-between gap-3">
          <button
            onClick={goPrev}
            disabled={isFirst}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              isFirst
                ? "bg-gray-700/50 text-gray-500/50 cursor-not-allowed"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            {"\u2190"} Prapa
          </button>

          <div className="flex items-center gap-2 text-white text-sm font-medium">
            <span>{currentPage + 1}</span>
            <span className="text-white/50">/</span>
            <span className="text-white/70">{totalPages}</span>
          </div>

          <button
            onClick={goNext}
            disabled={isLast}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              isLast
                ? "bg-gray-700/50 text-gray-500/50 cursor-not-allowed"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            Para {"\u2192"}
          </button>
        </div>

        {/* Close button */}
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => setIsReadingMode(false)}
            className="px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 font-bold transition-all text-sm"
          >
            {"\u2715"} Mbyll
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center px-4 py-6 md:py-10">
      <div className="w-full max-w-lg animate-bounce-in">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card text-lg font-bold text-muted-foreground transition-all hover:bg-muted active:scale-95 border border-border"
            aria-label="Kthehu në kryefaqe"
          >
            {"\u2190"}
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-extrabold text-foreground md:text-2xl">
              Abetarja e Vjetër
            </h1>
          </div>
          <button
            onClick={() => setIsReadingMode(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary transition-all hover:bg-primary/20 active:scale-95 border border-primary/20"
            aria-label="Leximi"
            title="Leximi pa pengesa"
          >
            {"\u{1F4D6}"}
          </button>
        </div>

        {/* Page counter */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
            Faqja {currentPage + 1} / {totalPages}
          </span>
        </div>

        {/* Book page */}
        <div
          className={`relative overflow-hidden rounded-2xl border-2 border-border bg-card shadow-lg transition-all duration-250 ${
            direction === "left"
              ? "translate-x-[-8px] opacity-80"
              : direction === "right"
                ? "translate-x-[8px] opacity-80"
                : "translate-x-0 opacity-100"
          }`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Page content */}
          <div className="p-5 md:p-7">
            {/* Letters display */}
            {page.letters && (
              <div className="mb-4 flex items-center justify-center">
                <div className="rounded-xl bg-primary/10 px-6 py-3">
                  <span className="text-4xl font-extrabold tracking-wider text-primary md:text-5xl">
                    {page.letters}
                  </span>
                </div>
              </div>
            )}

            {/* Title */}
            <h2 className="mb-4 text-center text-lg font-extrabold text-foreground md:text-xl text-balance">
              {page.title}
            </h2>

            {/* Separator */}
            <div className="mx-auto mb-4 h-0.5 w-16 rounded-full bg-border" />

            {/* Text content */}
            <div className="mb-4 space-y-1.5">
              {page.text.map((line, i) => (
                <p
                  key={i}
                  className={`text-sm leading-relaxed md:text-base ${
                    line === ""
                      ? "h-2"
                      : line.startsWith("—")
                        ? "font-semibold text-muted-foreground italic"
                        : line === line.toUpperCase() && line.length > 3
                          ? "text-center font-extrabold text-foreground"
                          : "text-foreground"
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Image description */}
            <div className="mb-3 rounded-xl bg-muted/50 p-3 border border-border/50">
              <p className="text-xs font-medium text-muted-foreground italic leading-relaxed">
                <span className="not-italic font-bold text-foreground/60">Ilustrimi: </span>
                {page.imageDescription}
              </p>
            </div>


          </div>

          {/* Page curl decoration */}
          <div className="absolute bottom-0 right-0 h-8 w-8 bg-gradient-to-tl from-border/30 to-transparent rounded-tl-2xl" />
        </div>

        {/* Navigation */}
        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={goPrev}
            disabled={isFirst}
            className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl text-base font-bold transition-all duration-200 active:scale-95 border-2 ${
              isFirst
                ? "border-border bg-muted text-muted-foreground/40 cursor-not-allowed"
                : "border-primary/20 bg-primary/10 text-primary hover:bg-primary/20"
            }`}
          >
            {"\u2190"} Prapa
          </button>

          <button
            onClick={isLast ? onBack : goNext}
            className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl text-base font-bold transition-all duration-200 active:scale-95 border-2 ${
              isLast
                ? "border-accent bg-accent text-accent-foreground hover:opacity-90"
                : "border-primary bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {isLast ? "Përfundo" : "Para"} {isLast ? "\u2713" : "\u2192"}
          </button>
        </div>

        {/* Page dots indicator */}
        <div className="mt-4 flex items-center justify-center gap-1 flex-wrap">
          {ABETARJA_PAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`h-2 rounded-full transition-all duration-200 ${
                i === currentPage
                  ? "w-6 bg-primary"
                  : "w-2 bg-border hover:bg-muted-foreground/30"
              }`}
              aria-label={`Shko te faqja ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
