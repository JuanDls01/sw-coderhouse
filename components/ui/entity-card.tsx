import type { ReactNode, ComponentProps } from "react";
import type { Icon } from "@/components/ui/icons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/tailwind";

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
  variant?: "default" | "outline" | "secondary" | "destructive";
}

interface EntityCardHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  badges?: BadgeConfig[];
  className?: string;
}

function EntityCardHeader({
  title,
  subtitle,
  description,
  badges,
  className,
}: EntityCardHeaderProps) {
  return (
    <CardHeader className={cn(className)}>
      <div className="flex flex-row justify-between items-start gap-2">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground tracking-wide uppercase">
            {title}
          </h3>
        </div>
        {badges && badges.length > 0 && (
          <div className="flex flex-col items-end gap-1">
            {badges.map((badge) => (
              <Badge
                key={badge.label}
                variant={badge.variant ?? "default"}
                className="max-w-40 justify-start"
              >
                <span className="truncate">
                  {badge.label}:{" "}
                  {typeof badge.value === "number"
                    ? badge.value.toString().padStart(2, "0")
                    : badge.value}
                </span>
              </Badge>
            ))}
          </div>
        )}
      </div>
      {(subtitle || description) && (
        <div className="flex flex-col">
          {subtitle && (
            <p className="text-[10px] font-mono text-muted-foreground mt-1 uppercase">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-[9px] font-mono text-muted-foreground/60 mt-0.5">
              {description}
            </p>
          )}
        </div>
      )}
    </CardHeader>
  );
}

interface EntityCardContentProps extends ComponentProps<"div"> {
  children: ReactNode;
  showSeparator?: boolean;
}

function EntityCardContent({
  children,
  showSeparator = true,
  className,
  ...props
}: EntityCardContentProps) {
  return (
    <CardContent className={cn("flex flex-col gap-5", className)} {...props}>
      {showSeparator && <Separator className="bg-white/10" />}
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

function EntityCardStats({
  items,
  columns = 3,
  title,
  className,
}: EntityCardStatsProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  } as const;

  return (
    <div className={cn(className)}>
      {title && (
        <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-3">
          {title}
        </p>
      )}
      <div className={cn("grid gap-3", gridCols[columns])}>
        {items.map((item) => (
          <EntityCardStatItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}

function EntityCardStatItem({
  icon: Icon,
  label,
  value,
  unit,
}: StatItemConfig) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <Icon className="w-4 h-4 text-primary" />
        <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
          {label}
        </span>
      </div>
      <p className="text-xs font-mono text-foreground uppercase">
        {value}{" "}
        {unit && (
          <span className="text-[9px] text-muted-foreground normal-case">
            {unit}
          </span>
        )}
      </p>
    </div>
  );
}

EntityCard.Header = EntityCardHeader;
EntityCard.Content = EntityCardContent;
EntityCard.Stats = EntityCardStats;
EntityCard.StatItem = EntityCardStatItem;

export {
  EntityCard,
  EntityCardHeader,
  EntityCardContent,
  EntityCardStats,
  EntityCardStatItem,
};

export type {
  EntityCardProps,
  EntityCardHeaderProps,
  EntityCardContentProps,
  EntityCardStatsProps,
  StatItemConfig,
  BadgeConfig,
};
