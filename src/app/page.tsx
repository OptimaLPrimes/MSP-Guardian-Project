
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Shield, Bot, BarChart, Zap, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import NodeNetwork from '@/components/node-network';

export default function HomePage() {
  const [isCritical, setIsCritical] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsCritical(prev => !prev);
    }, 10000); // Toggle critical state every 10 seconds for demonstration
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-card to-background overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 z-10">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    AI-Powered Cybersecurity for the Modern MSP
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    MSP Guardian is your command center for proactive threat
                    detection, intelligent response, and comprehensive
                    client security management. Stop chasing alerts. Start
                    preventing breaches.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/dashboard"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Request a Demo
                  </Link>
                </div>
              </div>
              <div className="relative flex items-center justify-center z-0">
                <NodeNetwork isCritical={isCritical} />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Work Smarter, Not Harder
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Leverage the power of AI to automate tedious tasks, gain
                  deeper insights, and scale your security operations
                  effortlessly.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <Card className="hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-6 w-6 text-primary" />
                    AI-Powered Triage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Automatically categorize and prioritize alerts from
                    SuperOps and other sources. Our AI suggests actionable
                    next steps, turning noise into signal.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-6 w-6 text-primary" />
                    Automated Response
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Define playbooks to automatically isolate endpoints, block
                    malicious IPs, or create tickets in your PSA. Free up
                    your technicians for high-value work.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-6 w-6 text-primary" />
                    Predictive Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Our threat intelligence engine analyzes global and
                    client-specific data to predict potential attacks before
                    they happen, helping you stay ahead.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
