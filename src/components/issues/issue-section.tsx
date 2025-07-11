import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import IssueCard from './issue-card';

interface IssueSectionProps {
  section: {
    id: string;
    name: string;
    issues: Array<{
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
    }>;
  };
}

export default function IssueSection({ section }: IssueSectionProps) {
  return (
    <Card key={section.id}>
      <CardHeader>
        <CardTitle className="text-lg">{section.name}</CardTitle>
        <CardDescription>
          {section.issues.length} issue{section.issues.length !== 1 ? 's' : ''}{' '}
          en esta sección
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {section.issues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
