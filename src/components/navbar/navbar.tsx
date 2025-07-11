'use client';

import { NavbarHeader } from '@/components/navbar/components/navbar-header';
import { NavbarToolbar } from '@/components/navbar/components/navbar-toolbar';
import { useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  const { user: authUser } = useAuth();
  const isDevPanel = pathname === '/dev-panel';

  const userData = {
    name: authUser?.name || (isDevPanel ? 'Juan Pérez' : 'Ana García'),
    email:
      authUser?.email ||
      (isDevPanel ? 'juan.perez@company.com' : 'ana.garcia@company.com'),
    role:
      authUser?.role || (isDevPanel ? ('developer' as const) : ('qa' as const)),
    avatar: authUser?.avatar || '/placeholder.svg?height=32&width=32',
    notifications: authUser?.notifications || (isDevPanel ? 2 : 5),
  };

  const headerConfig = isDevPanel
    ? {
        title: 'Developer Panel',
        subtitle: 'Issues asignados y gestión de builds',
      }
    : {
        title: 'QA Management Panel',
        subtitle: 'Gestión de issues y seguimiento de testing',
      };

  return (
    <div className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed top-0 right-0 left-0 z-50 border-b px-6 py-4 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <NavbarHeader
          title={headerConfig.title}
          subtitle={headerConfig.subtitle}
        />
        <NavbarToolbar user={userData} />
      </div>
    </div>
  );
}
