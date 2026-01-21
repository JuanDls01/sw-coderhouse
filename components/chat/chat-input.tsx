"use client";

import { useState } from "react";
import { Icons } from "@/components/ui/icons";

type ChatInputProps = {
  onSubmit: (message: string) => void;
  isLoading: boolean;
};

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSubmit(input);
    setInput("");
  };

  return (
    <div className="shrink-0 border-t border-primary/20 bg-black/60 backdrop-blur-sm">
      <div className="container max-w-3xl py-4">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            disabled={isLoading}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-12 py-3 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all disabled:opacity-50 font-mono"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-primary/80 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            <Icons.Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-[10px] text-gray-600 font-mono mt-2 text-center">
          Presiona Enter para enviar
        </p>
      </div>
    </div>
  );
}
