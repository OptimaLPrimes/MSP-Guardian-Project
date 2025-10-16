'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/threats', label: 'Threats' },
  { href: '/clients', label: 'Clients' },
  { href: '/compliance', label: 'Compliance' },
  { href: '/ai-insights', label: 'AI Insights' },
];

export default function NavLinks({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className={cn(
      "items-center text-sm font-medium",
      isMobile ? "flex flex-col space-y-4 pt-4" : "flex flex-row space-x-4 lg:space-x-6"
    )}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'transition-colors hover:text-primary',
            pathname.startsWith(link.href) ? 'text-primary' : 'text-muted-foreground',
            isMobile && 'text-lg'
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
