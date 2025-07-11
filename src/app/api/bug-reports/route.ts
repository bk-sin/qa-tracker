import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Schema for validation
const createBugReportSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  stepsToReproduce: z.array(z.string()).min(1, 'At least one step is required'),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
  projectId: z.string().min(1, 'Project ID is required'),
  reportedBy: z.string().min(1, 'Reporter ID is required'),
  assignedTo: z.string().optional(),
})

// GET /api/bug-reports
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const severity = searchParams.get('severity')
    const priority = searchParams.get('priority')
    const assignedTo = searchParams.get('assignedTo')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const where: any = {}
    
    if (status) where.status = status
    if (severity) where.severity = severity
    if (priority) where.priority = priority
    if (assignedTo) where.assignedTo = assignedTo
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [bugReports, total] = await Promise.all([
      prisma.bugReport.findMany({
        where,
        include: {
          reportedByUser: {
            select: { id: true, name: true, email: true }
          },
          assignedToUser: {
            select: { id: true, name: true, email: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.bugReport.count({ where }),
    ])

    return NextResponse.json({
      data: bugReports,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching bug reports:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/bug-reports
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createBugReportSchema.parse(body)

    const bugReport = await prisma.bugReport.create({
      data: {
        ...validatedData,
        severity: validatedData.severity || 'MEDIUM',
        priority: validatedData.priority || 'MEDIUM',
      },
      include: {
        reportedByUser: {
          select: { id: true, name: true, email: true }
        },
        assignedToUser: {
          select: { id: true, name: true, email: true }
        }
      },
    })

    return NextResponse.json(bugReport, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error creating bug report:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
