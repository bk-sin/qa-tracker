import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DevPanelPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Panel de Desarrollo</h1>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Panel de Desarrollo - QA Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Esta sección está en desarrollo. Aquí podrás gestionar:
              </p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-sm text-gray-600">
                <li>Issues y reportes de bugs</li>
                <li>Builds y deployments</li>
                <li>Comunicación con QA</li>
                <li>Evidencias y resultados de pruebas</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
