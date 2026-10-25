import { useEffect, useRef, useState } from "react";
import MessageContent from "./MessageContent";

const SUGGESTIONS = [
  "What’s the hardest bug you’ve ever tracked down?",
  "What’s a technical decision you’d make differently today?",
  "What are you learning right now, and why?",
];

const WELCOME =
  "I'm Chetan's personal agent — grounded in his work, projects, and how he thinks. Ask about tradeoffs, bugs he's chased, what he's learning, or what he's shipped.";

const font =
  "font-['Instrument_Sans',ui-sans-serif,system-ui,sans-serif]";

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

function AgentOrb({ busy, size = "md" }) {
  const dim = size === "lg" ? "h-11 w-11" : "h-9 w-9";
  return (
    <div className={`relative ${dim} shrink-0`}>
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600 ${
          busy ? "animate-pulse" : ""
        }`}
      />
      <div className="absolute inset-[2px] flex items-center justify-center rounded-full bg-zinc-950 text-[11px] font-semibold tracking-wide text-white">
        CN
      </div>
    </div>
  );
}

function ThinkingTrace() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300/90">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
        </span>
        Reasoning
      </div>
      <div className="space-y-2.5">
        {[
          "Scanning grounded profile",
          "Ranking relevant experience",
          "Composing answer",
        ].map((step, i) => (
          <div
            key={step}
            className="flex items-center gap-3 text-sm text-zinc-400"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                i < 2 ? "bg-cyan-400" : "animate-pulse bg-zinc-500"
              }`}
            />
            <span className={i === 2 ? "text-zinc-300" : ""}>{step}</span>
            {i < 2 && (
              <span className="ml-auto text-[10px] font-medium uppercase tracking-wider text-cyan-400/70">
                done
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/5">
        <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500" />
      </div>
    </div>
  );
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [fullPage, setFullPage] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: WELCOME },
  ]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  }, [open, messages, loading, fullPage]);

  useEffect(() => {
    if (!open || !fullPage) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, fullPage]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (fullPage) setFullPage(false);
        else setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, fullPage]);

  useEffect(() => {
    const openAgent = () => setOpen(true);
    window.addEventListener("open-chetan-agent", openAgent);
    return () => window.removeEventListener("open-chetan-agent", openAgent);
  }, []);

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

  const closeAll = () => {
    setOpen(false);
    setFullPage(false);
  };

  const shell = fullPage
    ? `fixed inset-0 z-[60] flex h-dvh w-screen flex-col ${font}`
    : `flex h-[min(620px,78vh)] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[28px] border border-white/10 ${font}`;

  return (
    <div
      className={`z-50 flex flex-col items-end gap-3 ${
        fullPage && open
          ? "fixed inset-0"
          : "fixed bottom-5 right-5 min-[801px]:bottom-8 min-[801px]:right-[100px]"
      }`}
    >
      {open && (
        <div
          className={`${shell} relative bg-zinc-950 text-zinc-100 shadow-[0_25px_80px_rgba(0,0,0,0.55)]`}
        >
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -right-16 top-1/3 h-56 w-56 rounded-full bg-indigo-600/20 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-40 w-72 rounded-full bg-sky-500/10 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
          </div>

          <header className="relative z-10 flex items-center justify-between gap-3 border-b border-white/10 bg-zinc-950/60 px-4 py-3.5 backdrop-blur-xl">
            <div className="flex min-w-0 items-center gap-3">
              <AgentOrb busy={loading} />
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold tracking-tight text-white">
                  Chetan Agent
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  {loading ? "Thinking with profile context" : "Online · grounded"}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                aria-label={fullPage ? "Exit full page" : "Open full page"}
                title={fullPage ? "Exit full page" : "Full page"}
                onClick={() => setFullPage((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-white/5 hover:text-white"
              >
                {fullPage ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M9 3H5a2 2 0 0 0-2 2v4M15 3h4a2 2 0 0 1 2 2v4M9 21H5a2 2 0 0 1-2-2v-4M15 21h4a2 2 0 0 0 2-2v-4" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                aria-label="Close chat"
                onClick={closeAll}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-xl leading-none text-zinc-400 transition hover:bg-white/5 hover:text-white"
              >
                ×
              </button>
            </div>
          </header>

          <div
            className={`relative z-10 flex-1 space-y-5 overflow-y-auto px-4 py-5 ${
              fullPage ? "mx-auto w-full max-w-3xl px-6 py-8 sm:px-10" : ""
            }`}
          >
            {messages.length <= 1 && !loading && (
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
                  Suggested prompts
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => ask(s)}
                      className="group rounded-xl border border-white/10 bg-zinc-900/60 px-3.5 py-2.5 text-left text-[13px] font-medium text-zinc-300 transition hover:border-cyan-400/30 hover:bg-zinc-900 hover:text-white"
                    >
                      <span className="mr-2 text-cyan-400/70 transition group-hover:text-cyan-300">
                        →
                      </span>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={`flex gap-3 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role === "assistant" && (
                  <div className="mt-1 hidden sm:block">
                    <AgentOrb busy={false} />
                  </div>
                )}
                <div
                  className={`max-w-[min(100%,38rem)] px-4 py-3 ${
                    m.role === "user"
                      ? "rounded-2xl rounded-br-md bg-gradient-to-br from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-950/30"
                      : "rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] text-zinc-200 backdrop-blur"
                  }`}
                >
                  {m.role === "assistant" && (
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300/70">
                      Agent
                    </p>
                  )}
                  <MessageContent text={m.content} tone={m.role} />
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="mt-1 hidden sm:block">
                  <AgentOrb busy />
                </div>
                <ThinkingTrace />
              </div>
            )}

            {error && (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={onSubmit}
            className={`relative z-10 border-t border-white/10 bg-zinc-950/70 p-3 backdrop-blur-xl ${
              fullPage ? "px-6 pb-6 sm:px-10" : ""
            }`}
          >
            <div
              className={`flex items-end gap-2 rounded-2xl border border-white/10 bg-zinc-900/80 p-2 shadow-inner shadow-black/20 focus-within:border-cyan-400/40 focus-within:ring-1 focus-within:ring-cyan-400/20 ${
                fullPage ? "mx-auto max-w-3xl" : ""
              }`}
            >
              <textarea
                ref={inputRef}
                value={input}
                rows={fullPage ? 2 : 1}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    ask(input);
                  }
                }}
                placeholder="Ask the agent anything about Chetan…"
                maxLength={500}
                disabled={loading}
                className="max-h-36 min-h-[44px] min-w-0 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-zinc-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110 disabled:opacity-35"
                aria-label="Send"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
            {fullPage && (
              <p className="mt-3 text-center text-[11px] text-zinc-500">
                Enter to send · Shift+Enter newline · Esc to exit full page
              </p>
            )}
          </form>
        </div>
      )}

      {!(open && fullPage) && (
        <button
          type="button"
          aria-label={open ? "Close chat" : "Open Chetan Agent"}
          onClick={() => (open ? closeAll() : setOpen(true))}
          className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-zinc-950 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(34,211,238,0.35)] ring-1 ring-white/15 transition hover:scale-[1.03]"
        >
          <span className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 via-transparent to-indigo-500/40" />
          {open ? (
            <span className="relative text-lg">×</span>
          ) : (
            <span className="relative text-[11px] font-semibold tracking-wide">CN</span>
          )}
        </button>
      )}
    </div>
  );
}

export default ChatWidget;
