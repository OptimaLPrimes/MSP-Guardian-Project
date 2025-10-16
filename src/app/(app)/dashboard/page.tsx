'use client';
import { useState, useEffect } from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  Package,
} from 'lucide-react';
import StatCard from './components/stat-card';
import { THREATS, CLIENTS } from '@/lib/mock-data';
import type { Threat, Client } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecentSecurityAlerts } from './components/recent-security-alerts';
import SystemHealthChart from './components/system-health-chart';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [threats, setThreats] = useState<Threat[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setThreats(THREATS);
      setClients(CLIENTS);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  const activeThreats = threats.filter(
    (t) => t.status === 'active' || t.status === 'isolating'
  ).length;

  return (
    <div className="flex-1 space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="col-span-1 flex flex-col items-center justify-center bg-card/50 animate-fade-in-up">
          <CardHeader className="items-center pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overall Security Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="relative flex h-32 w-32 items-center justify-center">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="stroke-muted/30"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3"
                />
                <path
                  className="stroke-primary transition-all duration-1000 ease-out"
                  strokeDasharray="94, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{strokeDashoffset: (100 - 94)}}
                />
              </svg>
              <span className="absolute text-4xl font-bold text-primary animate-fade-in">
                94
              </span>
            </div>
          </CardContent>
        </Card>
        <div className="col-span-3 grid grid-cols-3 gap-6">
          <StatCard
            title="Active Threats"
            value={activeThreats}
            icon={AlertTriangle}
            variant={activeThreats > 0 ? 'destructive' : 'default'}
            className="[animation-delay:50ms]"
          />
          <StatCard
            title="Unpatched Systems"
            value={14}
            icon={Package}
            variant="warning"
            className="[animation-delay:100ms]"
          />
          <StatCard
            title="Pending Security Updates"
            value={3}
            icon={ShieldCheck}
            className="[animation-delay:150ms]"
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-3 md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Security Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSecurityAlerts data={threats.slice(0, 5)} />
          </CardContent>
        </Card>
        <div className="col-span-3 md:col-span-1">
          <SystemHealthChart />
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex-1 space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        <Skeleton className="col-span-1 h-[218px]" />
        <div className="col-span-3 grid grid-cols-3 gap-6">
          <Skeleton className="h-[100px]" />
          <Skeleton className="h-[100px]" />
          <Skeleton className="h-[100px]" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="col-span-2 h-[400px]" />
        <Skeleton className="col-span-1 h-[400px]" />
      </div>
    </div>
  );
}
