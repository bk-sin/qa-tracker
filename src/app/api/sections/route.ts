import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

// GET /api/sections
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeIssues = searchParams.get('includeIssues') === 'true'
    
    const sections = await prisma.section.findMany({
      include: {
        issues: includeIssues ? {
          include: {
            testResults: {
              include: {
                testerUser: true,
              },
            },
          },
        } : false,
      },
      orderBy: { name: 'asc' },
    })
    
    return NextResponse.json({ data: sections })
  } catch (error) {
    console.error('Error fetching sections:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sections' },
      { status: 500 }
    )
  }
}

// POST /api/sections
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const section = await prisma.section.create({
      data: {
        name: body.name,
      },
    })
    
    return NextResponse.json({ data: section }, { status: 201 })
  } catch (error) {
    console.error('Error creating section:', error)
    return NextResponse.json(
      { error: 'Failed to create section' },
      { status: 500 }
    )
  }
}
