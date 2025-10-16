import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowRight, Bot, Cpu, Lightbulb, ShieldCheck } from 'lucide-react';
import { SageMakerIcon } from '@/components/icons';

export default function AiInsightsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <SageMakerIcon className="h-7 w-7"/> AI-Powered Security Intelligence
        </h1>
        <p className="text-muted-foreground">Leverage generative AI to discover hidden patterns and preemptively address threats.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-500"><Cpu className="h-6 w-6"/>Predictive Risk Analysis</CardTitle>
            <CardDescription>AI-driven forecasts of potential security threats.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg border-2 border-dashed border-destructive/50 bg-destructive/10">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-destructive/20 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold text-destructive">High-Risk Threat Predicted</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-2">Our models predict a 92% probability of a coordinated DDoS attack targeting clients in the Finance industry within the next 48 hours.</p>
                  <Button variant="destructive" size="sm">
                    Activate Enhanced Defenses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg border-2 border-dashed border-warning/50 bg-warning/10">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-warning/20 rounded-full">
                        <AlertTriangle className="h-6 w-6 text-warning" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-warning">Medium-Risk Anomaly Detected</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-2">A novel strain of malware has been identified in the wild. We've proactively generated and pushed detection signatures to all client endpoints.</p>
                        <Button variant="outline" size="sm">Review Signatures</Button>
                    </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-info"><Lightbulb className="h-6 w-6"/>Anomaly Detection Feed</CardTitle>
            <CardDescription>Real-time stream of unusual patterns identified by the AI engine.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg bg-muted/50">
                <h4 className="font-semibold text-sm">Anomalous IAM Role Escalation</h4>
                <p className="text-xs text-muted-foreground mt-1">User 'dev-ops-temp' at 'Innovate LLC' assumed a high-privilege role outside of normal operating hours.</p>
            </div>
             <div className="p-3 rounded-lg bg-muted/50">
                <h4 className="font-semibold text-sm">Cross-Client Login Velocity</h4>
                <p className="text-xs text-muted-foreground mt-1">A single IP address has attempted to log in to 5 different client portals in under 2 minutes. The IP has been auto-blocked.</p>
            </div>
             <div className="p-3 rounded-lg bg-muted/50">
                <h4 className="font-semibold text-sm">Unusual S3 Bucket Access Pattern</h4>
                <p className="text-xs text-muted-foreground mt-1">'Acme Corp' production data bucket is being accessed by a new, unrecognized service principal.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bot className="h-6 w-6"/>Automated Recommendations</CardTitle>
            <CardDescription>Proactive steps suggested by the AI to improve your security posture.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/0 border border-blue-500/30">
                <h3 className="font-semibold flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-blue-400"/>Automated Patch Management</h3>
                <p className="text-sm text-muted-foreground mt-2 mb-4">AI has identified 47 critical CVEs across 12 clients. We can automate patching during the next maintenance window.</p>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Schedule Patches</Button>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/0 border border-green-500/30">
                <h3 className="font-semibold flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-green-400"/>Zero-Trust Policy Update</h3>
                <p className="text-sm text-muted-foreground mt-2 mb-4">Analysis suggests tightening network access policies for 3 at-risk clients. We've generated new IAM policies for your review.</p>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">Review Policies</Button>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/0 border border-purple-500/30">
                <h3 className="font-semibold flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-purple-400"/>Phishing Awareness Training</h3>
                <p className="text-sm text-muted-foreground mt-2 mb-4">Based on recent phishing attempts, we recommend enrolling 82 users at 'RetailGiant' in a targeted training module.</p>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">Enroll Users</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
