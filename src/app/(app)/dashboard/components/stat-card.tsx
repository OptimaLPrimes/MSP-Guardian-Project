import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import React from 'react';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: 'default' | 'destructive' | 'warning';
  className?: string;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  variant = 'default',
  className
}: StatCardProps) {
  const cardClasses = cn(
    'transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-black/50 cursor-pointer animate-fade-in-up group relative overflow-hidden',
    {
      'bg-card': variant === 'default',
      'bg-destructive/10 border-destructive/50 text-destructive-foreground': variant === 'destructive',
      'bg-orange-500/10 border-orange-500/50 text-orange-400': variant === 'warning',
    },
    className
  );

  const iconClasses = cn('h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:scale-110', {
    'text-destructive': variant === 'destructive',
    'text-orange-400': variant === 'warning',
  });

  const valueClasses = cn('text-3xl font-bold transition-colors', {
    'text-destructive': variant === 'destructive',
    'text-orange-400': variant === 'warning',
    'text-foreground': variant === 'default',
  });

  return (
    <Card className={cardClasses}>
        <div className={cn(
            'absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100',
             {
                'bg-destructive/10': variant === 'destructive',
                'bg-orange-500/10': variant === 'warning',
                'bg-primary/10': variant === 'default'
             }
        )}>
            <div className={cn(
                'absolute -top-4 -right-4 h-16 w-16 rounded-full transition-transform duration-500 group-hover:scale-[10]',
                {
                    'bg-destructive/20': variant === 'destructive',
                    'bg-orange-500/20': variant === 'warning',
                    'bg-primary/20': variant === 'default'
                }
            )}></div>
        </div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={iconClasses} />
      </CardHeader>
      <CardContent className="relative">
        <div className={valueClasses}>{value}</div>
         {variant === 'warning' && Number(value) > 10 && (
            <Badge variant="outline" className="mt-2 animate-fade-in bg-orange-500/10 border-orange-500/50 text-orange-400">High Count</Badge>
        )}
      </CardContent>
    </Card>
  );
}
