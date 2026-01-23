'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/tailwind';
import { validateImageFile } from '@/utils/image';

interface ImageUploadProps {
  onImageSelect: (base64: string) => void;
  selectedImage: string | null;
  onClear: () => void;
}

export function ImageUpload({ onImageSelect, selectedImage, onClear }: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError(null);

    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      onImageSelect(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  if (selectedImage) {
    return (
      <div className='relative aspect-square w-full overflow-hidden rounded-lg border border-border'>
        <Image src={selectedImage} alt='Selected image' fill className='object-cover' />
        <Button variant='destructive' size='icon-sm' className='absolute right-2 top-2' onClick={onClear}>
          <Icons.X className='size-4' />
        </Button>
      </div>
    );
  }

  return (
    <div className='space-y-2'>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        className={cn(
          'flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed transition-colors',
          error
            ? 'border-destructive bg-destructive/5'
            : isDragOver
              ? 'border-primary bg-primary/10'
              : 'border-border hover:border-primary/50 hover:bg-muted/50',
        )}
      >
        <input ref={inputRef} type='file' accept='image/*' onChange={handleInputChange} className='hidden' />
        <Icons.Upload className={cn('size-12', error ? 'text-destructive' : 'text-muted-foreground')} />
        <div className='text-center'>
          <p className='text-sm font-medium'>Arrastra una imagen aquí</p>
          <p className='text-muted-foreground text-xs'>o haz clic para seleccionar</p>
        </div>
      </div>
      {error && <p className='text-destructive text-sm'>{error}</p>}
    </div>
  );
}
