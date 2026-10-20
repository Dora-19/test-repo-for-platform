"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, Send, X } from "lucide-react"

type Message = { id: number; from: "bot" | "user"; text: string; reply?: boolean }

const welcome = "Merhaba! Ben VC'yi tanıtan asistanım. Onun projeleri, ilgi alanları, başarıları ve hedefleri hakkında bana soru sorabilirsin."
const suggestions = ["En büyük başarısı nedir?", "Hangi projeleri yaptı?", "Gelecek hedefleri nelerdir?"]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "bot", text: welcome }])
  const [text, setText] = useState("")
  const nextId = useRef(1)
  const listRef = useRef<HTMLDivElement>(null)

  // Yeni mesaj gelince en alta kaydır
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, open])

  const send = (value: string) => {
    const question = value.trim()
    if (!question) return
    setMessages((m) => [...m, { id: nextId.current++, from: "user", text: question }])
    setText("")
    setTimeout(() => {
      setMessages((m) => [...m, { id: nextId.current++, from: "bot", text: "Yakında gerçek cevaplar vereceğim!", reply: true }])
    }, 700)
  }

  const isNew = messages.length === 1

  return (
    // Sayfadaki altın patlaması sohbet kutusuna tıklayınca çalışmasın
    <div onClick={(e) => e.stopPropagation()}>
      {open && (
        <div
          id="chatbot-panel"
          className="fixed right-6 bottom-24 z-50 flex h-[28rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-[2rem] border-4 border-pink-300 bg-pink-50/95 text-pink-900 shadow-[0_8px_0_#f9a8d4] backdrop-blur"
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-pink-500 to-amber-400 px-5 py-3 text-white">
            <span className="text-lg font-black">🏴‍☠️ VC'nin Asistanı</span>
            <button
              id="chatbot-kapat"
              onClick={() => setOpen(false)}
              aria-label="Kapat"
              className="rounded-full p-1 transition hover:bg-white/25"
            >
              <X className="size-5" />
            </button>
          </div>

          <div id="chatbot-mesajlar" ref={listRef} className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
            {messages.map((m) => (
              <div
                key={m.id}
                {...(m.from === "user" ? { "data-chatbot-soru": "" } : {})}
                {...(m.reply ? { "data-chatbot-cevap": "" } : {})}
                className={
                  m.from === "user"
                    ? "max-w-[80%] self-end rounded-2xl rounded-br-sm bg-pink-500 px-4 py-2 text-white"
                    : "max-w-[80%] self-start rounded-2xl rounded-bl-sm border-2 border-pink-200 bg-white px-4 py-2"
                }
              >
                {m.text}
              </div>
            ))}
          </div>

          {isNew && (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  data-chatbot-oneri=""
                  onClick={() => send(s)}
                  className="rounded-full border-2 border-pink-300 bg-white px-3 py-1 text-sm font-semibold text-pink-600 transition hover:bg-pink-100"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(text)
            }}
            className="flex gap-2 border-t-2 border-pink-200 p-3"
          >
            <input
              id="chatbot-yazi"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Bir soru yaz..."
              className="flex-1 rounded-full border-2 border-pink-300 bg-white px-4 py-2 outline-none focus:border-pink-500"
            />
            <button
              id="chatbot-gonder"
              type="submit"
              className="flex items-center gap-1 rounded-full bg-pink-500 px-4 py-2 font-bold text-white transition hover:bg-pink-600"
            >
              <Send className="size-4" />
              Gönder
            </button>
          </form>
        </div>
      )}

      <button
        id="chatbot-dugme"
        onClick={() => setOpen((o) => !o)}
        aria-label="Sohbeti aç"
        className="fixed right-6 bottom-6 z-50 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-amber-400 text-white shadow-[0_0_25px_#ec489980] transition hover:scale-110"
      >
        <MessageCircle className="size-8" />
      </button>
    </div>
  )
}
