import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';

export default function PlanetsLoading() {
  return (
    <main className='container'>
      <Typography variant='h1' className='my-6'>
        Mundos del Borde Exterior
      </Typography>
      <Skeleton className='mb-6 h-9 max-w-md' />
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton className='h-60' key={i} />
        ))}
      </div>
    </main>
  );
}
