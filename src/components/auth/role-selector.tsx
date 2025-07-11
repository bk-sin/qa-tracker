'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  AlertCircle,
  CheckCircle2,
  Code,
  Loader2,
  TestTube,
  Users,
} from 'lucide-react';

const roles = [
  {
    id: 'qa',
    label: 'QA Tester',
    description: 'Pruebas, reportes de bugs y validación de calidad',
    icon: TestTube,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
  },
  {
    id: 'developer',
    label: 'Developer',
    description: 'Desarrollo, resolución de bugs y deployment',
    icon: Code,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
  },
  {
    id: 'pm',
    label: 'Project Manager',
    description: 'Gestión de proyectos y coordinación de equipos',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
  },
];

interface RoleSelectorProps {
  selectedRole: string | null;
  onRoleSelect: (role: string) => void;
  error?: string;
  isLoading?: boolean;
}

export function RoleSelector({
  selectedRole,
  onRoleSelect,
  error,
  isLoading = false,
}: RoleSelectorProps) {
  return (
    <div className="space-y-4">
      <RadioGroup value={selectedRole || ''} onValueChange={onRoleSelect}>
        {roles.map(role => {
          const Icon = role.icon;
          return (
            <div key={role.id} className="relative">
              <RadioGroupItem
                value={role.id}
                id={role.id}
                className="peer sr-only"
              />
              <Label
                htmlFor={role.id}
                className={`flex cursor-pointer items-start space-x-3 rounded-lg border-2 p-4 transition-all hover:bg-gray-50 ${
                  selectedRole === role.id
                    ? `${role.bgColor} border-current ${role.color}`
                    : 'border-gray-200'
                }`}
              >
                <div
                  className={`h-10 w-10 flex-shrink-0 rounded-full ${role.bgColor} flex items-center justify-center`}
                >
                  <Icon className={`h-5 w-5 ${role.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{role.label}</h3>
                    {selectedRole === role.id && (
                      <CheckCircle2 className={`h-5 w-5 ${role.color}`} />
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {role.description}
                  </p>
                </div>
              </Label>
            </div>
          );
        })}
      </RadioGroup>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
