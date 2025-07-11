import { qaData } from '@/mocks/qa-data';
import StatCard from './stat-card';

export default function DashboardStats() {
  const totalIssues = qaData.sections.reduce(
    (acc, section) => acc + section.issues.length,
    0
  );

  const resolvedIssues = qaData.sections.reduce((acc, section) => {
    return (
      acc +
      section.issues.filter(issue =>
        Object.values(issue.tests).every(test => test.status === 'resolved')
      ).length
    );
  }, 0);

  const pendingIssues = totalIssues - resolvedIssues;
  const progressPercentage = Math.round((resolvedIssues / totalIssues) * 100);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <StatCard title="Total Issues" value={totalIssues} />

      <StatCard
        title="Resueltos"
        value={resolvedIssues}
        className="text-green-600 dark:text-green-400"
      />

      <StatCard
        title="Pendientes"
        value={pendingIssues}
        className="text-red-600 dark:text-red-400"
      />

      <StatCard
        title="Progreso"
        value={`${progressPercentage}%`}
        showProgress={true}
        progressValue={(resolvedIssues / totalIssues) * 100}
      />
    </div>
  );
}
