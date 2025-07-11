import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import TestStatus from './test-status';

interface IssueCardProps {
  issue: {
    id: number;
    description: string;
    tests: Record<
      string,
      {
        status: string;
        note?: string;
        tester?: string;
        date?: string;
      }
    >;
  };
}

export default function IssueCard({ issue }: IssueCardProps) {
  return (
    <Card
      className="cursor-pointer border-l-4 border-l-blue-500 py-0 transition-shadow hover:shadow-md dark:border-l-blue-400"
      onClick={() => (window.location.href = `/issue/${issue.id}`)}
    >
      <CardContent className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-foreground mb-1 font-medium">
              Issue #{issue.id}
            </h4>
            <p className="text-muted-foreground text-sm">{issue.description}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={`/issue/${issue.id}`}>
              <Eye className="mr-1 h-4 w-4" />
              Ver Detalle
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
          {Object.entries(issue.tests).map(([testName, testResult]) => (
            <TestStatus
              key={testName}
              testName={testName}
              status={testResult}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
