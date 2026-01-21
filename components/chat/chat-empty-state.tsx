import { Icons } from '@/components/ui/icons';

export function ChatEmptyState() {
  return (
    <div className='flex flex-col items-center justify-center py-20 text-center'>
      <div className='border-primary/30 mb-6 flex h-16 w-16 items-center justify-center rounded-full border'>
        <Icons.MessageCircle className='text-primary/60 h-8 w-8' strokeWidth={1.5} />
      </div>
      <p className='text-muted-foreground mb-2 font-mono text-sm'>Conexión establecida</p>
      <p className='text-muted-foreground/60 max-w-md text-xs'>
        Pregunta sobre personajes, planetas o naves de Star Wars
      </p>
    </div>
  );
}
