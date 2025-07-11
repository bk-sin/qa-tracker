export interface NewIssue {
  section: string
  description: string
  priority: 'high' | 'medium' | 'low'
  assignedTo: string
}

// Re-export from main types
export type { Issue, TestResult } from '@/types'
