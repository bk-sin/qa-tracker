import { UserAvatar } from '@/components/common';
import { Button } from '@/components/ui/button';
import { UserData } from '../hooks/use-user-helpers';

interface UserMenuTriggerProps {
  user: UserData;
  getInitials: (name: string) => string;
  getRoleIcon: (role: UserData['role']) => React.ReactNode;
  getRoleLabel: (role: UserData['role']) => string;
}

export function UserMenuTrigger({
  user,
  getInitials,
  getRoleIcon,
  getRoleLabel,
}: UserMenuTriggerProps) {
  return (
    <Button variant="ghost" className="relative h-10 w-auto rounded-full px-2">
      <div className="flex items-center gap-2">
        <UserAvatar
          src={user.avatar}
          alt={user.name}
          fallback={getInitials(user.name)}
          size="md"
        />
        <div className="hidden flex-col items-start md:flex">
          <span className="text-sm font-medium">{user.name}</span>
          <div className="flex items-center gap-1">
            {getRoleIcon(user.role)}
            <span className="text-xs text-gray-500">
              {getRoleLabel(user.role)}
            </span>
          </div>
        </div>
      </div>
    </Button>
  );
}
