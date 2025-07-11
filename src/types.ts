export interface TestResult {
  status: string
  note?: string
  tester?: string
  date?: string
}

export interface Issue {
  id: number
  description: string
  priority?: 'high' | 'medium' | 'low'
  assignedTo?: string
  createdAt?: Date
  lastUpdated?: Date
  sectionId?: string
  section?: string
  tests: Record<string, TestResult>
  status?: 'open' | 'in-progress' | 'resolved'
  qaEvidence?: any[]
  builds?: any[]
  deployments?: any[]
  comments?: any[]
}

export interface IssueSection {
  id: string
  name: string
  issues: Issue[]
}

export interface User {
  id: string
  name: string
  email: string
  role: 'developer' | 'qa' | 'admin'
  avatar?: string
  notifications?: number
}

// Prisma enum conversion
export enum Role {
  ADMIN = 'ADMIN',
  QA = 'QA', 
  DEVELOPER = 'DEVELOPER'
}
