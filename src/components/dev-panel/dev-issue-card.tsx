import { IssueBadges } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BuildForm, DeploymentForm, Issue } from '@/types/dev-panel';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import { BuildsSection } from './builds-section';
import { DeploymentsSection } from './deployments-section';
import { QACommunicationSection } from './qa-communication-section';
import { QAEvidenceSection } from './qa-evidence-section';

interface IssueCardProps {
  issue: Issue;
  onStatusChange: (issueId: string, newStatus: string) => void;
}

export function DevIssueCard({ issue, onStatusChange }: IssueCardProps) {
  const [isUploadingBuild, setIsUploadingBuild] = useState(false);
  const [isNotifyingDeployment, setIsNotifyingDeployment] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [buildForm, setBuildForm] = useState<BuildForm>({
    version: '',
    platform: 'android',
    notes: '',
    file: null,
    branch: '',
  });
  const [deploymentForm, setDeploymentForm] = useState<DeploymentForm>({
    environment: 'staging',
    url: '',
    notes: '',
    version: '',
  });

  const handleUploadBuild = () => {
    setIsUploadingBuild(false);
    setBuildForm({ version: '', platform: 'android', notes: '', file: null, branch: '' });
  };

  const handleNotifyDeployment = () => {
    setIsNotifyingDeployment(false);
    setDeploymentForm({ environment: 'staging', url: '', notes: '', version: '' });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setNewComment('');
  };

  return (
    <Card className="border-l-4 border-l-purple-500 transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <h3 className="font-semibold">
                Issue #{issue.id} - {issue.section}
              </h3>
              <IssueBadges priority={issue.priority} status={issue.status} />
            </div>
            <p className="text-muted-foreground mb-3">{issue.description}</p>
            <div className="text-muted-foreground flex items-center gap-4 text-sm">               <span>Creado: {issue.createdAt?.toLocaleDateString()}</span>
               <span>Actualizado: {issue.lastUpdated?.toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <a href={`/issue/${issue.id}`}>
                <Eye className="mr-1 h-4 w-4" />
                Ver Detalle
              </a>
            </Button>
            <Select
              value={issue.status}               onValueChange={value => onStatusChange(issue.id, value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="in-progress">En Progreso</SelectItem>
                <SelectItem value="ready-for-testing">
                  Listo para Testing
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <QAEvidenceSection evidence={issue.qaEvidence} />

        <BuildsSection
          builds={issue.builds}
          isUploadingBuild={isUploadingBuild}
          setIsUploadingBuild={setIsUploadingBuild}
          buildForm={buildForm}
          setBuildForm={setBuildForm}
          onUploadBuild={handleUploadBuild}
        />

        <DeploymentsSection
          deployments={issue.deployments}
          isNotifyingDeployment={isNotifyingDeployment}
          setIsNotifyingDeployment={setIsNotifyingDeployment}
          deploymentForm={deploymentForm}
          setDeploymentForm={setDeploymentForm}
          onNotifyDeployment={handleNotifyDeployment}
        />

        <QACommunicationSection
          comments={issue.comments}
          newComment={newComment}
          setNewComment={setNewComment}
          onAddComment={handleAddComment}
        />
      </CardContent>
    </Card>
  );
}
