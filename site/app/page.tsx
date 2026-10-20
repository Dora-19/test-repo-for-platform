"use client"

import { useCallback, useEffect, useState } from "react"
import { motion } from "motion/react"

import { AuroraText } from "@/components/ui/aurora-text"
import { Meteors } from "@/components/ui/meteors"
import { Particles } from "@/components/ui/particles"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { StarGame } from "@/components/star-game"

const colors = ["#ec4899", "#a855f7", "#f0abfc", "#7c3aed"]

const planets = [
  { name: "Merkür", emoji: "🔥", text: "Güneş'e en yakın, en hızlı gezegen.", from: "#f9a8d4", to: "#9333ea" },
  { name: "Mars", emoji: "🔴", text: "Kızıl gezegen. Bir gün oraya gidenler bizim nesil olacak!", from: "#f472b6", to: "#be185d" },
  { name: "Jüpiter", emoji: "🌪️", text: "En büyük gezegen. Dev bir fırtınası var.", from: "#e9d5ff", to: "#7e22ce" },
  { name: "Satürn", emoji: "💍", text: "Halkalarıyla uzayın en havalısı.", from: "#fbcfe8", to: "#a855f7" },
]

const dreams = [
  { emoji: "🚀", title: "Uzaya gitmek", text: "Dünya'ya yukarıdan bakmak istiyorum." },
  { emoji: "💡", title: "Kendi şirketim", text: "Y Combinator'a girip dünyayı değiştiren bir şey yapmak!" },
  { emoji: "🌍", title: "Gençlere ilham", text: "Gençlerin hayal gücünün sınırı yok, gökyüzü bile değil." },
]

const loves = ["🌌 Yıldızlara bakmak", "🎮 Oyunlar", "💜 Mor renk", "🎧 Müzik", "🛸 Bilim kurgu", "✨ Yeni şeyler öğrenmek", "👫 Arkadaşlarım", "🌙 Gece gökyüzü"]

const sections = [
  { id: "hakkimda", label: "Hakkımda" },
  { id: "gezegenler", label: "Gezegenler" },
  { id: "hayallerim", label: "Hayallerim" },
  { id: "sevdiklerim", label: "Sevdiğim Şeyler" },
]

function Title({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mb-12 text-center text-5xl font-black tracking-tight md:text-6xl"
    >
      <AuroraText colors={colors}>{children}</AuroraText>
    </motion.h2>
  )
}

export default function Home() {
  const [game, setGame] = useState(false)
  const closeGame = useCallback(() => setGame(false), [])

  // Gizli şifre: klavyede "uzay" yaz
  useEffect(() => {
    let typed = ""
    const onKey = (e: KeyboardEvent) => {
      typed = (typed + e.key.toLowerCase()).slice(-4)
      if (typed === "uzay") setGame(true)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#1e3a8a] text-pink-50">
      <Particles className="fixed inset-0 z-0" quantity={180} color="#f0abfc" ease={60} />
      <div className="pointer-events-none fixed -top-40 -left-40 z-0 size-[500px] rounded-full bg-purple-600/30 blur-[120px]" />
      <div className="pointer-events-none fixed -right-40 -bottom-40 z-0 size-[500px] rounded-full bg-pink-500/25 blur-[120px]" />

      <nav className="fixed top-0 z-40 flex w-full justify-center gap-6 border-b border-pink-300/10 bg-[#1e3a8a]/60 py-4 text-xs font-medium tracking-[0.25em] text-pink-200/80 uppercase backdrop-blur-md md:gap-10">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="transition hover:text-pink-400">
            {s.label}
          </a>
        ))}
      </nav>

      {/* Giriş */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Meteors number={30} className="bg-pink-300" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute size-[640px] rounded-full border border-dashed border-purple-400/20"
        >
          <span className="absolute -top-5 left-1/2 text-4xl">🪐</span>
          <span className="absolute top-1/2 -right-4 text-3xl">🌙</span>
          <span className="absolute -bottom-4 left-1/3 text-3xl">⭐</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/50 bg-orange-500/10 px-5 py-2 text-sm font-semibold text-orange-200 shadow-[0_0_25px_#f9731660]"
        >
          <span className="flex size-6 items-center justify-center rounded bg-orange-500 font-black text-white">Y</span>
          Y Combinator
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="text-[7rem] leading-none font-black tracking-tighter drop-shadow-[0_0_40px_#a855f780] md:text-[13rem]"
        >
          <AuroraText colors={colors} speed={1.5}>DORA</AuroraText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 max-w-xl text-xl text-pink-100/80 md:text-2xl"
        >
          Gençlik bir roket gibidir. Yakıtı hayallerimiz! 🚀
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-10"
        >
          <a href="#hakkimda">
            <ShimmerButton background="linear-gradient(135deg, #7c3aed, #db2777)" shimmerColor="#fbcfe8" className="px-8 py-4 text-lg font-bold">
              Yolculuğa başla ✨
            </ShimmerButton>
          </a>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 text-pink-300/60"
        >
          ↓
        </motion.div>
      </section>

      {/* Hakkımda */}
      <section id="hakkimda" className="relative z-10 mx-auto max-w-4xl scroll-mt-20 px-6 py-28">
        <Title>Hakkımda</Title>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-pink-300/20 bg-gradient-to-br from-purple-900/40 to-pink-900/30 p-10 text-center text-xl leading-relaxed shadow-[0_0_60px_#a855f730] backdrop-blur"
        >
          <div className="mb-4 text-6xl">👩‍🚀</div>
          Merhaba, ben <b className="text-pink-300">Dora</b>! Uzayı ve gençliği çok seviyorum.
          Bence gençler yıldızlar gibi: her biri farklı parlıyor. Bu site benim küçük evrenim.
          Gezegenleri keşfet, hayallerimi oku, belki bir sürpriz bile bulursun… 🤫
        </motion.div>
      </section>

      {/* Gezegenler */}
      <section id="gezegenler" className="relative z-10 mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
        <Title>Gezegenler</Title>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {planets.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10, scale: 1.04 }}
              className="flex flex-col items-center rounded-3xl border border-purple-300/20 bg-white/5 p-8 text-center backdrop-blur"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12 + i * 4, repeat: Infinity, ease: "linear" }}
                className="mb-6 size-28 rounded-full"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${p.from}, ${p.to})`,
                  boxShadow: `0 0 50px ${p.to}90, inset -12px -12px 30px #00000070`,
                }}
              />
              <h3 className="text-2xl font-bold text-pink-100">
                {p.emoji} {p.name}
              </h3>
              <p className="mt-2 text-pink-100/70">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hayallerim */}
      <section id="hayallerim" className="relative z-10 mx-auto max-w-5xl scroll-mt-20 px-6 py-28">
        <Title>Hayallerim</Title>
        <div className="space-y-6">
          {dreams.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, x: i % 2 ? 80 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-6 rounded-3xl border border-pink-300/20 bg-gradient-to-r from-pink-500/10 to-purple-600/20 p-8"
            >
              <span className="text-6xl">{d.emoji}</span>
              <div>
                <h3 className="text-2xl font-bold text-pink-200">{d.title}</h3>
                <p className="mt-1 text-lg text-pink-100/75">{d.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sevdiğim Şeyler */}
      <section id="sevdiklerim" className="relative z-10 mx-auto max-w-5xl scroll-mt-20 px-6 py-28">
        <Title>Sevdiğim Şeyler</Title>
        <div className="flex flex-wrap justify-center gap-4">
          {loves.map((l, i) => (
            <motion.span
              key={l}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring" }}
              whileHover={{ scale: 1.15, rotate: -3 }}
              className="cursor-default rounded-full border border-pink-300/30 bg-purple-800/30 px-6 py-3 text-lg shadow-[0_0_20px_#ec489930]"
            >
              {l}
            </motion.span>
          ))}
        </div>
      </section>

      <footer className="relative z-10 flex flex-col items-center gap-3 py-16 text-center text-pink-200/50">
        <p>Dora'nın evreninden sevgilerle 💜 · 2026</p>
        {/* Gizli oyun düğmesi */}
        <button
          onClick={() => setGame(true)}
          title="?"
          className="cursor-pointer text-xl opacity-20 transition hover:scale-150 hover:opacity-100"
        >
          🚀
        </button>
      </footer>

      {game && <StarGame onClose={closeGame} />}
    </main>
  )
}
