import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type React from 'react';
import { LoginForm } from './login-form';
import { OAuthSection } from './oauth-section';

interface LoginCardProps {
  onOAuthLogin: (provider: 'google' | 'github') => void;
  onEmailLogin: (e: React.FormEvent) => void;
  formData: {
    email: string;
    password: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  isLoading?: boolean;
}

export function LoginCard({
  onOAuthLogin,
  onEmailLogin,
  formData,
  onInputChange,
  error,
  isLoading = false,
}: LoginCardProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl">Iniciar Sesión</CardTitle>
        <CardDescription className="text-center">
          Elige tu método de autenticación preferido
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <OAuthSection onOAuthLogin={onOAuthLogin} isLoading={isLoading} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">
              O continúa con email
            </span>
          </div>
        </div>

        <LoginForm
          onSubmit={onEmailLogin}
          formData={formData}
          onInputChange={onInputChange}
          error={error}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}
