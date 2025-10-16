import type { SVGProps } from 'react';

export function GuardDutyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="m12 14-4-4 4-4 4 4-4 4z"></path>
    </svg>
  );
}

export function SecurityHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
      <path d="m12 7 2.5 5L12 17l-2.5-5L12 7z" />
    </svg>
  );
}

export function CloudTrailIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M14 11h-1.6L12 9l-1.6 2H8l-2 3h2.6L12 17l1.6-3H16l2-3zm-2-5c.66.66 1 1.54 1 2.5 0 .96-.34 1.84-1 2.5-.66-.66-1-1.54-1-2.5s.34-1.84 1-2.5z"/>
            <path d="M17.66 7.34c.52.52.84 1.2.84 1.96s-.32 1.44-.84 1.96c-.52-.52-.84-1.2-.84-1.96s.32-1.44.84-1.96z"/>
            <path d="M6.34 7.34c.52.52.84 1.2.84 1.96s-.32 1.44-.84 1.96C5.82 10.76 5.5 10 5.5 9.3s.32-1.44.84-1.96z"/>
            <path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z"/>
        </svg>
    )
}

export function ConfigIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 2-3.1 6.9-6.9 3.1 6.9 3.1L12 22l3.1-6.9 6.9-3.1-6.9-3.1L12 2z"></path>
      <path d="m12 7.1 1.9 4 4 1.9-4 1.9-1.9 4-1.9-4-4-1.9 4-1.9 1.9-4z"></path>
    </svg>
  )
}

export function SageMakerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3.5 13a9.5 9.5 0 1 0 17 0a9.5 9.5 0 1 0-17 0"></path>
      <path d="M14 13h-4"></path>
      <path d="M12 11v4"></path>
      <path d="m8 13 1.5-2.5"></path>
      <path d="m16 13-1.5-2.5"></path>
      <path d="m12 11-1.5-2.5"></path>
      <path d="m12 11 1.5-2.5"></path>
      <path d="m8.5 10.5 1-1.5"></path>
      <path d="m14.5 10.5-1-1.5"></path>
    </svg>
  );
}
