import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { Role } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, role, department, phone } = body;

    // Validación básica
    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: email, password, name, role' },
        { status: 400 }
      );
    }

    // Validar que el rol sea válido
    if (!Object.values(Role).includes(role)) {
      return NextResponse.json(
        { error: 'Rol inválido' },
        { status: 400 }
      );
    }

    // Crear usuario
    const result = await AuthService.signUp({
      email,
      password,
      name,
      role: role as Role,
      department,
      phone
    });

    return NextResponse.json({
      message: 'Usuario creado exitosamente',
      user: {
        id: result.user.id,
        email: result.user.email,
        profile: result.profile
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
