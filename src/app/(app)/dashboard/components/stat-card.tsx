import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: 'default' | 'destructive' | 'warning';
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  variant = 'default',
}: StatCardProps) {
  const cardClasses = cn(
    'transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer',
    {
      'bg-card': variant === 'default',
      'bg-destructive/10 border-destructive text-destructive-foreground':
        variant === 'destructive',
      'bg-orange-500/10 border-orange-500 text-orange-400':
        variant === 'warning',
    }
  );

  const iconClasses = cn('h-5 w-5 text-muted-foreground', {
    'text-destructive': variant === 'destructive',
    'text-orange-400': variant === 'warning',
  });

  const valueClasses = cn('text-3xl font-bold', {
    'text-destructive': variant === 'destructive',
    'text-orange-400': variant === 'warning',
    'text-foreground': variant === 'default',
  });

  return (
    <Card className={cardClasses}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={iconClasses} />
      </CardHeader>
      <CardContent>
        <div className={valueClasses}>{value}</div>
      </CardContent>
    </Card>
  );
}
