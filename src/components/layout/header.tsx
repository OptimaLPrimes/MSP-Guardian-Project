import Link from 'next/link';
import { Bell, Menu, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NavLinks from './nav-links';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Header() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6 z-50">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Shield className="h-6 w-6 text-primary" />
        <span className="sr-only">MSP Guardian</span>
      </Link>
      <div className="hidden md:flex md:items-center md:gap-5 lg:gap-6">
        <h1 className="text-lg font-semibold">MSP Guardian</h1>
        <NavLinks />
      </div>
      
      <div className="flex w-full items-center gap-4 md:ml-auto md:w-auto">
        <div className="ml-auto flex-1 sm:flex-initial">
           <div className="flex items-center gap-2 text-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
            </span>
            <span className="hidden sm:inline text-muted-foreground">System Status: </span><span className="hidden sm:inline font-semibold text-success-foreground bg-success/80 px-2 py-1 rounded-md">Operational</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          <Badge className="absolute top-1 right-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full p-0 text-xs" variant="destructive">
            3
          </Badge>
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Shield className="h-6 w-6 text-primary" />
              <span className="">MSP Guardian</span>
            </Link>
            <NavLinks isMobile={true} />
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
