import type { UIMessage } from "@ai-sdk/react";

type ChatMessageProps = {
  message: UIMessage;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] text-gray-100 ${
          isUser
            ? "bg-primary/20 border border-primary/40"
            : "bg-white/10 border border-white/15"
        } rounded-lg px-4 py-3`}
      >
        <div
          className={`text-[10px] font-mono tracking-widest mb-1 ${
            isUser ? "text-primary/60" : "text-purple-400/60"
          }`}
        >
          {isUser ? "TÚ" : "HOLOCRON"}
        </div>

        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.parts.map((part, i) => {
            if (part.type === "text") {
              return <span key={`${message.id}-${i}`}>{part.text}</span>;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
