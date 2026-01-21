const FALLBACK_ERROR_MESSAGE =
  "Holocron no está disponible en este momento. Por favor, intentá de nuevo más tarde.";

export function ChatErrorMessage() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] bg-red-950/30 border border-red-500/40 rounded-lg px-4 py-3">
        <div className="text-[10px] font-mono tracking-widest mb-1 text-red-400/60">
          HOLOCRON
        </div>
        <div className="text-sm leading-relaxed text-red-200">
          {FALLBACK_ERROR_MESSAGE}
        </div>
      </div>
    </div>
  );
}
