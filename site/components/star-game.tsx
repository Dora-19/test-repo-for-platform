"use client"

import { useEffect, useRef, useState } from "react"

type Thing = { id: number; x: number; y: number; speed: number; kind: "star" | "rock" }

export function StarGame({ onClose }: { onClose: () => void }) {
  const [things, setThings] = useState<Thing[]>([])
  const [rocketX, setRocketX] = useState(50)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [best, setBest] = useState(0)
  const [over, setOver] = useState(false)
  const [round, setRound] = useState(0)

  const rocketRef = useRef(50)
  const thingsRef = useRef<Thing[]>([])
  const scoreRef = useRef(0)
  const livesRef = useRef(3)

  useEffect(() => {
    setBest(Number(localStorage.getItem("dora-best") || 0))
  }, [])

  useEffect(() => {
    const move = (x: number) => {
      const p = Math.min(95, Math.max(5, (x / window.innerWidth) * 100))
      rocketRef.current = p
      setRocketX(p)
    }
    const onMouse = (e: MouseEvent) => move(e.clientX)
    const onTouch = (e: TouchEvent) => move(e.touches[0].clientX)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") move(((rocketRef.current - 6) / 100) * window.innerWidth)
      if (e.key === "ArrowRight") move(((rocketRef.current + 6) / 100) * window.innerWidth)
    }
    window.addEventListener("mousemove", onMouse)
    window.addEventListener("touchmove", onTouch)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("touchmove", onTouch)
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  useEffect(() => {
    thingsRef.current = []
    scoreRef.current = 0
    livesRef.current = 3
    setScore(0)
    setLives(3)
    setOver(false)

    let id = 0
    let frame = 0
    let raf = 0

    const tick = () => {
      frame++
      const level = 1 + scoreRef.current / 15
      if (frame % Math.max(12, Math.floor(35 / level)) === 0) {
        thingsRef.current.push({
          id: id++,
          x: 5 + Math.random() * 90,
          y: -5,
          speed: (0.35 + Math.random() * 0.4) * level,
          kind: Math.random() < 0.28 ? "rock" : "star",
        })
      }

      const kept: Thing[] = []
      for (const t of thingsRef.current) {
        t.y += t.speed
        const hit = t.y > 82 && t.y < 92 && Math.abs(t.x - rocketRef.current) < 6
        if (hit) {
          if (t.kind === "star") {
            scoreRef.current++
            setScore(scoreRef.current)
          } else {
            livesRef.current--
            setLives(livesRef.current)
          }
          continue
        }
        if (t.y < 105) kept.push(t)
      }
      thingsRef.current = kept
      setThings([...kept])

      if (livesRef.current <= 0) {
        setOver(true)
        const old = Number(localStorage.getItem("dora-best") || 0)
        if (scoreRef.current > old) {
          localStorage.setItem("dora-best", String(scoreRef.current))
          setBest(scoreRef.current)
        }
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [round])

  return (
    <div className="fixed inset-0 z-50 cursor-none overflow-hidden bg-[#0d0221]/95 backdrop-blur-sm select-none">
      <div className="absolute top-4 left-4 flex gap-6 font-mono text-lg text-pink-200">
        <span>⭐ {score}</span>
        <span>{"💖".repeat(Math.max(0, lives))}</span>
        <span className="text-purple-300">En iyi: {best}</span>
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 cursor-pointer rounded-full border border-pink-400/40 px-4 py-1 text-pink-200 hover:bg-pink-500/20"
      >
        Kapat ✕
      </button>

      {things.map((t) => (
        <span
          key={t.id}
          className="absolute text-3xl"
          style={{ left: `${t.x}%`, top: `${t.y}%`, transform: "translate(-50%, -50%)" }}
        >
          {t.kind === "star" ? "⭐" : "☄️"}
        </span>
      ))}

      <span
        className="absolute text-5xl drop-shadow-[0_0_20px_#ec4899]"
        style={{ left: `${rocketX}%`, top: "87%", transform: "translate(-50%, -50%) rotate(-45deg)" }}
      >
        🚀
      </span>

      {!over && score === 0 && (
        <p className="absolute top-1/3 w-full text-center text-xl text-pink-100/80">
          Yıldızları topla ⭐ Kuyruklu yıldızlardan kaç ☄️
        </p>
      )}

      {over && (
        <div className="absolute inset-0 flex cursor-auto flex-col items-center justify-center gap-6 text-center">
          <h2 className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-6xl font-black text-transparent">
            Oyun bitti!
          </h2>
          <p className="text-2xl text-pink-100">{score} yıldız topladın ⭐</p>
          <button
            onClick={() => setRound((r) => r + 1)}
            className="cursor-pointer rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-3 text-xl font-bold text-white shadow-[0_0_30px_#ec4899] hover:scale-105"
          >
            Tekrar oyna 🚀
          </button>
        </div>
      )}
    </div>
  )
}
