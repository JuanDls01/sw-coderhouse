export function ChatHeader() {
  return (
    <div className='border-primary/20 shrink-0 border-b bg-black/40 backdrop-blur-sm'>
      <div className='container py-4'>
        <div className='flex items-center gap-3'>
          <div className='bg-primary h-2 w-2 animate-pulse rounded-full' />
          <span className='text-primary/80 font-mono text-sm tracking-wider'>HOLOCRON_TERMINAL</span>
          <span className='text-primary/40 font-mono text-xs'>v1.0.0</span>
        </div>
      </div>
    </div>
  );
}
