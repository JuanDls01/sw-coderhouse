export function ChatLoadingIndicator() {
  return (
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
  );
}
