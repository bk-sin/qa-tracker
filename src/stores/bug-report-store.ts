import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// Define types for now, they'll be replaced by Prisma types after install
type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
type BugStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED' | 'REOPENED'
type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

interface BugReport {
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

interface BugReportFilters {
  status?: BugStatus
  severity?: Severity
  priority?: Priority
  assignedTo?: string
  reportedBy?: string
  search?: string
}

interface BugReportStore {
  bugReports: BugReport[]
  loading: boolean
  error: string | null
  filters: BugReportFilters
  
  // Actions
  setBugReports: (bugReports: BugReport[]) => void
  addBugReport: (bugReport: BugReport) => void
  updateBugReport: (id: string, updates: Partial<BugReport>) => void
  deleteBugReport: (id: string) => void
  setFilters: (filters: Partial<BugReportFilters>) => void
  clearFilters: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // Async actions
  fetchBugReports: () => Promise<void>
  createBugReport: (data: Omit<BugReport, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
}

export const useBugReportStore = create<BugReportStore>()(
  devtools(
    (set, get) => ({
      bugReports: [],
      loading: false,
      error: null,
      filters: {},

      setBugReports: (bugReports) => set({ bugReports }),
      
      addBugReport: (bugReport) =>
        set((state) => ({
          bugReports: [...state.bugReports, bugReport],
        })),
      
      updateBugReport: (id, updates) =>
        set((state) => ({
          bugReports: state.bugReports.map((report) =>
            report.id === id ? { ...report, ...updates } : report
          ),
        })),
      
      deleteBugReport: (id) =>
        set((state) => ({
          bugReports: state.bugReports.filter((report) => report.id !== id),
        })),
      
      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),
      
      clearFilters: () => set({ filters: {} }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),

      fetchBugReports: async () => {
        try {
          set({ loading: true, error: null })
          const response = await fetch('/api/bug-reports')
          if (!response.ok) throw new Error('Failed to fetch bug reports')
          const bugReports = await response.json()
          set({ bugReports, loading: false })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Unknown error',
            loading: false 
          })
        }
      },

      createBugReport: async (data) => {
        try {
          set({ loading: true, error: null })
          const response = await fetch('/api/bug-reports', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
          if (!response.ok) throw new Error('Failed to create bug report')
          const newBugReport = await response.json()
          get().addBugReport(newBugReport)
          set({ loading: false })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Unknown error',
            loading: false 
          })
        }
      },
    }),
    { name: 'bug-report-store' }
  )
)
