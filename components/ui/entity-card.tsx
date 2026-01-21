import type { ReactNode, ComponentProps } from 'react';
import type { Icon } from '@/components/ui/icons';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/tailwind';

interface EntityCardProps extends ComponentProps<typeof Card> {
  children: ReactNode;
}

function EntityCard({ children, className, ...props }: EntityCardProps) {
  return (
    <Card className={cn(className)} {...props}>
      {children}
    </Card>
  );
}

interface BadgeConfig {
  label: string;
  value: string | number;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive';
}

interface EntityCardHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  badges?: BadgeConfig[];
  className?: string;
}

function EntityCardHeader({ title, subtitle, description, badges, className }: EntityCardHeaderProps) {
  return (
    <CardHeader className={cn(className)}>
      <div className='flex flex-row items-start justify-between gap-2'>
        <div className='flex-1'>
          <h3 className='text-foreground text-xl font-bold tracking-wide uppercase'>{title}</h3>
        </div>
        {badges && badges.length > 0 && (
          <div className='flex flex-col items-end gap-1'>
            {badges.map((badge) => (
              <Badge
                key={badge.label}
                variant={badge.variant ?? 'default'}
                className='max-w-40 justify-start'
              >
                <span className='truncate'>
                  {badge.label}:{' '}
                  {typeof badge.value === 'number' ? badge.value.toString().padStart(2, '0') : badge.value}
                </span>
              </Badge>
            ))}
          </div>
        )}
      </div>
      {(subtitle || description) && (
        <div className='flex flex-col'>
          {subtitle && (
            <p className='text-muted-foreground mt-1 font-mono text-[10px] uppercase'>{subtitle}</p>
          )}
          {description && (
            <p className='text-muted-foreground/60 mt-0.5 font-mono text-[9px]'>{description}</p>
          )}
        </div>
      )}
    </CardHeader>
  );
}

interface EntityCardContentProps extends ComponentProps<'div'> {
  children: ReactNode;
  showSeparator?: boolean;
}

function EntityCardContent({ children, showSeparator = true, className, ...props }: EntityCardContentProps) {
  return (
    <CardContent className={cn('flex flex-col gap-5', className)} {...props}>
      {showSeparator && <Separator className='bg-white/10' />}
      {children}
    </CardContent>
  );
}

interface StatItemConfig {
  icon: Icon;
  label: string;
  value: string | number;
  unit?: string;
}

interface EntityCardStatsProps {
  items: StatItemConfig[];
  columns?: 2 | 3 | 4;
  title?: string;
  className?: string;
}

function EntityCardStats({ items, columns = 3, title, className }: EntityCardStatsProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  } as const;

  return (
    <div className={cn(className)}>
      {title && (
        <p className='text-muted-foreground mb-3 text-[9px] font-bold tracking-[0.2em] uppercase'>{title}</p>
      )}
      <div className={cn('grid gap-3', gridCols[columns])}>
        {items.map((item) => (
          <EntityCardStatItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}

function EntityCardStatItem({ icon: Icon, label, value, unit }: StatItemConfig) {
  return (
    <div className='flex flex-col gap-1'>
      <div className='flex items-center gap-1.5'>
        <Icon className='text-primary h-4 w-4' />
        <span className='text-muted-foreground text-[9px] font-bold tracking-[0.2em] uppercase'>{label}</span>
      </div>
      <p className='text-foreground font-mono text-xs uppercase'>
        {value} {unit && <span className='text-muted-foreground text-[9px] normal-case'>{unit}</span>}
      </p>
    </div>
  );
}

EntityCard.Header = EntityCardHeader;
EntityCard.Content = EntityCardContent;
EntityCard.Stats = EntityCardStats;
EntityCard.StatItem = EntityCardStatItem;

export { EntityCard, EntityCardHeader, EntityCardContent, EntityCardStats, EntityCardStatItem };

export type {
  EntityCardProps,
  EntityCardHeaderProps,
  EntityCardContentProps,
  EntityCardStatsProps,
  StatItemConfig,
  BadgeConfig,
};
