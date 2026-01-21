'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState, useTransition } from 'react';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/tailwind';

interface SearchInputProps {
  placeholder?: string;
  className?: string;
}

export function SearchInput({ placeholder = 'Buscar...', className }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [value, setValue] = useState(searchParams.get('search') ?? '');

  const handleChange = (newValue: string) => {
    setValue(newValue);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (newValue) {
        params.set('search', newValue);
        params.delete('page');
      } else {
        params.delete('search');
      }

      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    }, 300);
  };

  return (
    <div className={cn('relative', className)}>
      <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
      <Input
        id='search'
        name='search'
        type='search'
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className={cn('pl-9', isPending && 'opacity-70')}
      />
    </div>
  );
}
