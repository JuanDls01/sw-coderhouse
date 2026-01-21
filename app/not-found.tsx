'use client';

import Image from 'next/image';
import Link from 'next/link';
import { StarField } from '@/components/ui/star-field';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

export default function NotFound() {
  return (
    <div className='relative flex flex-col items-center justify-center overflow-hidden bg-black'>
      <StarField starCount={300} />

      <div className='relative z-10 flex flex-col items-center px-4 text-center'>
        <div className='relative mb-8 flex items-center justify-center'>
          <span className='text-[12rem] font-bold tracking-tight text-white/90 select-none md:text-[16rem] lg:text-[20rem]'>
            4
          </span>
          <div className='relative -mx-8 md:-mx-12'>
            <Image
              src='/darth-vader-404.png'
              alt='Darth Vader 404'
              width={300}
              height={300}
              className='h-44 w-44 object-contain md:h-48 md:w-48 lg:h-72 lg:w-72'
              priority
            />
          </div>
          <span className='text-[12rem] font-bold tracking-tight text-white/90 select-none md:text-[16rem] lg:text-[20rem]'>
            4
          </span>
        </div>

        <Typography variant={'h1'} className='mb-6'>
          Esta no es la página que estas buscando
        </Typography>

        <p className='mb-8 max-w-md text-sm text-gray-400 italic md:text-base'>
          Te sugiero que uses la fuerza o la barra de navegación para que encuentres la página que buscas en
          una galaxia muy muy lejana
        </p>

        <Button asChild variant='outline' className='border-white/30 text-white hover:bg-white/10'>
          <Link href='/'>Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
