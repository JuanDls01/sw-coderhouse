export function ChatHeader() {
  return (
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
  );
}
