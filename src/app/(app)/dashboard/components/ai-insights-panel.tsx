import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, ArrowRight } from 'lucide-react';
import type { AiInsight } from '@/lib/types';
import { Separator } from '@/components/ui/separator';

export default function AiInsightsPanel({ insights }: { insights: AiInsight[] }) {
  return (
    <Card className="h-full bg-accent/20 border-accent/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent-foreground">
          <Eye className="text-accent" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={insight.id}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <insight.icon className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-sm text-accent-foreground/80">{insight.message}</p>
                  {insight.action && (
                    <Button variant="link" className="p-0 h-auto text-accent hover:text-accent-foreground">
                      {insight.action}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              {index < insights.length - 1 && <Separator className="my-4 bg-accent/20"/>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
