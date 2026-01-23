'use client';

import { useState } from 'react';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { ImageUpload, StyleSelector, TransformResult } from '@/components/transform';
import { TRANSFORM_CONFIG } from '@/utils/consts';
import type { SwImageStyle } from '@/lib/ai/PROMPTS';

interface TransformResultImage {
  base64: string;
  mediaType: string;
}

export default function TransformPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<SwImageStyle>('jedi');
  const [result, setResult] = useState<TransformResultImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);

  const handleTransform = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/sw-transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: selectedImage,
          style: selectedStyle,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al transformar la imagen');
      }

      setResult(data.image);
      setRemainingAttempts(data.remainingAttempts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <main className='container max-w-4xl py-8'>
      <div className='mb-8 text-center'>
        <Typography variant='h1' className='text-primary mb-2'>
          Holocreador
        </Typography>
        <p className='text-muted-foreground'>Sube una foto y transfórmala al estilo del universo Star Wars</p>
      </div>

      <div className='grid gap-8 md:grid-cols-2'>
        {/* Left column - Input */}
        <div className='space-y-6'>
          <div>
            <h2 className='mb-3 text-sm font-medium uppercase tracking-wider'>1. Selecciona una imagen</h2>
            <ImageUpload
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
              onClear={handleClear}
            />
          </div>

          <div>
            <h2 className='mb-3 text-sm font-medium uppercase tracking-wider'>2. Elige un estilo</h2>
            <StyleSelector selectedStyle={selectedStyle} onStyleChange={setSelectedStyle} />
          </div>

          <div className='space-y-2'>
            <Button
              onClick={handleTransform}
              disabled={!selectedImage || isLoading || remainingAttempts === 0}
              className='w-full'
              size='lg'
            >
              {isLoading ? (
                <>
                  <Icons.Loader className='size-4 animate-spin' />
                  Transformando...
                </>
              ) : (
                <>
                  <Icons.Sparkles className='size-4' />
                  Transformar
                </>
              )}
            </Button>
            {remainingAttempts !== null && (
              <p className='text-muted-foreground text-center text-xs'>
                {remainingAttempts > 0
                  ? `${remainingAttempts} de ${TRANSFORM_CONFIG.MAX_ATTEMPTS} transformaciones restantes`
                  : 'Has alcanzado el límite de transformaciones'}
              </p>
            )}
          </div>

          {error && (
            <div className='rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive'>
              {error}
            </div>
          )}
        </div>

        {/* Right column - Result */}
        <div>
          <h2 className='mb-3 text-sm font-medium uppercase tracking-wider'>Resultado</h2>
          <TransformResult image={result} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}
