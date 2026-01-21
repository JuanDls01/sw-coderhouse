import { Icons } from "@/components/ui/icons";

export function ChatEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 mb-6 rounded-full border border-primary/30 flex items-center justify-center">
        <Icons.MessageCircle
          className="w-8 h-8 text-primary/60"
          strokeWidth={1.5}
        />
      </div>
      <p className="text-muted-foreground font-mono text-sm mb-2">
        Conexión establecida
      </p>
      <p className="text-muted-foreground/60 text-xs max-w-md">
        Pregunta sobre personajes, planetas o naves de Star Wars
      </p>
    </div>
  );
}
