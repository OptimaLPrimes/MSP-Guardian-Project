'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ComplianceCard from './components/compliance-card';
import { COMPLIANCE_DATA, COMPLIANCE_EVENTS } from '@/lib/mock-data';
import type { ComplianceData, ComplianceEvent } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckSquare, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const severityBadgeConfig = {
    high: 'bg-red-500/20 text-red-400 border-red-500/50',
    medium: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
    low: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  };

export default function CompliancePage() {
  const [loading, setLoading] = useState(true);
  const [complianceData, setComplianceData] = useState<ComplianceData[]>([]);
  const [complianceEvents, setComplianceEvents] = useState<ComplianceEvent[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setComplianceData(COMPLIANCE_DATA);
      setComplianceEvents(COMPLIANCE_EVENTS);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <CompliancePageSkeleton />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <CheckSquare className="h-7 w-7"/> Compliance Guardian
        </h1>
        <p className="text-muted-foreground">Monitor and enforce compliance across all client environments.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {complianceData.map(data => (
          <ComplianceCard key={data.framework} data={data} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Recent Compliance Events</CardTitle>
          <CardDescription>Alerts and notifications related to compliance status changes.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
            {complianceEvents.map((event, index) => (
                <div key={event.id}>
                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                            <p className="font-medium">{event.description}</p>
                            <p className="text-sm text-muted-foreground">{event.timestamp}</p>
                        </div>
                        <div className="flex items-center gap-2">
                           <Badge variant="outline" className="font-mono">{event.framework}</Badge>
                           <Badge variant="outline" className={cn("capitalize", severityBadgeConfig[event.severity])}>{event.severity}</Badge>
                        </div>
                    </div>
                    {index < complianceEvents.length - 1 && <Separator className="my-4"/>}
                </div>
            ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CompliancePageSkeleton() {
  return (
    <div className="space-y-8">
        <div>
            <Skeleton className="h-8 w-80 mb-2"/>
            <Skeleton className="h-5 w-96"/>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-48" />
            ))}
        </div>
        <Skeleton className="h-64" />
    </div>
  );
}
