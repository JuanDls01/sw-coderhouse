export function ChatLoadingIndicator() {
  return (
    <div className='flex justify-start'>
      <div className='rounded-lg border border-white/10 bg-white/5 px-4 py-3'>
        <div className='mb-1 font-mono text-[10px] tracking-widest text-purple-400/60'>HOLOCRON</div>
        <div className='flex items-center gap-1'>
          <span className='h-2 w-2 animate-bounce rounded-full bg-purple-400/60 [animation-delay:-0.3s]' />
          <span className='h-2 w-2 animate-bounce rounded-full bg-purple-400/60 [animation-delay:-0.15s]' />
          <span className='h-2 w-2 animate-bounce rounded-full bg-purple-400/60' />
        </div>
      </div>
    </div>
  );
}
