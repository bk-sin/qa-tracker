'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Bell,
  Code,
  LogOut,
  Settings,
  Shield,
  TestTube,
  User,
} from 'lucide-react';
import { useState } from 'react';

interface UserNavProps {
  user?: {
    name: string;
    email: string;
    role: 'qa' | 'developer' | 'admin';
    avatar?: string;
    notifications?: number;
  };
}

export function UserNav({ user }: UserNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentUser = user || {
    name: 'Ana García',
    email: 'ana.garcia@company.com',
    role: 'qa' as const,
    avatar: '/placeholder.svg?height=32&width=32',
    notifications: 3,
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'qa':
        return <TestTube className="h-4 w-4" />;
      case 'developer':
        return <Code className="h-4 w-4" />;
      case 'admin':
        return <Shield className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'qa':
        return 'QA Tester';
      case 'developer':
        return 'Developer';
      case 'admin':
        return 'Admin';
      default:
        return 'Usuario';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'qa':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'developer':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const handleRoleSwitch = (newRole: 'qa' | 'developer') => {
    if (newRole === 'qa') {
      window.location.href = '/qa-admin';
    } else {
      window.location.href = '/dev-panel';
    }
  };

  const handleLogout = () => {};

  return (
    <div className="flex items-center gap-3">
      {currentUser.notifications && currentUser.notifications > 0 && (
        <Button variant="outline" size="sm" className="relative bg-transparent">
          <Bell className="h-4 w-4" />
          {currentUser.notifications > 0 && (
            <Badge className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center bg-red-500 p-0 text-xs">
              {currentUser.notifications}
            </Badge>
          )}
        </Button>
      )}

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-auto rounded-full px-2"
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={currentUser.avatar || '/placeholder.svg'}
                  alt={currentUser.name}
                />
                <AvatarFallback className="text-sm">
                  {getInitials(currentUser.name)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start md:flex">
                <span className="text-sm font-medium">{currentUser.name}</span>
                <div className="flex items-center gap-1">
                  {getRoleIcon(currentUser.role)}
                  <span className="text-xs text-gray-500">
                    {getRoleLabel(currentUser.role)}
                  </span>
                </div>
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={currentUser.avatar || '/placeholder.svg'}
                    alt={currentUser.name}
                  />
                  <AvatarFallback>
                    {getInitials(currentUser.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm leading-none font-medium">
                    {currentUser.name}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs leading-none">
                    {currentUser.email}
                  </p>
                </div>
              </div>
              <Badge className={`w-fit ${getRoleBadgeColor(currentUser.role)}`}>
                {getRoleIcon(currentUser.role)}
                <span className="ml-1">{getRoleLabel(currentUser.role)}</span>
              </Badge>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => {}}>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => {}}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel className="text-xs font-normal text-gray-500">
            Cambiar Vista
          </DropdownMenuLabel>

          <DropdownMenuItem onClick={() => handleRoleSwitch('qa')}>
            <TestTube className="mr-2 h-4 w-4" />
            <span>Panel QA</span>
            {currentUser.role === 'qa' && (
              <Badge variant="outline" className="ml-auto text-xs">
                Actual
              </Badge>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleRoleSwitch('developer')}>
            <Code className="mr-2 h-4 w-4" />
            <span>Panel Developer</span>
            {currentUser.role === 'developer' && (
              <Badge variant="outline" className="ml-auto text-xs">
                Actual
              </Badge>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => (window.location.href = '/')}>
            <TestTube className="mr-2 h-4 w-4" />
            <span>Dashboard General</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-600 focus:text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
