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
import { Deployment, DeploymentForm } from '@/types/dev-panel';
import { Globe, Zap } from 'lucide-react';

interface DeploymentsSectionProps {
  deployments: Deployment[];
  isNotifyingDeployment: boolean;
  setIsNotifyingDeployment: (value: boolean) => void;
  deploymentForm: DeploymentForm;
  setDeploymentForm: (form: DeploymentForm) => void;
  onNotifyDeployment: () => void;
}

export function DeploymentsSection({
  deployments,
  isNotifyingDeployment,
  setIsNotifyingDeployment,
  deploymentForm,
  setDeploymentForm,
  onNotifyDeployment,
}: DeploymentsSectionProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h4 className="flex items-center gap-2 font-medium">
          <Globe className="h-4 w-4" />
          Deployments
        </h4>
        <Dialog
          open={isNotifyingDeployment}
          onOpenChange={setIsNotifyingDeployment}
        >
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Zap className="mr-2 h-4 w-4" />
              Notificar Deploy
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notificar Deployment</DialogTitle>
              <DialogDescription>
                Informa a QA que los cambios están desplegados y listos para
                probar
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Ambiente</Label>
                <Select
                  value={deploymentForm.environment}
                  onValueChange={value =>
                    setDeploymentForm({
                      ...deploymentForm,
                      environment: value as
                        | 'staging'
                        | 'production'
                        | 'development',
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="production">Producción</SelectItem>
                    <SelectItem value="development">Desarrollo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>URL</Label>
                <Input
                  placeholder="https://staging.app.com"
                  value={deploymentForm.url}
                  onChange={e =>
                    setDeploymentForm({
                      ...deploymentForm,
                      url: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Notas</Label>
                <Textarea
                  placeholder="Información adicional sobre el deployment..."
                  value={deploymentForm.notes}
                  onChange={e =>
                    setDeploymentForm({
                      ...deploymentForm,
                      notes: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsNotifyingDeployment(false)}
              >
                Cancelar
              </Button>
              <Button onClick={onNotifyDeployment}>
                <Zap className="mr-2 h-4 w-4" />
                Notificar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {deployments.length > 0 ? (
        <div className="space-y-2">
          {deployments.map((deployment, index) => (
            <div
              key={index}
              className="rounded-lg border bg-green-50 p-3 dark:bg-green-900/20"
            >
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="font-medium capitalize">
                    {deployment.environment}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    Desplegado
                  </Badge>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <a
                    href={deployment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="mr-1 h-3 w-3" />
                    Abrir
                  </a>
                </Button>
              </div>
              <p className="text-muted-foreground mb-1 text-sm">
                {deployment.notes}
              </p>
              <p className="text-muted-foreground text-xs">
                Desplegado: {deployment.deployedAt}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-muted text-muted-foreground rounded-lg py-4 text-center">
          No hay deployments registrados
        </div>
      )}
    </div>
  );
}
