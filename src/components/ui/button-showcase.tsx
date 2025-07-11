'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertTriangle,
  CheckCircle,
  Download,
  Edit,
  Eye,
  Info,
  Plus,
  Save,
  Settings,
  Trash2,
  X,
} from 'lucide-react';

export function ButtonShowcase() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Button Variants Showcase</h1>

      {}
      <Card>
        <CardHeader>
          <CardTitle>Primary Variants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="default">Default</Button>
            <Button variant="default" size="sm">
              Small
            </Button>
            <Button variant="default" size="lg">
              Large
            </Button>
            <Button variant="default" size="xl">
              Extra Large
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="default">
              <Plus className="mr-2 h-4 w-4" />
              With Icon
            </Button>
            <Button variant="default" disabled>
              Disabled
            </Button>
          </div>
        </CardContent>
      </Card>

      {}
      <Card>
        <CardHeader>
          <CardTitle>Semantic Variants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="success">
              <CheckCircle className="mr-2 h-4 w-4" />
              Success
            </Button>
            <Button variant="warning">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Warning
            </Button>
            <Button variant="info">
              <Info className="mr-2 h-4 w-4" />
              Info
            </Button>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Destructive
            </Button>
          </div>
        </CardContent>
      </Card>

      {}
      <Card>
        <CardHeader>
          <CardTitle>Outline Variants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Outline
            </Button>
            <Button variant="outline-success">
              <CheckCircle className="mr-2 h-4 w-4" />
              Success Outline
            </Button>
            <Button variant="outline-destructive">
              <X className="mr-2 h-4 w-4" />
              Destructive Outline
            </Button>
          </div>
        </CardContent>
      </Card>

      {}
      <Card>
        <CardHeader>
          <CardTitle>Ghost & Link Variants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost">
              <Settings className="mr-2 h-4 w-4" />
              Ghost
            </Button>
            <Button variant="ghost-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Ghost Destructive
            </Button>
            <Button variant="secondary">
              <Edit className="mr-2 h-4 w-4" />
              Secondary
            </Button>
            <Button variant="link">Link Style</Button>
          </div>
        </CardContent>
      </Card>

      {}
      <Card>
        <CardHeader>
          <CardTitle>Icon-Only Buttons</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="default" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="default" size="icon-sm">
              <Save className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="icon-lg">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {}
      <Card>
        <CardHeader>
          <CardTitle>Common Usage Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Form Actions</h4>
            <div className="flex gap-2">
              <Button variant="default">
                <Save className="mr-2 h-4 w-4" />
                Guardar
              </Button>
              <Button variant="outline">Cancelar</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Danger Actions</h4>
            <div className="flex gap-2">
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
              <Button variant="outline-destructive">
                <X className="mr-2 h-4 w-4" />
                Cancelar Acción
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Success Actions</h4>
            <div className="flex gap-2">
              <Button variant="success">
                <CheckCircle className="mr-2 h-4 w-4" />
                Aprobar
              </Button>
              <Button variant="outline-success">
                <CheckCircle className="mr-2 h-4 w-4" />
                Marcar Completo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
