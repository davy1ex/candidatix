'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {Settings} from "@/features/settings";
import { cn } from '@/shared/lib/css';
import { buttonVariants } from '@/shared/ui/button';

const navItems = [
  { label: 'Main', href: '/' },
  { label: 'Generate Response', href: '/generate-response' },
  { label: 'Response', href: '/responses' },
  { label: 'Resume', href: '/resume' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-background shadow-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl">
          💁‍♂️ Canditatix
        </Link>

        <nav className="flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: pathname === item.href ? 'default' : 'ghost' }),
                'text-sm'
              )}
            >
              {item.label}
            </Link>
          ))}
          <Settings />

        </nav>
      </div>
    </header>
  );
}
