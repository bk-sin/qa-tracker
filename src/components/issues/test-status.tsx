import { IssueBadges, getStatusIcon } from '@/components/common';

interface TestStatusProps {
  status: {
    status: string;
    note?: string;
    tester?: string;
    date?: string;
  };
  testName: string;
}

export default function TestStatus({ status, testName }: TestStatusProps) {
  return (
    <div className="bg-muted/50 flex items-center justify-between rounded p-2">
      <span className="text-muted-foreground text-xs font-medium capitalize">
        {testName.replace('test', 'Test ')}
      </span>
      <div className="flex items-center gap-1">
        {getStatusIcon(status.status, 'sm')}
        <IssueBadges
          status={status.status}
          showPriority={false}
          showStatus={true}
          showStatusIcon={false}
          size="sm"
        />
      </div>
    </div>
  );
}
