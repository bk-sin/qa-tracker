'use client';

import { useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';
import { Navbar } from './navbar';

export function ConditionalNavbar() {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();

  const isAuthRoute = pathname.startsWith('/auth');

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated && !isAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    return null;
  }

  return <Navbar />;
}
