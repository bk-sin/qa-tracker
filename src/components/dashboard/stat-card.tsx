import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  className?: string;
  showProgress?: boolean;
  progressValue?: number;
}

export default function StatCard({
  title,
  value,
  subtitle,
  className = '',
  showProgress = false,
  progressValue = 0,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {showProgress ? (
          <div className="space-y-2">
            <div className={`text-2xl font-bold ${className}`}>{value}</div>
            {subtitle && (
              <p className="text-muted-foreground text-sm">{subtitle}</p>
            )}
            <Progress value={progressValue} className="h-2" />
          </div>
        ) : (
          <div className="space-y-1">
            <div className={`text-2xl font-bold ${className}`}>{value}</div>
            {subtitle && (
              <p className="text-muted-foreground text-sm">{subtitle}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
