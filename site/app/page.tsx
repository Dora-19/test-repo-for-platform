"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import confetti from "canvas-confetti"

import { CoolMode } from "@/components/ui/cool-mode"
import { Marquee } from "@/components/ui/marquee"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { SparklesText } from "@/components/ui/sparkles-text"

const sparkle = { first: "#facc15", second: "#ec4899" }

const sections = [
  { id: "ben-kimim", label: "Ben Kimim" },
  { id: "kostumlerim", label: "Kostümlerim" },
  { id: "maceralarim", label: "Maceralarım" },
  { id: "hazine", label: "Hazine Sandığım" },
]

const costumes = [
  { emoji: "🏴‍☠️", title: "Kaptan Şapkası", text: "Kocaman tüylü, pembe kurdeleli şapkam." },
  { emoji: "🗡️", title: "Köpük Kılıç", text: "Tatlış ama çok cesur! Kimseyi acıtmaz." },
  { emoji: "🦜", title: "Papağanım", text: "Omzumda oturur, her şeyi tekrar eder." },
  { emoji: "🧭", title: "Sihirli Pusula", text: "Hep hazineyi gösterir… genelde." },
]

const adventures = [
  { emoji: "🌊", title: "Pembe Deniz Yolculuğu", text: "Arkadaşlarımla gemimizi kurduk ve dev dalgaları aştık!" },
  { emoji: "🗺️", title: "Kayıp Harita", text: "Ormanda saklanmış bir haritayı bulup ipuçlarını çözdük." },
  { emoji: "🏝️", title: "Hazine Adası", text: "Sonunda X işaretini bulduk. İçinden kalpler ve altınlar çıktı!" },
]

const marqueeItems = ["🪙 Altın", "💖 Kalp", "🏴‍☠️ Korsan", "⚔️ Macera", "🦜 Papağan", "💎 Mücevher", "🗺️ Harita", "⚓ Çapa"]

function burst(x = 0.5, y = 0.5) {
  const coin = confetti.shapeFromText({ text: "🪙", scalar: 3 })
  const heart = confetti.shapeFromText({ text: "💖", scalar: 3 })
  confetti({
    particleCount: 70,
    spread: 120,
    startVelocity: 45,
    origin: { x, y },
    shapes: [coin, heart],
    scalar: 3,
    zIndex: 9999,
  })
}

type Drop = { id: number; left: number; delay: number; duration: number; emoji: string; size: number }

function FallingTreasure() {
  const [drops, setDrops] = useState<Drop[]>([])

  useEffect(() => {
    setDrops(
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 6,
        emoji: ["🪙", "🪙", "🪙", "💖", "💕", "💎"][i % 6],
        size: 18 + Math.random() * 22,
      }))
    )
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {drops.map((d) => (
        <motion.span
          key={d.id}
          className="absolute -top-16"
          style={{ left: `${d.left}%`, fontSize: d.size }}
          animate={{ y: ["0vh", "115vh"], rotate: [0, 360] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "linear" }}
        >
          {d.emoji}
        </motion.span>
      ))}
    </div>
  )
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mb-12 text-center"
    >
      <SparklesText colors={sparkle} className="text-5xl font-black tracking-tight text-pink-600 md:text-6xl">
        {children}
      </SparklesText>
    </motion.div>
  )
}

export default function Home() {
  const [open, setOpen] = useState(false)
  const [coins, setCoins] = useState(0)

  // Sayfanın her yerine tıklayınca para ve kalp patlar
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      burst(e.clientX / window.innerWidth, e.clientY / window.innerHeight)
      setCoins((c) => c + 1)
    }
    window.addEventListener("click", onClick)
    return () => window.removeEventListener("click", onClick)
  }, [])

  const openChest = () => {
    setOpen(true)
    for (let i = 0; i < 5; i++) setTimeout(() => burst(0.2 + Math.random() * 0.6, 0.6), i * 250)
    setCoins((c) => c + 100)
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-pink-100 via-pink-200 to-fuchsia-300 text-pink-900">
      <FallingTreasure />
      <div className="pointer-events-none fixed -top-40 -left-40 z-0 size-[500px] rounded-full bg-pink-400/40 blur-[120px]" />
      <div className="pointer-events-none fixed -right-40 -bottom-40 z-0 size-[500px] rounded-full bg-yellow-300/40 blur-[120px]" />

      <nav className="fixed top-0 z-40 flex w-full items-center justify-center gap-5 border-b border-pink-300/50 bg-pink-50/70 py-4 text-xs font-bold tracking-[0.2em] text-pink-600 uppercase backdrop-blur-md md:gap-10">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="transition hover:text-yellow-500">
            {s.label}
          </a>
        ))}
        <span className="rounded-full bg-yellow-300 px-3 py-1 tracking-normal text-yellow-900 shadow">🪙 {coins}</span>
      </nav>

      {/* Giriş */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute size-[620px] rounded-full border-4 border-dashed border-pink-400/40"
        >
          <span className="absolute -top-6 left-1/2 text-5xl">🏴‍☠️</span>
          <span className="absolute top-1/2 -right-6 text-5xl">💖</span>
          <span className="absolute -bottom-6 left-1/3 text-5xl">🪙</span>
          <span className="absolute top-1/3 -left-6 text-5xl">⚓</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 rounded-full border-2 border-pink-400 bg-white/60 px-5 py-2 text-sm font-bold text-pink-600 shadow-[0_0_25px_#ec489960]"
        >
          ⚔️ LARP Korsanı ⚔️
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.4, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <motion.div animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity }}>
            <SparklesText
              colors={sparkle}
              sparklesCount={20}
              className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-yellow-400 bg-clip-text text-[9rem] leading-none font-black tracking-tighter text-transparent drop-shadow-[0_8px_0_#be185d] md:text-[15rem]"
            >
              VC
            </SparklesText>
          </motion.div>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 max-w-xl text-xl font-semibold text-pink-700 md:text-2xl"
        >
          Yedi denizin en tatlış korsanı! 💖🏴‍☠️
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-10"
        >
          <CoolMode options={{ particle: "🪙" }}>
            <a href="#ben-kimim">
              <ShimmerButton background="linear-gradient(135deg, #ec4899, #f59e0b)" shimmerColor="#fef08a" className="px-8 py-4 text-lg font-bold">
                Gemiye bin! ⛵
              </ShimmerButton>
            </a>
          </CoolMode>
        </motion.div>

        <p className="mt-6 text-sm text-pink-600/70">İpucu: her yere tıkla, altın topla! 🪙</p>
      </section>

      <Marquee className="relative z-10 border-y-4 border-pink-400 bg-pink-500 py-3 text-xl font-bold text-white [--duration:20s]">
        {marqueeItems.map((m) => (
          <span key={m} className="mx-4">{m}</span>
        ))}
      </Marquee>

      {/* Ben Kimim */}
      <section id="ben-kimim" className="relative z-10 mx-auto max-w-4xl scroll-mt-20 px-6 py-28">
        <Title>Ben Kimim</Title>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2.5rem] border-4 border-pink-300 bg-white/70 p-10 text-center text-xl leading-relaxed shadow-[0_10px_0_#f9a8d4] backdrop-blur"
        >
          <motion.div animate={{ rotate: [-8, 8, -8] }} transition={{ duration: 2, repeat: Infinity }} className="mb-4 text-7xl">
            🏴‍☠️
          </motion.div>
          Ahoy! Ben <b className="text-pink-500">VC</b>! En sevdiğim hobi <b className="text-pink-500">LARP</b>: kostümümü giyip
          gerçek bir korsan gibi maceralara atılıyorum. Kalpleri, pembe rengi ve parlak altınları çok seviyorum.
          Gemime hoş geldin, tayfam ol! 💖
        </motion.div>
      </section>

      {/* Kostümlerim */}
      <section id="kostumlerim" className="relative z-10 mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
        <Title>Kostümlerim</Title>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {costumes.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -12, rotate: i % 2 ? 3 : -3, scale: 1.05 }}
              className="flex flex-col items-center rounded-[2rem] border-4 border-pink-300 bg-white/70 p-8 text-center shadow-[0_8px_0_#f9a8d4]"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
                className="mb-4 flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-300 to-yellow-200 text-5xl shadow-[0_0_30px_#ec489980]"
              >
                {c.emoji}
              </motion.div>
              <h3 className="text-2xl font-black text-pink-600">{c.title}</h3>
              <p className="mt-2 text-pink-800/80">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Maceralarım */}
      <section id="maceralarim" className="relative z-10 mx-auto max-w-5xl scroll-mt-20 px-6 py-28">
        <Title>Maceralarım</Title>
        <div className="space-y-6">
          {adventures.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, x: i % 2 ? 80 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-6 rounded-[2rem] border-4 border-pink-300 bg-gradient-to-r from-white/80 to-pink-100/80 p-8 shadow-[0_8px_0_#f9a8d4]"
            >
              <span className="text-6xl">{a.emoji}</span>
              <div>
                <h3 className="text-2xl font-black text-pink-600">{a.title}</h3>
                <p className="mt-1 text-lg text-pink-800/80">{a.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hazine Sandığım */}
      <section id="hazine" className="relative z-10 mx-auto max-w-4xl scroll-mt-20 px-6 py-28 text-center">
        <Title>Hazine Sandığım</Title>
        <motion.button
          onClick={(e) => {
            e.stopPropagation()
            openChest()
          }}
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          whileTap={{ scale: 0.9 }}
          animate={open ? { y: [0, -20, 0] } : { rotate: [-3, 3, -3] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="cursor-pointer text-[10rem] leading-none drop-shadow-[0_0_40px_#facc15]"
        >
          {open ? "💰" : "🧰"}
        </motion.button>
        <p className="mt-6 text-2xl font-bold text-pink-700">
          {open ? "Hazineyi buldun! 🎉 Sen de artık tayfamdasın! 💖" : "Sandığı açmak için tıkla! 👆"}
        </p>
      </section>

      <footer className="relative z-10 py-16 text-center font-semibold text-pink-700/70">
        Kaptan VC'nin gemisinden sevgilerle 💖🏴‍☠️ · 2026
      </footer>
    </main>
  )
}
