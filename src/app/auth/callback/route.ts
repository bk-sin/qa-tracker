import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Este endpoint manejará las redirecciones de OAuth
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    // Aquí manejarías el código de OAuth de Supabase
    // Por ahora, simplemente redirigimos al dashboard
    return NextResponse.redirect(`${origin}/`);
  }

  // Si no hay código, redirigir al login
  return NextResponse.redirect(`${origin}/auth/login`);
}
