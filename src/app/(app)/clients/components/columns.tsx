'use client';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Client } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const statusConfig: { [key: string]: string } = {
  critical: 'bg-red-500',
  'at-risk': 'bg-orange-500',
  healthy: 'bg-green-500',
};

const getRiskColor = (risk: number) => {
    if (risk > 70) return 'bg-red-500';
    if (risk > 50) return 'bg-orange-500';
    return 'bg-green-500';
};

export const getColumns = (): ColumnDef<Client>[] => [
    {
        accessorKey: 'name',
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
            Client Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        );
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status: Client['status'] = row.getValue('status');
            return (
                <div className="flex items-center gap-2">
                <div className={cn('h-2 w-2 rounded-full', statusConfig[status])} />
                <span className="capitalize">{status}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'risk',
        header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                Risk Score
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const risk: number = row.getValue('risk');
            return (
                <div className="flex items-center gap-2">
                <span className="w-8">{risk}</span>
                <Progress value={risk} className="w-[100px] h-2" indicatorClassName={getRiskColor(risk)}/>
                </div>
            );
        },
    },
    {
        accessorKey: 'threats',
        header: 'Active Threats',
        cell: ({ row }) => {
            const threats: number = row.getValue('threats');
            return <div className="text-center">{threats > 0 ? <Badge variant="destructive">{threats}</Badge> : 0}</div>;
        },
    },
    {
        accessorKey: 'compliance',
        header: 'Compliance %',
        cell: ({ row }) => {
            const compliance: number = row.getValue('compliance');
            const color = compliance > 95 ? 'bg-green-500' : compliance > 90 ? 'bg-yellow-500' : 'bg-orange-500';
            return (
                <div className="flex items-center gap-2">
                    <span className="w-8">{compliance}%</span>
                    <Progress value={compliance} className="w-[100px] h-2" indicatorClassName={color}/>
                </div>
            );
        }
    },
    {
        accessorKey: 'assets',
        header: 'Asset Count'
    },
    {
        id: 'actions',
        cell: ({ row }) => {
        return (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>View Details →</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        );
        },
    },
];
