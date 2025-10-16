'use client';
import { useState, useEffect } from 'react';
import { Users, AlertTriangle, CheckCircle, FileText, TrendingUp, Eye } from 'lucide-react';
import StatCard from './components/stat-card';
import ThreatFeed from './components/threat-feed';
import AiInsightsPanel from './components/ai-insights-panel';
import ClientRiskOverview from './components/client-risk-overview';
import { THREATS, CLIENTS, AI_INSIGHTS } from '@/lib/mock-data';
import type { Threat, Client, AiInsight } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [threats, setThreats] = useState<Threat[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [insights, setInsights] = useState<AiInsight[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setThreats(THREATS.slice(0, 5));
      setClients(CLIENTS);
      setInsights(AI_INSIGHTS);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      // Simulate real-time updates
      setThreats(prevThreats => {
        const newThreats = [...prevThreats];
        const randomIndex = Math.floor(Math.random() * newThreats.length);
        //- Modify a random threat's time
        if (newThreats[randomIndex]) {
          newThreats[randomIndex] = { ...newThreats[randomIndex], time: `${Math.floor(Math.random() * 59) + 1} min ago` };
        }
        return newThreats;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [loading]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  const atRiskClients = clients.filter(c => c.status === 'at-risk' || c.status === 'critical').length;

  return (
    <div className="flex-1 space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Total Clients" value={clients.length} icon={Users} />
        <StatCard title="Active Threats" value={threats.length} icon={AlertTriangle} isPulsing />
        <StatCard title="Resolved Today" value={28} icon={CheckCircle} />
        <StatCard title="Compliance Score" value="94%" icon={FileText} />
        <StatCard title="At-Risk Clients" value={atRiskClients} icon={TrendingUp} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-5">
          <ThreatFeed threats={threats} />
        </div>
        <div className="lg:col-span-2">
          <AiInsightsPanel insights={insights} />
        </div>
      </div>
      <div>
        <ClientRiskOverview clients={clients.slice(0, 5)} />
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex-1 space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-[126px]" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-5">
          <Skeleton className="h-[400px]" />
        </div>
        <div className="lg:col-span-2">
          <Skeleton className="h-[400px]" />
        </div>
      </div>
      <div>
        <Skeleton className="h-[200px]" />
      </div>
    </div>
  );
}
