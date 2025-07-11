import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut } from 'lucide-react';

interface UserMenuActionsProps {
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onLogout: () => void;
}

export function UserMenuActions({
  onProfileClick,
  onSettingsClick,
  onLogout,
}: UserMenuActionsProps) {
  return (
    <>
      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={onProfileClick}>
        <User className="mr-2 h-4 w-4" />
        <span>Perfil</span>
      </DropdownMenuItem>

      <DropdownMenuItem onClick={onSettingsClick}>
        <Settings className="mr-2 h-4 w-4" />
        <span>Configuración</span>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        onClick={onLogout}
        className="text-red-600 focus:text-red-600"
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Cerrar Sesión</span>
      </DropdownMenuItem>
    </>
  );
}
