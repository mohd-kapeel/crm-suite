import { useEffect, useState } from "react";
import { MessageCircle, X, Zap } from "lucide-react";

export function playUISound(type: "ask" | "response" | "robot") {
  try {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    const sounds = { ask: { from: 620, to: 760, duration: 0.11 }, response: { from: 520, to: 820, duration: 0.18 }, robot: { from: 420, to: 900, duration: 0.22 } };
    const sound = sounds[type];
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(sound.from, now);
    oscillator.frequency.exponentialRampToValueAtTime(sound.to, now + sound.duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + sound.duration);
    oscillator.connect(gain); gain.connect(context.destination);
    oscillator.start(now); oscillator.stop(now + sound.duration + 0.03);
    window.setTimeout(() => context.close().catch(() => {}), 500);
  } catch {}
}

export function Chatbot({
  onDemo,
}: {
  onDemo: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] =
    useState<
      {
        from: "user" | "bot";
        text: string;
      }[]
    >([]);

  const reply = (text: string) => {
    const value = text.toLowerCase();

    if (
      value.includes("pricing") ||
      value.includes("price") ||
      value.includes("cost")
    ) {
      return "CRM Suite has Basic, Professional and Enterprise plans. Professional adds full pipeline management, team collaboration, bulk upload and advanced analytics; Enterprise adds ATS synchronization, custom workflows and dedicated support.";
    }

    if (
      value.includes("demo") ||
      value.includes("book")
    ) {
      return "Absolutely. Use the “Request a demo” button and we can help you explore the CRM Suite workflow.";
    }

    if (
      value.includes("feature") ||
      value.includes("capability")
    ) {
      return "CRM Suite covers lead and contact management, sales pipeline tracking, follow-ups, team collaboration, quotations, invoice/payment tracking, reports, roles, secure cloud access and multi-user support.";
    }

    if (
      value.includes("ats") ||
      value.includes("recruit")
    ) {
      return "The Enterprise plan includes ATS synchronization, and the live interface also shows an ATS Candidate Pool for recruitment integration.";
    }

    return "CRM Suite is a cloud-based CRM for leads, customers, sales activity, follow-ups, quotations, invoices and business reporting. Ask me about features, pricing or a demo.";
  };

  const send = (value = input) => {
    const text = value.trim();
    if (!text) return;
    playUISound("ask");
    setMessages((current) => [...current, { from: "user", text }]);
    setInput("");
    window.setTimeout(() => {
      const response = reply(text);
      setMessages((current) => [...current, { from: "bot", text: response }]);
      playUISound("response");
    }, 450);
  };

  return (
    <div className="chat-wrap">
      <button
        type="button"
        className="chat-fab"
        onClick={() => setOpen(true)}
        aria-label="Open CRM Suite assistant"
      >
        <MessageCircle size={19} />
        <span>Ask CRM</span>
      </button>

      {open && (
        <div className="chat-panel">
          <div className="chat-head">
            <div>
              <strong>
                CRM Suite Assistant
              </strong>

              <small>
                Quick answers about the platform
              </small>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
            >
              <X size={17} />
            </button>
          </div>

          <div className="chat-body">
            <div className="chat-quick">
              {[
                "Features",
                "Pricing",
                "ATS integration",
                "Book a demo",
              ].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() =>
                    item === "Book a demo"
                      ? onDemo()
                      : send(item)
                  }
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="chat-messages">
              {messages.length === 0 && (
                <div className="chat-empty">
                  Ask about CRM Suite features,
                  pricing or workflow.
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={`${message.from}-${index}`}
                  className={`chat-message ${message.from}`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div className="chat-input">
              <input
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    send();
                  }
                }}
                placeholder="Ask a question..."
              />

              <button
                type="button"
                onClick={() => send()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   HOME PAGE
   ========================================================= */


