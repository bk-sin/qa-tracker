import { supabase } from '@/lib/supabase';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  role: Role;
  department?: string;
  phone?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export class AuthService {
  // Registrar nuevo usuario
  static async signUp(data: SignUpData) {
    try {
      // 1. Crear usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            role: data.role,
          }
        }
      });

      if (authError) {
        throw new Error(`Error de autenticación: ${authError.message}`);
      }

      if (!authData.user) {
        throw new Error('No se pudo crear el usuario');
      }

      // 2. Crear perfil de usuario en nuestra base de datos
      const user = await prisma.user.create({
        data: {
          id: authData.user.id,
          email: data.email,
          name: data.name,
          role: data.role,
          department: data.department,
          phone: data.phone,
        }
      });

      return {
        user: authData.user,
        profile: user,
        session: authData.session
      };
    } catch (error) {
      console.error('Error en signUp:', error);
      throw error;
    }
  }

  // Iniciar sesión
  static async signIn(data: SignInData) {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw new Error(`Error de inicio de sesión: ${error.message}`);
      }

      if (!authData.user) {
        throw new Error('Credenciales inválidas');
      }

      // Obtener perfil del usuario desde nuestra base de datos
      const profile = await prisma.user.findUnique({
        where: { id: authData.user.id }
      });

      return {
        user: authData.user,
        profile,
        session: authData.session
      };
    } catch (error) {
      console.error('Error en signIn:', error);
      throw error;
    }
  }

  // Cerrar sesión
  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(`Error al cerrar sesión: ${error.message}`);
    }
  }

  // Obtener usuario actual
  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        return null;
      }

      // Obtener perfil completo
      const profile = await prisma.user.findUnique({
        where: { id: user.id }
      });

      return {
        user,
        profile
      };
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error);
      return null;
    }
  }

  // OAuth con proveedores
  static async signInWithProvider(provider: 'google' | 'github') {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      throw new Error(`Error con ${provider}: ${error.message}`);
    }

    return data;
  }
}
