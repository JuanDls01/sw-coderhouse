'use client';

import { cn } from '@/lib/tailwind';
import type { SwImageStyle } from '@/lib/ai/PROMPTS';

const STYLES = {
  jedi: {
    label: 'Jedi',
    description: 'Caballero Jedi con túnicas y sable de luz',
    color: 'from-blue-500 to-cyan-400',
  },
  clone: {
    label: 'Clone Trooper',
    description: 'Soldado clon con armadura blanca',
    color: 'from-slate-300 to-white',
  },
  sith: {
    label: 'Sith',
    description: 'Señor Sith con túnicas oscuras',
    color: 'from-red-600 to-red-400',
  },
  mandalorian: {
    label: 'Mandalorian',
    description: 'Guerrero mandaloriano con armadura',
    color: 'from-zinc-500 to-zinc-400',
  },
} as const;

interface StyleSelectorProps {
  selectedStyle: SwImageStyle;
  onStyleChange: (style: SwImageStyle) => void;
}

export function StyleSelector({ selectedStyle, onStyleChange }: StyleSelectorProps) {
  return (
    <div className='grid grid-cols-2 gap-3'>
      {(Object.keys(STYLES) as SwImageStyle[]).map((style) => {
        const { label, description, color } = STYLES[style];
        const isSelected = selectedStyle === style;

        return (
          <button
            key={style}
            onClick={() => onStyleChange(style)}
            className={cn(
              'group relative flex flex-col items-start gap-1 rounded-lg border p-4 text-left transition-all',
              isSelected
                ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                : 'border-border hover:border-primary/50 hover:bg-muted/50',
            )}
          >
            <div className={cn('h-1 w-8 rounded-full bg-gradient-to-r', color)} aria-hidden='true' />
            <span className='font-medium'>{label}</span>
            <span className='text-muted-foreground text-xs'>{description}</span>
          </button>
        );
      })}
    </div>
  );
}
