import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Build, BuildForm } from '@/types/dev-panel';
import { Download, Smartphone, Upload } from 'lucide-react';

interface BuildsSectionProps {
  builds: Build[];
  isUploadingBuild: boolean;
  setIsUploadingBuild: (value: boolean) => void;
  buildForm: BuildForm;
  setBuildForm: (form: BuildForm) => void;
  onUploadBuild: () => void;
}

export function BuildsSection({
  builds,
  isUploadingBuild,
  setIsUploadingBuild,
  buildForm,
  setBuildForm,
  onUploadBuild,
}: BuildsSectionProps) {
  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = buildForm.platform === 'android' ? '.apk' : '.ipa';
    input.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) setBuildForm({ ...buildForm, file });
    };
    input.click();
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h4 className="flex items-center gap-2 font-medium">
          <Smartphone className="h-4 w-4" />
          Builds Disponibles
        </h4>
        <Dialog open={isUploadingBuild} onOpenChange={setIsUploadingBuild}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Subir Build
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Subir Nuevo Build</DialogTitle>
              <DialogDescription>
                Sube un APK o IPA para que QA pueda probar los cambios
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Versión</Label>
                  <Input
                    placeholder="1.2.3"
                    value={buildForm.version}
                    onChange={e =>
                      setBuildForm({
                        ...buildForm,
                        version: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Plataforma</Label>
                  <Select
                    value={buildForm.platform}
                    onValueChange={value =>
                      setBuildForm({
                        ...buildForm,
                        platform: value as 'android' | 'ios',
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="android">Android (APK)</SelectItem>
                      <SelectItem value="ios">iOS (IPA)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Archivo</Label>
                <div
                  className="border-border hover:border-muted-foreground cursor-pointer rounded-lg border-2 border-dashed p-4 text-center"
                  onClick={handleFileSelect}
                >
                  {buildForm.file ? (
                    <div className="flex items-center justify-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      <span>{buildForm.file.name}</span>
                    </div>
                  ) : (
                    <div>
                      <Upload className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                      <p>
                        Selecciona archivo{' '}
                        {buildForm.platform === 'android' ? 'APK' : 'IPA'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Notas del Build</Label>
                <Textarea
                  placeholder="Describe los cambios incluidos en este build..."
                  value={buildForm.notes}
                  onChange={e =>
                    setBuildForm({
                      ...buildForm,
                      notes: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsUploadingBuild(false)}
              >
                Cancelar
              </Button>
              <Button onClick={onUploadBuild}>
                <Upload className="mr-2 h-4 w-4" />
                Subir Build
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {builds.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {builds.map((build, index) => (
            <div
              key={index}
              className="rounded-lg border bg-blue-50 p-3 dark:bg-blue-900/20"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">v{build.version}</span>
                  <Badge variant="outline" className="text-xs">
                    {build.platform === 'android' ? 'Android' : 'iOS'}
                  </Badge>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="mr-1 h-3 w-3" />
                  Descargar
                </Button>
              </div>
              <p className="text-muted-foreground mb-1 text-xs">
                Build para pruebas de QA
              </p>
              <p className="text-muted-foreground mb-1 text-sm">
                {build.notes}
              </p>
              <p className="text-muted-foreground text-xs">
                Subido: {build.uploadedAt}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-muted text-muted-foreground rounded-lg py-4 text-center">
          No hay builds disponibles para este issue
        </div>
      )}
    </div>
  );
}
