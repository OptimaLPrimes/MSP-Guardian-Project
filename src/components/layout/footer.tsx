import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-background/80 px-4 py-4 backdrop-blur-sm md:px-6">
      <div className="container mx-auto flex items-center justify-between text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} MSP Guardian Security</p>
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-primary">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-primary">
            Contact Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
