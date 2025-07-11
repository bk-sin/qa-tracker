import { Code, Shield, TestTube, User } from 'lucide-react';

export type UserRole = 'qa' | 'developer' | 'admin';

export interface UserData {
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  notifications?: number;
}

export function useUserHelpers() {
  const getRoleIcon = (role: UserRole) => {
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

  const getRoleLabel = (role: UserRole) => {
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

  const getRoleBadgeColor = (role: UserRole) => {
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

  const getDefaultUser = (): UserData => ({
    name: 'Ana García',
    email: 'ana.garcia@company.com',
    role: 'qa',
    avatar: '/placeholder.svg?height=32&width=32',
    notifications: 3,
  });

  return {
    getRoleIcon,
    getRoleLabel,
    getRoleBadgeColor,
    getInitials,
    getDefaultUser,
  };
}
