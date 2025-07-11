import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validación básica
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y password son requeridos' },
        { status: 400 }
      );
    }

    // Iniciar sesión
    const result = await AuthService.signIn({
      email,
      password
    });

    return NextResponse.json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: result.user.id,
        email: result.user.email,
        profile: result.profile
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 401 }
    );
  }
}
