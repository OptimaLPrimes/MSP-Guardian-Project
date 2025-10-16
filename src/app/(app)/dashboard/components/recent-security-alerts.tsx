'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Threat } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  ArrowUpDown,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  FileWarning,
  Ticket,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { triageAndCreateTicket } from '@/ai/flows/superops-integration';
import { useToast } from '@/hooks/use-toast';

const severityConfig: {
  [key: string]: {
    color: string;
    icon: React.ElementType;
    badgeClass: string;
  };
} = {
  critical: {
    color: 'text-red-400',
    icon: ShieldAlert,
    badgeClass: 'bg-red-500/10 border-red-500/50 text-red-400',
  },
  high: {
    color: 'text-orange-400',
    icon: FileWarning,
    badgeClass: 'bg-orange-500/10 border-orange-500/50 text-orange-400',
  },
  medium: {
    color: 'text-yellow-400',
    icon: FileWarning,
    badgeClass: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400',
  },
  low: {
    color: 'text-blue-400',
    icon: ShieldCheck,
    badgeClass: 'bg-blue-500/10 border-blue-500/50 text-blue-400',
  },
};

export function RecentSecurityAlerts({ data }: { data: Threat[] }) {
  const { toast } = useToast();
  const [sortDescriptor, setSortDescriptor] = React.useState<{
    column: keyof Threat;
    direction: 'asc' | 'desc';
  }>({ column: 'time', direction: 'desc' });
  const [isProcessing, setIsProcessing] = React.useState<number | null>(null);

  const handleCreateTicket = async (alert: Threat) => {
    setIsProcessing(alert.id);
    try {
      const result = await triageAndCreateTicket({ alert });
      toast({
        title: 'SuperOps Ticket Created!',
        description: `Ticket ${result.ticketId} created for "${result.summary}". Category: ${result.category}, Priority: ${result.priority}.`,
      });
    } catch (error) {
      console.error('Failed to create ticket:', error);
      toast({
        variant: 'destructive',
        title: 'Error Creating Ticket',
        description: 'Could not create a SuperOps ticket for this alert.',
      });
    } finally {
      setIsProcessing(null);
    }
  };

  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      const aValue = a[sortDescriptor.column];
      const bValue = b[sortDescriptor.column];

      let cmp = 0;
      if (aValue > bValue) cmp = 1;
      if (aValue < bValue) cmp = -1;

      // Special handling for time since it's a string like "2 min ago"
      if (sortDescriptor.column === 'time') {
        const now = new Date();
        const parseTime = (timeStr: string) => {
          const [value, unit] = timeStr.split(' ');
          const numValue = parseInt(value);
          if (unit.startsWith('min')) {
            return new Date(now.getTime() - numValue * 60 * 1000);
          }
          if (unit.startsWith('hour')) {
            return new Date(now.getTime() - numValue * 60 * 60 * 1000);
          }
          return now;
        };
        cmp = parseTime(a.time).getTime() - parseTime(b.time).getTime();
      }

      return sortDescriptor.direction === 'asc' ? cmp : -cmp;
    });
  }, [data, sortDescriptor]);

  const handleSort = (column: keyof Threat) => {
    if (sortDescriptor.column === column) {
      setSortDescriptor({
        ...sortDescriptor,
        direction: sortDescriptor.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortDescriptor({ column, direction: 'desc' });
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card/50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">
              <Button variant="ghost" onClick={() => handleSort('severity')}>
                Severity{' '}
                <ArrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('client')}>
                Client Name{' '}
                <ArrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('type')}>
                Threat Type{' '}
                <ArrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" onClick={() => handleSort('time')}>
                Time{' '}
                <ArrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((alert) => {
            const config = severityConfig[alert.severity];
            return (
              <TableRow
                key={alert.id}
                className="group cursor-pointer hover:bg-muted/50"
              >
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      'capitalize font-semibold flex items-center gap-2',
                      config.badgeClass
                    )}
                  >
                    <config.icon className="h-4 w-4" />
                    {alert.severity}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{alert.client}</TableCell>
                <TableCell>{alert.type}</TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {alert.time}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCreateTicket(alert)}
                      disabled={isProcessing === alert.id}
                    >
                      <Ticket className="mr-2 h-4 w-4" />
                      {isProcessing === alert.id
                        ? 'Processing...'
                        : 'AI Triage & Ticket'}
                    </Button>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
