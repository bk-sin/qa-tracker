import { DashboardStats } from '@/components/dashboard'
import { IssueFilters } from '@/components/filters'
import { IssuesList } from '@/components/issues'

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <DashboardStats />
      <IssueFilters />
      <IssuesList />
    </div>
  )
}
