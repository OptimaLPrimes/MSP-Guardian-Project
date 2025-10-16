import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Client } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Users } from 'lucide-react';

const statusDotConfig = {
  critical: 'bg-red-500',
  'at-risk': 'bg-orange-500',
  healthy: 'bg-green-500',
};

const riskProgressConfig = {
    high: 'bg-red-500',
    medium: 'bg-orange-500',
    low: 'bg-green-500',
}

export default function ClientRiskOverview({ clients }: { clients: Client[] }) {
    
  const getRiskColor = (risk: number) => {
    if (risk > 70) return riskProgressConfig.high;
    if (risk > 50) return riskProgressConfig.medium;
    return riskProgressConfig.low;
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5"/>Client Risk Overview</CardTitle>
            <CardDescription>A snapshot of clients with the highest risk scores.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {clients.map(client => (
            <Card key={client.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center justify-between">
                        <span className="flex items-center gap-2">
                            <span className={cn("h-2 w-2 rounded-full", statusDotConfig[client.status])}></span>
                            {client.name}
                        </span>
                        <span className="text-xs font-normal text-muted-foreground">{client.industry}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Risk Score</span>
                            <span className="font-semibold">{client.risk}</span>
                        </div>
                        <Progress value={client.risk} indicatorClassName={getRiskColor(client.risk)} />
                    </div>
                    <div className="flex justify-between text-xs pt-2">
                        <div className="text-center">
                            <p className="font-bold text-lg">{client.threats}</p>
                            <p className="text-muted-foreground">Threats</p>
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-lg">{client.compliance}%</p>
                            <p className="text-muted-foreground">Compliance</p>
                        </div>
                         <div className="text-center">
                            <p className="font-bold text-lg">{client.assets}</p>
                            <p className="text-muted-foreground">Assets</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            ))}
        </CardContent>
    </Card>
  );
}
