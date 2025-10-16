'use client';
import { useState, useEffect, useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { CLIENTS } from '@/lib/mock-data';
import type { Client } from '@/lib/types';
import { DataTable } from './components/data-table';
import { getColumns } from './components/columns';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function ClientsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Client[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(CLIENTS);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const columns = useMemo<ColumnDef<Client>[]>(() => getColumns(), []);

  if (loading) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-64"/>
                <Skeleton className="h-4 w-96"/>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-10 w-full mb-4"/>
                <Skeleton className="h-64 w-full"/>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="h-6 w-6"/>Client Management</CardTitle>
            <CardDescription>View, search, and manage all your clients.</CardDescription>
        </CardHeader>
        <CardContent>
            <DataTable columns={columns} data={data} />
        </CardContent>
    </Card>
  );
}
