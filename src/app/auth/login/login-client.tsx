'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginCard } from '@/components/auth/login-card';
import { AuthHeader } from '@/components/auth/auth-header';

export default function LoginPageClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(undefined);

    try {
      // TODO: Implementar autenticación con Supabase
      console.log('Login attempt:', formData);
      
      // Simulación de login exitoso
      setTimeout(() => {
        router.push('/');
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    try {
      // TODO: Implementar OAuth con Supabase
      console.log('OAuth login:', provider);
    } catch (err) {
      setError('Error al iniciar sesión con ' + provider);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <AuthHeader 
          title="Iniciar Sesión"
          subtitle="Accede a tu cuenta de QA Tracker"
        />
        <LoginCard 
          onOAuthLogin={handleOAuthLogin}
          onEmailLogin={handleEmailLogin}
          formData={formData}
          onInputChange={handleInputChange}
          error={error}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
