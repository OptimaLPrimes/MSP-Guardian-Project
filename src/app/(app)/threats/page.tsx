'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ListFilter, Search, ShieldAlert } from 'lucide-react';
import ThreatsList from './components/threats-list';
import { THREATS } from '@/lib/mock-data';
import type { Threat } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { SecurityHubIcon } from '@/components/icons';

export default function ThreatsPage() {
  const [loading, setLoading] = useState(true);
  const [threats, setThreats] = useState<Threat[]>([]);
  const [filteredThreats, setFilteredThreats] = useState<Threat[]>([]);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setThreats(THREATS);
      setFilteredThreats(THREATS);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let result = threats;
    if (severityFilter !== 'all') {
      result = result.filter(t => t.severity === severityFilter);
    }
    if (searchTerm) {
      result = result.filter(t => 
        t.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredThreats(result);
  }, [severityFilter, searchTerm, threats]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div className="grid gap-2">
                <CardTitle className="flex items-center gap-2">
                    <ShieldAlert className="h-6 w-6" />
                    Threat Intelligence Center
                </CardTitle>
                <CardDescription>Investigate and respond to threats across your client environments.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
                 <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                        type="search" 
                        placeholder="Search threats..." 
                        className="pl-8 sm:w-[300px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                        </span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by severity</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={severityFilter} onValueChange={setSeverityFilter}>
                        <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="critical">Critical</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="high">High</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button>
                    <SecurityHubIcon className="mr-2 h-4 w-4"/>
                    Auto-Respond All
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? <ThreatsListSkeleton /> : <ThreatsList threats={filteredThreats} />}
      </CardContent>
    </Card>
  );
}

function ThreatsListSkeleton() {
    return (
        <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
            ))}
        </div>
    )
}
