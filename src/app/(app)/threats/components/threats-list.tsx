'use client';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CloudTrailIcon, GuardDutyIcon, SecurityHubIcon } from '@/components/icons';
import type { Threat } from '@/lib/types';
import { cn } from '@/lib/utils';
import { AlertCircle, FileJson, Server } from 'lucide-react';

const severityConfig = {
  critical: 'border-red-500/50 hover:bg-red-500/5',
  high: 'border-orange-500/50 hover:bg-orange-500/5',
  medium: 'border-yellow-500/50 hover:bg-yellow-500/5',
  low: 'border-blue-500/50 hover:bg-blue-500/5',
};

const severityBadgeConfig = {
  critical: 'bg-red-500/20 text-red-400 border-red-500/50',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  low: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
};

const statusProgress: { [key: string]: number } = {
  active: 25,
  monitoring: 50,
  isolating: 75,
  blocked: 100,
};

const sourceIcons: { [key: string]: React.ElementType } = {
  GuardDuty: GuardDutyIcon,
  'Security Hub': SecurityHubIcon,
  CloudTrail: CloudTrailIcon,
};

export default function ThreatsList({ threats }: { threats: Threat[] }) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  
  if (threats.length === 0) {
    return (
      <div className="text-center py-10">
        <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No Threats Found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          No threats match your current filters.
        </p>
      </div>
    )
  }

  return (
    <Accordion type="single" collapsible value={openAccordion || ""} onValueChange={setOpenAccordion}>
      <div className="space-y-2">
        {threats.map(threat => (
          <AccordionItem value={`item-${threat.id}`} key={threat.id} className={cn("border rounded-lg", severityConfig[threat.severity])}>
            <AccordionTrigger className="p-4 text-left hover:no-underline">
              <div className="grid grid-cols-6 gap-4 w-full">
                <div className="col-span-2 font-medium">{threat.type}</div>
                <div>{threat.client}</div>
                <div>
                  <Badge variant="outline" className={cn("capitalize", severityBadgeConfig[threat.severity])}>
                    {threat.severity}
                  </Badge>
                </div>
                <div className="text-muted-foreground">{threat.time}</div>
                <div className="flex items-center gap-2">
                  <span className="capitalize text-sm">{threat.status}</span>
                  <Progress value={statusProgress[threat.status]} className="h-1 w-16" />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0">
                <Card className="bg-muted/30">
                    <CardContent className="p-4 grid grid-cols-3 gap-4">
                        <div className="col-span-2 space-y-4">
                            <h4 className="font-semibold">Description</h4>
                            <p className="text-muted-foreground text-sm">{threat.description}</p>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="bg-info/10 text-info-foreground border-info hover:bg-info/20">Investigate</Button>
                                <Button size="sm" variant="destructive">Isolate</Button>
                            </div>
                        </div>
                        <div className="space-y-4">
                             <h4 className="font-semibold">Forensics</h4>
                             <div className="text-sm space-y-2 text-muted-foreground">
                                <p className="flex items-center gap-2"><Server className="h-4 w-4"/> Source: {threat.source}</p>
                                <p className="flex items-center gap-2"><FileJson className="h-4 w-4"/> Details:</p>
                                <pre className="p-2 bg-black/50 rounded-md text-white text-xs overflow-x-auto">
                                    {JSON.stringify(threat.details, null, 2)}
                                </pre>
                             </div>
                        </div>
                    </CardContent>
                </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </div>
    </Accordion>
  );
}
