import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma, Role } from '@prisma/client'

// GET /api/users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const role = searchParams.get('role')
    const isActive = searchParams.get('isActive')
    
    const skip = (page - 1) * pageSize
    
    const where: Prisma.UserWhereInput = {}
    
    if (role && Object.values(Role).includes(role as Role)) {
      where.role = role as Role
    }
    
    if (isActive !== null) {
      where.isActive = isActive === 'true'
    }
    
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ])
    
    return NextResponse.json({
      data: users,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST /api/users
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        role: body.role || 'TESTER',
        department: body.department,
        phone: body.phone,
      },
    })
    
    return NextResponse.json({ data: user }, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
