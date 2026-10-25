import { useEffect, useRef, useState } from "react";

const SUGGESTIONS = [
  "How much total work experience does Chetan have?",
  "Has Chetan worked in fintech?",
  "What did Chetan build at Niyo?",
];

const WELCOME =
  "Hi — ask me anything about Chetan’s experience, skills, or projects.";

async function sendChat(messages) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Could not get a reply");
  }
  return data.reply;
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: WELCOME },
  ]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages, loading]);

  const ask = async (text) => {
    const content = text.trim();
    if (!content || loading) return;

    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const history = next.filter(
        (m, i) => !(i === 0 && m.role === "assistant")
      );
      const reply = await sendChat(history);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => prev.slice(0, -1));
      setInput(content);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 min-[801px]:bottom-8 min-[801px]:right-[100px]">
      {open && (
        <div className="flex h-[min(520px,70vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-xl border border-black/10 bg-white shadow-[6px_6px_0_0_#fff,6px_6px_0_2px_#b04bff]">
          <header className="flex items-center justify-between border-b border-black/10 bg-primary px-4 py-3 text-white">
            <div>
              <p className="text-base font-bold leading-none">Ask Chetan</p>
              <p className="mt-1 text-xs font-medium text-white/80">
                Experience · skills · projects
              </p>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-xl leading-none text-white hover:bg-white/15"
            >
              ×
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm font-medium leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-white"
                      : "bg-accent/50 text-black"
                  }`}
                >
                  {m.content}
                </p>
              </div>
            ))}

            {loading && (
              <p className="text-sm font-medium text-muted">Thinking…</p>
            )}
            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            {messages.length <= 1 && !loading && (
              <div className="flex flex-col gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => ask(s)}
                    className="rounded-md border border-primary/30 bg-white px-3 py-2 text-left text-xs font-semibold text-primary transition hover:bg-accent/40"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={onSubmit}
            className="flex gap-2 border-t border-black/10 p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Chetan…"
              maxLength={500}
              disabled={loading}
              className="min-w-0 flex-1 rounded-md border border-black/15 px-3 py-2 text-sm font-medium outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-md border-2 border-primary bg-accent px-3 py-2 text-sm font-bold text-black disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-accent text-sm font-bold text-black shadow-[4px_4px_0_0_#b04bff] transition hover:translate-y-px hover:shadow-[2px_2px_0_0_#b04bff]"
      >
        {open ? "×" : "Chat"}
      </button>
    </div>
  );
}

export default ChatWidget;
