import { IssueForm } from '@/components/navbar/components/issue-form';
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
import { NewIssue } from '@/types/issue';
import { ReactNode } from 'react';

interface AddIssueDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newIssue: NewIssue;
  onAddIssue: () => void;
  onUpdateIssue: (field: keyof NewIssue, value: string) => void;
  trigger: ReactNode;
}

export function CreateIssueDialog({
  isOpen,
  onOpenChange,
  newIssue,
  onAddIssue,
  onUpdateIssue,
  trigger,
}: AddIssueDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Issue</DialogTitle>
          <DialogDescription>
            Completa la información del nuevo issue encontrado.
          </DialogDescription>
        </DialogHeader>
        <IssueForm newIssue={newIssue} onUpdateIssue={onUpdateIssue} />
        <DialogFooter>
          <Button type="submit" onClick={onAddIssue}>
            Crear Issue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
