import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Threat } from '@/lib/types';
import { GuardDutyIcon, SecurityHubIcon, CloudTrailIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const severityConfig = {
  critical: 'bg-red-500/10 border-red-500/50 text-red-400',
  high: 'bg-orange-500/10 border-orange-500/50 text-orange-400',
  medium: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400',
  low: 'bg-blue-500/10 border-blue-500/50 text-blue-400',
};

const statusConfig = {
    active: 'text-red-400',
    isolating: 'text-yellow-400',
    blocked: 'text-green-400',
    monitoring: 'text-blue-400',
};


const sourceIcons: { [key: string]: React.ElementType } = {
  GuardDuty: GuardDutyIcon,
  'Security Hub': SecurityHubIcon,
  CloudTrail: CloudTrailIcon,
};

export default function ThreatFeed({ threats }: { threats: Threat[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
            <CardTitle>Real-Time Threat Detection</CardTitle>
            <Badge variant="outline" className="border-primary/50 text-primary">AWS Integrated</Badge>
        </div>
        <CardDescription>Live feed of active threats across all clients.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {threats.map((threat, index) => (
            <div key={threat.id}>
              <div className={cn("flex flex-col sm:flex-row items-start sm:items-center gap-4 p-2 rounded-lg", severityConfig[threat.severity])}>
                <div className="flex-1 grid gap-1">
                  <p className="font-semibold text-card-foreground">{threat.type}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{threat.client}</span>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="flex items-center gap-1">
                      {React.createElement(sourceIcons[threat.source], { className: "h-4 w-4"})}
                      {threat.source}
                    </span>
                    <Separator orientation="vertical" className="h-4 hidden sm:block" />
                    <span className={cn("font-medium capitalize hidden sm:block", statusConfig[threat.status])}>
                      {threat.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className={cn("capitalize", severityConfig[threat.severity])}>{threat.severity}</Badge>
                    <span className="text-xs text-muted-foreground w-20 text-right">{threat.time}</span>
                    <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
