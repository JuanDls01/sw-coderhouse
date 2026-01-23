'use client';

import Image from 'next/image';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

interface TransformResultImage {
  base64: string;
  mediaType: string;
}

interface TransformResultProps {
  image: TransformResultImage | null;
  isLoading: boolean;
}

export function TransformResult({ image, isLoading }: TransformResultProps) {
  const handleDownload = () => {
    if (!image) return;

    const link = document.createElement('a');
    link.href = `data:${image.mediaType};base64,${image.base64}`;
    link.download = 'star-wars-transform.png';
    link.click();
  };

  if (isLoading) {
    return (
      <div className='flex aspect-square w-full flex-col items-center justify-center gap-4 rounded-lg border border-border bg-muted/30'>
        <Icons.Loader className='text-primary size-12 animate-spin' />
        <div className='text-center'>
          <p className='text-sm font-medium'>Transformando imagen...</p>
          <p className='text-muted-foreground text-xs'>Esto puede tomar unos segundos</p>
        </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className='flex aspect-square w-full flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border'>
        <Icons.Image className='text-muted-foreground/50 size-12' />
        <p className='text-muted-foreground text-sm'>El resultado aparecerá aquí</p>
      </div>
    );
  }

  return (
    <div className='relative aspect-square w-full overflow-hidden rounded-lg border border-border'>
      <Image
        src={`data:${image.mediaType};base64,${image.base64}`}
        alt='Transformed image'
        fill
        className='object-cover'
      />
      <Button variant='secondary' size='icon-sm' className='absolute right-2 top-2' onClick={handleDownload}>
        <Icons.Download className='size-4' />
      </Button>
    </div>
  );
}
