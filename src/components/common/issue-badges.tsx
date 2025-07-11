import { Badge } from '@/components/ui/badge';
import { Issue } from '@/types/issue';
import { AlertTriangle, Check, CheckCircle2, Clock, X } from 'lucide-react';

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'ready-for-testing':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'resolved':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'failed':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    case 'not-tested':
      return 'border-border bg-background text-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'ready-for-testing':
      return 'Listo para Testing';
    case 'in-progress':
      return 'En Progreso';
    case 'pending':
      return 'Pendiente';
    case 'resolved':
      return 'Resuelto';
    case 'failed':
      return 'Fallido';
    case 'not-tested':
      return 'No probado';
    default:
      return 'Desconocido';
  }
};

export const getStatusIcon = (status: string, iconSize: 'sm' | 'md' = 'md') => {
  const sizeClass = iconSize === 'sm' ? 'h-3 w-3' : 'h-4 w-4';

  switch (status) {
    case 'ready-for-testing':
      return (
        <CheckCircle2
          className={`${sizeClass} text-green-500 dark:text-green-400`}
        />
      );
    case 'in-progress':
      return (
        <Clock className={`${sizeClass} text-blue-500 dark:text-blue-400`} />
      );
    case 'pending':
      return (
        <AlertTriangle
          className={`${sizeClass} text-yellow-500 dark:text-yellow-400`}
        />
      );
    case 'resolved':
      return (
        <Check className={`${sizeClass} text-green-500 dark:text-green-400`} />
      );
    case 'failed':
      return <X className={`${sizeClass} text-red-500 dark:text-red-400`} />;
    case 'not-tested':
      return <Clock className={`text-muted-foreground ${sizeClass}`} />;
    default:
      return <Clock className={`text-muted-foreground ${sizeClass}`} />;
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const getPriorityText = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'Alta';
    case 'medium':
      return 'Media';
    case 'low':
      return 'Baja';
    default:
      return 'Desconocida';
  }
};

interface IssueBadgesProps {
  priority?: Issue['priority'];
  status: string;
  showPriority?: boolean;
  showStatus?: boolean;
  showStatusIcon?: boolean;
  size?: 'sm' | 'md';
  iconSize?: 'sm' | 'md';
}

export function IssueBadges({
  priority,
  status,
  showPriority = true,
  showStatus = true,
  showStatusIcon = true,
  size = 'md',
  iconSize = 'md',
}: IssueBadgesProps) {
  const badgeSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className="flex items-center gap-2">
      {showPriority && priority && (
        <Badge className={`${getPriorityColor(priority)} ${badgeSize}`}>
          {getPriorityText(priority)}
        </Badge>
      )}
      {showStatus && (
        <Badge className={`${getStatusColor(status)} ${badgeSize}`}>
          {showStatusIcon && getStatusIcon(status, iconSize)}
          <span className={showStatusIcon ? 'ml-1' : ''}>
            {getStatusText(status)}
          </span>
        </Badge>
      )}
    </div>
  );
}
