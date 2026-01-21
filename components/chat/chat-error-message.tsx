const FALLBACK_ERROR_MESSAGE =
  'Holocron no está disponible en este momento. Por favor, intentá de nuevo más tarde.';

export function ChatErrorMessage() {
  return (
    <div className='flex justify-start'>
      <div className='max-w-[85%] rounded-lg border border-red-500/40 bg-red-950/30 px-4 py-3'>
        <div className='mb-1 font-mono text-[10px] tracking-widest text-red-400/60'>HOLOCRON</div>
        <div className='text-sm leading-relaxed text-red-200'>{FALLBACK_ERROR_MESSAGE}</div>
      </div>
    </div>
  );
}
