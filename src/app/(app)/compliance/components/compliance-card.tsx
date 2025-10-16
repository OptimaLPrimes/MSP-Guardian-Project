import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Lock } from 'lucide-react';
import type { ComplianceData } from '@/lib/types';
import { ConfigIcon } from '@/components/icons';

export default function ComplianceCard({ data }: { data: ComplianceData }) {
    const getProgressColor = (status: number) => {
        if (status > 95) return 'bg-green-500';
        if (status > 85) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Lock className="h-5 w-5" />
                        {data.framework}
                    </CardTitle>
                    <ConfigIcon className="h-6 w-6 text-muted-foreground"/>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-3xl font-bold">{data.status}%</span>
                        <span className="text-sm text-muted-foreground">Compliant</span>
                    </div>
                    <Progress value={data.status} indicatorClassName={getProgressColor(data.status)} />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Violations: <span className="font-semibold text-foreground">{data.violations}</span></span>
                    <span>Last audit: <span className="font-semibold text-foreground">{data.lastAudit}</span></span>
                </div>
            </CardContent>
        </Card>
    );
}
