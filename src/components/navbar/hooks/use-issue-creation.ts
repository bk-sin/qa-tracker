'use client';

import { NewIssue } from '@/types/issue';
import { useState } from 'react';

export function useIssueCreation() {
  const [isAddingIssue, setIsAddingIssue] = useState(false);
  const [newIssue, setNewIssue] = useState<NewIssue>({
    section: '',
    description: '',
    priority: 'medium',
    assignedTo: '',
  });

  const handleAddIssue = () => {
    setIsAddingIssue(false);
    resetForm();
  };

  const resetForm = () => {
    setNewIssue({
      section: '',
      description: '',
      priority: 'medium',
      assignedTo: '',
    });
  };

  const updateIssue = (field: keyof NewIssue, value: string) => {
    setNewIssue((prev: NewIssue) => ({ ...prev, [field]: value }));
  };

  return {
    isAddingIssue,
    setIsAddingIssue,
    newIssue,
    setNewIssue,
    handleAddIssue,
    resetForm,
    updateIssue,
  };
}
