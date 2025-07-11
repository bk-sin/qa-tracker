import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { TestTube, Code } from 'lucide-react';
import { UserData } from '../hooks/use-user-helpers';

interface RoleSwitcherProps {
  currentRole: UserData['role'];
  onRoleSwitch: (role: 'qa' | 'developer') => void;
  onDashboardClick: () => void;
}

export function RoleSwitcher({
  currentRole,
  onRoleSwitch,
  onDashboardClick,
}: RoleSwitcherProps) {
  return (
    <>
      <DropdownMenuSeparator />

      <DropdownMenuLabel className="text-xs font-normal text-gray-500">
        Cambiar Vista
      </DropdownMenuLabel>

      <DropdownMenuItem onClick={() => onRoleSwitch('qa')}>
        <TestTube className="mr-2 h-4 w-4" />
        <span>Panel QA</span>
        {currentRole === 'qa' && (
          <Badge variant="outline" className="ml-auto text-xs">
            Actual
          </Badge>
        )}
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => onRoleSwitch('developer')}>
        <Code className="mr-2 h-4 w-4" />
        <span>Panel Developer</span>
        {currentRole === 'developer' && (
          <Badge variant="outline" className="ml-auto text-xs">
            Actual
          </Badge>
        )}
      </DropdownMenuItem>

      <DropdownMenuItem onClick={onDashboardClick}>
        <TestTube className="mr-2 h-4 w-4" />
        <span>Dashboard General</span>
      </DropdownMenuItem>
    </>
  );
}
