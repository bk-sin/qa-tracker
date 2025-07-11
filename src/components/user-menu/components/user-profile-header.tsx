import { Badge } from '@/components/ui/badge';
import { UserAvatar } from '@/components/common';
import { UserData } from '../hooks/use-user-helpers';

interface UserProfileHeaderProps {
  user: UserData;
  getInitials: (name: string) => string;
  getRoleIcon: (role: UserData['role']) => React.ReactNode;
  getRoleLabel: (role: UserData['role']) => string;
  getRoleBadgeColor: (role: UserData['role']) => string;
}

export function UserProfileHeader({
  user,
  getInitials,
  getRoleIcon,
  getRoleLabel,
  getRoleBadgeColor,
}: UserProfileHeaderProps) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center gap-2">
        <UserAvatar
          src={user.avatar}
          alt={user.name}
          fallback={getInitials(user.name)}
          size="lg"
        />
        <div className="flex flex-col">
          <p className="text-sm leading-none font-medium">{user.name}</p>
          <p className="text-muted-foreground mt-1 text-xs leading-none">
            {user.email}
          </p>
        </div>
      </div>
      <Badge className={`w-fit ${getRoleBadgeColor(user.role)}`}>
        {getRoleIcon(user.role)}
        <span className="ml-1">{getRoleLabel(user.role)}</span>
      </Badge>
    </div>
  );
}
