import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/tailwind';

const typographyVariants = cva('font-mono', {
  variants: {
    variant: {
      h1: 'text-4xl font-extrabold uppercase tracking-wide ',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'text-xl font-bold text-white tracking-wide group-hover:transition-colors uppercase',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

function Typography({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'p'> & VariantProps<typeof typographyVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : (variant ?? 'p');

  return (
    <Comp data-slot='typography' className={cn(typographyVariants({ variant }), className)} {...props} />
  );
}

export { Typography, typographyVariants };
