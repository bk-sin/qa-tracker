// Basic types for now - will be replaced with Prisma types after schema is generated
export type Role = 'ADMIN' | 'PROJECT_MANAGER' | 'TESTER' | 'DEVELOPER'
export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type BugStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED' | 'REOPENED'
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type TestCaseStatus = 'ACTIVE' | 'INACTIVE' | 'DEPRECATED'
export type IssuePriority = 'low' | 'medium' | 'high'
export type TestResultStatus = 'pending' | 'resolved'

// User types
export interface User {
  id: string
  email: string
  name?: string
  role: Role
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  profileImage?: string
  department?: string
  phone?: string
}

export interface BugReport {
  id: string
  title: string
  description: string
  stepsToReproduce: string[]
  severity: Severity
  status: BugStatus
  priority: Priority
  projectId: string
  reportedBy: string
  assignedTo?: string
  createdAt: Date
  updatedAt: Date
}

export interface TestCase {
  id: string
  title: string
  description?: string
  steps: string[]
  expected: string
  priority: Priority
  status: TestCaseStatus
  projectId: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface Section {
  id: string
  name: string
  issues: Issue[]
}

export interface Issue {
  id: number
  description: string
  priority: IssuePriority
  assignedTo: string
  createdAt: Date
  lastUpdated: Date
  sectionId: string
  tests: Record<string, TestResult>
}

export interface TestResult {
  id?: string
  status: TestResultStatus
  note: string
  tester: string
  date: Date
  testCaseId?: string
  issueId?: number
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Filter types
export interface BugReportFilters {
  severity?: Severity[]
  status?: BugStatus[]
  priority?: Priority[]
  assignedTo?: string[]
  reportedBy?: string[]
  projectId?: string
}

export interface TestCaseFilters {
  status?: TestCaseStatus[]
  priority?: Priority[]
  createdBy?: string[]
  projectId?: string
}

export interface IssueFilters {
  priority?: IssuePriority[]
  assignedTo?: string[]
  sectionId?: string[]
}

// Additional types for forms and API responses
export interface UserCreateInput {
  email: string
  name?: string
  role?: Role
  department?: string
  phone?: string
}

export interface UserUpdateInput {
  name?: string
  role?: Role
  isActive?: boolean
  profileImage?: string
  department?: string
  phone?: string
}

export interface BugReportCreateInput {
  title: string
  description: string
  stepsToReproduce: string[]
  severity?: Severity
  priority?: Priority
  projectId: string
  reportedBy: string
  assignedTo?: string
}

export interface BugReportUpdateInput {
  title?: string
  description?: string
  stepsToReproduce?: string[]
  severity?: Severity
  status?: BugStatus
  priority?: Priority
  assignedTo?: string
}

export interface TestCaseCreateInput {
  title: string
  description?: string
  steps: string[]
  expected: string
  priority?: Priority
  projectId: string
  createdBy: string
}

export interface TestCaseUpdateInput {
  title?: string
  description?: string
  steps?: string[]
  expected?: string
  priority?: Priority
  status?: TestCaseStatus
}

export interface SectionCreateInput {
  name: string
}

export interface IssueCreateInput {
  description: string
  priority: IssuePriority
  assignedTo: string
  sectionId: string
}

export interface IssueUpdateInput {
  description?: string
  priority?: IssuePriority
  assignedTo?: string
}

export interface TestResultCreateInput {
  status: TestResultStatus
  note: string
  tester: string
  testCaseId?: string
  issueId?: number
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Dashboard stats
export interface DashboardStats {
  totalBugReports: number
  openBugReports: number
  resolvedBugReports: number
  totalTestCases: number
  activeTestCases: number
  totalUsers: number
  criticalIssues: number
}
