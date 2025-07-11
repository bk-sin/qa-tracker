'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import type React from 'react';
import { OAuthSection } from './oauth-section';
import { RegisterForm } from './register-form';
import { RoleSelector } from './role-selector';
import { StepIndicator } from './step-indicator';

interface RegisterCardProps {
  step: number;
  onOAuthRegister: (provider: 'google' | 'github') => void;
  onStep1Submit: (e: React.FormEvent) => void;
  onRoleSelect: (role: string) => void;
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    department?: string;
    phone?: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedRole: string | null;
  error?: string;
  isLoading?: boolean;
}

export function RegisterCard({
  step,
  onOAuthRegister,
  onStep1Submit,
  onRoleSelect,
  formData,
  onInputChange,
  selectedRole,
  error,
  isLoading = false,
}: RegisterCardProps) {
  return (
    <>
      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl">
            {step === 1 ? 'Registro' : '¿Cuál es tu rol?'}
          </CardTitle>
          <CardDescription className="text-center">
            {step === 1
              ? 'Completa tus datos para comenzar'
              : 'Esto nos ayuda a personalizar tu experiencia'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 ? (
            <>
              <OAuthSection
                onOAuthLogin={onOAuthRegister}
                isLoading={isLoading}
                variant="register"
              />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background text-muted-foreground px-2">
                    O regístrate con email
                  </span>
                </div>
              </div>

              <RegisterForm
                onSubmit={onStep1Submit}
                formData={formData}
                onInputChange={onInputChange}
                error={error}
                isLoading={isLoading}
              />
            </>
          ) : (
            <RoleSelector
              selectedRole={selectedRole}
              onRoleSelect={onRoleSelect}
              error={error}
              isLoading={isLoading}
            />
          )}
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </div>

      <StepIndicator currentStep={step} totalSteps={2} />
    </>
  );
}
