import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

interface NotificationButtonProps {
  notifications?: number;
}

export function NotificationButton({ notifications }: NotificationButtonProps) {
  if (!notifications || notifications <= 0) return null;

  return (
    <Button variant="outline" size="sm" className="relative bg-transparent">
      <Bell className="h-4 w-4" />
      <Badge className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center bg-red-500 p-0 text-xs">
        {notifications}
      </Badge>
    </Button>
  );
}
