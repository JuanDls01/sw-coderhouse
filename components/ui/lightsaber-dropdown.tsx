'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/tailwind';
import { type SaberColor } from '@/utils/consts';

interface LightsaberDropdownProps {
  value: SaberColor;
  onValueChange: (value: SaberColor) => void;
  options: SaberColor[];
  className?: string;
}

const COLOR_CLASSES = {
  cyan: {
    blade: 'bg-cyan-400',
    glow: 'shadow-[0_0_12px_4px_rgba(34,211,238,0.6),0_0_24px_8px_rgba(34,211,238,0.3)]',
  },
  red: {
    blade: 'bg-red-500',
    glow: 'shadow-[0_0_12px_4px_rgba(248,113,113,0.6),0_0_24px_8px_rgba(248,113,113,0.3)]',
  },
  green: {
    blade: 'bg-green-400',
    glow: 'shadow-[0_0_12px_4px_rgba(74,222,128,0.6),0_0_24px_8px_rgba(74,222,128,0.3)]',
  },
  yellow: {
    blade: 'bg-yellow-300',
    glow: 'shadow-[0_0_12px_4px_rgba(253,224,71,0.6),0_0_24px_8px_rgba(253,224,71,0.3)]',
  },
  purple: {
    blade: 'bg-purple-400',
    glow: 'shadow-[0_0_12px_4px_rgba(167,139,250,0.6),0_0_24px_8px_rgba(167,139,250,0.3)]',
  },
} as const;

function HorizontalSaber({
  color,
  size = 'md',
  isActive = true,
}: {
  color: SaberColor;
  size?: 'sm' | 'md';
  isActive?: boolean;
}) {
  const classes = COLOR_CLASSES[color];
  const bladeWidth = size === 'sm' ? 'w-16' : 'w-24';
  const bladeHeight = size === 'sm' ? 'h-1.5' : 'h-2';
  const hiltWidth = size === 'sm' ? 'w-6' : 'w-8';
  const hiltHeight = size === 'sm' ? 'h-3' : 'h-4';

  return (
    <div className={cn('flex items-center', !isActive && 'opacity-40')}>
      {/* Blade */}
      <div
        className={cn(
          bladeWidth,
          bladeHeight,
          'rounded-l-full border-t border-white/40',
          classes.blade,
          isActive && classes.glow,
        )}
      />
      {/* Hilt */}
      <div
        className={cn(
          hiltWidth,
          hiltHeight,
          'relative rounded-r-sm border-y border-r border-gray-300 bg-linear-to-b from-gray-400 to-gray-600',
        )}
      >
        <div className='absolute top-1/2 right-1 h-1 w-1 -translate-y-1/2 rounded-full bg-red-500' />
      </div>
    </div>
  );
}

function LightsaberDropdown({ value, onValueChange, options, className }: LightsaberDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (color: SaberColor) => {
    onValueChange(color);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      {/* Trigger */}
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 rounded-md px-3 py-2',
          'border-border/50 bg-background/50 border',
          'hover:bg-accent/50 transition-colors',
          'focus:ring-ring/50 focus:ring-2 focus:outline-none',
        )}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
      >
        <HorizontalSaber color={value} size='sm' />
        <svg
          className={cn('text-muted-foreground h-4 w-4 transition-transform', isOpen && 'rotate-180')}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={cn(
            'absolute top-full right-0 z-50 mt-2',
            'bg-card border-border rounded-lg border p-2',
            'shadow-lg shadow-black/20',
            'animate-in fade-in-0 zoom-in-95 duration-200',
          )}
          role='listbox'
        >
          <div className='flex flex-col gap-1'>
            {options.map((color) => (
              <button
                key={color}
                type='button'
                role='option'
                aria-selected={value === color}
                onClick={() => handleSelect(color)}
                className={cn(
                  'flex items-center justify-between gap-4 rounded-md px-3 py-2',
                  'hover:bg-accent/50 transition-colors',
                  'focus:bg-accent/50 focus:outline-none',
                  value === color && 'bg-accent/30',
                )}
              >
                <HorizontalSaber color={color} size='md' isActive={value === color} />
                {value === color && (
                  <svg className='text-primary h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { LightsaberDropdown, HorizontalSaber };
export type { LightsaberDropdownProps };
