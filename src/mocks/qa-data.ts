import { Issue, TestResult } from '@/types'

export const qaData = {
  sections: [
    {
      id: '1',
      name: 'Authentication',
      issues: [
        {
          id: 1,
          description: 'Login form validation not working properly',
          priority: 'high' as const,
          assignedTo: 'John Doe',
          createdAt: new Date('2024-01-15'),
          lastUpdated: new Date('2024-01-16'),
          sectionId: '1',
          tests: {
            test1: {
              status: 'pending' as const,
              note: 'Need to verify email validation',
              tester: 'Alice Smith',
              date: '2024-01-16',
            },
            test2: {
              status: 'resolved' as const,
              note: 'Password validation working correctly',
              tester: 'Bob Johnson',
              date: '2024-01-15',
            },
          },
        },
      ],
    },
    {
      id: '2',
      name: 'Dashboard',
      issues: [
        {
          id: 2,
          description: 'Charts not rendering on mobile devices',
          priority: 'medium' as const,
          assignedTo: 'Jane Smith',
          createdAt: new Date('2024-01-14'),
          lastUpdated: new Date('2024-01-16'),
          sectionId: '2',
          tests: {
            test1: {
              status: 'resolved' as const,
              note: 'Charts working on latest mobile browsers',
              tester: 'Charlie Brown',
              date: '2024-01-16',
            },
          },
        },
      ],
    },
  ],
  developers: [
    { id: 'john.doe', name: 'John Doe' },
    { id: 'jane.smith', name: 'Jane Smith' },
    { id: 'bob.wilson', name: 'Bob Wilson' }
  ]
}

export const sections = qaData.sections.map(section => section.name)

export const priorities = ['low', 'medium', 'high']
