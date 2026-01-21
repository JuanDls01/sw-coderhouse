'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/icons';

type ChatInputProps = {
  onSubmit: (message: string) => void;
  isLoading: boolean;
};

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSubmit(input);
    setInput('');
  };

  return (
    <div className='border-primary/20 shrink-0 border-t bg-black/60 backdrop-blur-sm'>
      <div className='container max-w-3xl py-4'>
        <form onSubmit={handleSubmit} className='relative'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Escribe tu mensaje...'
            disabled={isLoading}
            className='focus:border-primary/50 focus:ring-primary/20 w-full rounded-lg border border-white/10 bg-white/5 py-3 pr-12 pl-4 font-mono text-sm text-gray-100 transition-all placeholder:text-gray-500 focus:ring-1 focus:outline-none disabled:opacity-50'
          />
          <button
            type='submit'
            disabled={isLoading || !input.trim()}
            className='text-primary hover:text-primary/80 absolute top-1/2 right-2 -translate-y-1/2 p-2 transition-colors disabled:cursor-not-allowed disabled:text-gray-600'
          >
            <Icons.Send className='h-5 w-5' />
          </button>
        </form>
        <p className='mt-2 text-center font-mono text-[10px] text-gray-600'>Presiona Enter para enviar</p>
      </div>
    </div>
  );
}
