"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === "submitted") return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="h-[calc(100vh-90px)] flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <div className="shrink-0 border-b border-primary/20 bg-black/40 backdrop-blur-sm">
        <div className="container py-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-sm text-primary/80 tracking-wider">
              HOLOCRON_TERMINAL
            </span>
            <span className="text-primary/40 font-mono text-xs">v1.0.0</span>
          </div>
        </div>
      </div>

      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto py-6 min-h-0">
        <div className="container max-w-3xl space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 mb-6 rounded-full border border-primary/30 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <p className="text-muted-foreground font-mono text-sm mb-2">
                Conexión establecida
              </p>
              <p className="text-muted-foreground/60 text-xs max-w-md">
                Pregunta sobre personajes, planetas o naves de Star Wars
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] text-gray-100 ${
                  message.role === "user"
                    ? "bg-primary/20 border border-primary/40"
                    : "bg-white/10 border border-white/15"
                } rounded-lg px-4 py-3`}
              >
                {/* Role indicator */}
                <div
                  className={`text-[10px] font-mono tracking-widest mb-1 ${
                    message.role === "user"
                      ? "text-primary/60"
                      : "text-purple-400/60"
                  }`}
                >
                  {message.role === "user" ? "TÚ" : "HOLOCRON"}
                </div>

                {/* Message content */}
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.parts.map((part, i) => {
                    if (part.type === "text") {
                      return (
                        <span key={`${message.id}-${i}`}>{part.text}</span>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {status === "submitted" && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                <div className="text-[10px] font-mono tracking-widest mb-1 text-purple-400/60">
                  HOLOCRON
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-purple-400/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-purple-400/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-purple-400/60 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Fixed */}
      <div className="shrink-0 border-t border-primary/20 bg-black/60 backdrop-blur-sm">
        <div className="container max-w-3xl py-4">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              disabled={status === "submitted"}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-12 py-3 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all disabled:opacity-50 font-mono"
            />
            <button
              type="submit"
              disabled={status === "submitted" || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-primary/80 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
          <p className="text-[10px] text-gray-600 font-mono mt-2 text-center">
            Presiona Enter para enviar
          </p>
        </div>
      </div>
    </div>
  );
}
