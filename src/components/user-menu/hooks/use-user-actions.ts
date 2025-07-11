'use client';

export function useUserActions() {
  const handleRoleSwitch = (newRole: 'qa' | 'developer') => {
    if (newRole === 'qa') {
      window.location.href = '/qa-admin';
    } else {
      window.location.href = '/dev-panel';
    }
  };

  const handleLogout = () => {};

  const handleProfileClick = () => {};

  const handleSettingsClick = () => {};

  const handleDashboardClick = () => {
    window.location.href = '/';
  };

  return {
    handleRoleSwitch,
    handleLogout,
    handleProfileClick,
    handleSettingsClick,
    handleDashboardClick,
  };
}
