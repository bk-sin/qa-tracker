'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterCard } from '@/components/auth/register-card';
import { AuthHeader } from '@/components/auth/auth-header';

export default function RegisterPageClient() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    phone: '',
  });
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);

    // Validación básica
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setStep(2);
  };

  const handleRoleSelect = async (role: string) => {
    setSelectedRole(role);
    setIsLoading(true);

    try {
      // TODO: Implementar registro con Supabase
      console.log('Register attempt:', { ...formData, role });
      
      // Simulación de registro exitoso
      setTimeout(() => {
        router.push('/auth/login');
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Error al crear la cuenta');
      setIsLoading(false);
    }
  };

  const handleOAuthRegister = async (provider: 'google' | 'github') => {
    try {
      // TODO: Implementar OAuth con Supabase
      console.log('OAuth register:', provider);
    } catch (err) {
      setError('Error al registrarse con ' + provider);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <AuthHeader 
          title="Crear Cuenta"
          subtitle="Únete a QA Tracker"
        />
        <RegisterCard 
          step={step}
          onOAuthRegister={handleOAuthRegister}
          onStep1Submit={handleStep1Submit}
          onRoleSelect={handleRoleSelect}
          formData={formData}
          onInputChange={handleInputChange}
          selectedRole={selectedRole}
          error={error}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
