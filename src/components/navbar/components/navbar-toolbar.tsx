'use client';
import { CreateIssueDialog } from '@/components/navbar/components/issue-creation-dialog';
import { UserNav } from '@/components/navbar/components/user-nav';
import { useIssueCreation } from '@/components/navbar/hooks/use-issue-creation';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Code, Globe, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarToolbarProps {
  user: {
    name: string;
    email: string;
    role: 'qa' | 'developer' | 'admin';
    avatar: string;
    notifications: number;
  };
}

export function NavbarToolbar({ user }: NavbarToolbarProps) {
  const pathname = usePathname();
  const isDevPanel = pathname === '/dev-panel';

  const {
    isAddingIssue,
    setIsAddingIssue,
    newIssue,
    handleAddIssue,
    updateIssue,
  } = useIssueCreation();

  return (
    <div className="flex items-center gap-4">
      {isDevPanel ? (
        <Button variant="outline" asChild>
          <Link href="/">
            <Globe className="mr-2 h-4 w-4" />
            Ver QA Dashboard
          </Link>
        </Button>
      ) : (
        <Button variant="outline" asChild>
          <Link href="/dev-panel">
            <Code className="mr-2 h-4 w-4" />
            Ver Panel Dev
          </Link>
        </Button>
      )}

      <CreateIssueDialog
        isOpen={isAddingIssue}
        onOpenChange={setIsAddingIssue}
        newIssue={newIssue}
        onAddIssue={handleAddIssue}
        onUpdateIssue={updateIssue}
        trigger={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Issue
          </Button>
        }
      />

      <ThemeToggle />
      <UserNav user={user} />
    </div>
  );
}
