'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import {
  NotificationButton,
  RoleSwitcher,
  UserMenuActions,
  UserProfileHeader,
  UserTrigger,
} from './components';
import { useUserActions, useUserHelpers, type UserData } from './hooks';

interface UserMenuProps {
  user?: UserData;
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    getRoleIcon,
    getRoleLabel,
    getRoleBadgeColor,
    getInitials,
    getDefaultUser,
  } = useUserHelpers();

  const {
    handleRoleSwitch,
    handleLogout,
    handleProfileClick,
    handleSettingsClick,
    handleDashboardClick,
  } = useUserActions();

  const currentUser = user || getDefaultUser();

  return (
    <div className="flex items-center gap-3">
      <NotificationButton notifications={currentUser.notifications} />

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <UserTrigger
            user={currentUser}
            getInitials={getInitials}
            getRoleIcon={getRoleIcon}
            getRoleLabel={getRoleLabel}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <UserProfileHeader
              user={currentUser}
              getInitials={getInitials}
              getRoleIcon={getRoleIcon}
              getRoleLabel={getRoleLabel}
              getRoleBadgeColor={getRoleBadgeColor}
            />
          </DropdownMenuLabel>

          <UserMenuActions
            onProfileClick={handleProfileClick}
            onSettingsClick={handleSettingsClick}
            onLogout={handleLogout}
          />

          <RoleSwitcher
            currentRole={currentUser.role}
            onRoleSwitch={handleRoleSwitch}
            onDashboardClick={handleDashboardClick}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
