export interface Build {
  id: string
  version: string
  platform: 'android' | 'ios'
  notes: string
  uploadedAt: string
  status: 'success' | 'failed' | 'pending'
  timestamp: Date
  branch: string
}

export interface BuildForm {
  version: string
  platform: 'android' | 'ios'
  notes: string
  file: File | null
  branch: string
}

export interface Deployment {
  id: string
  environment: 'staging' | 'production' | 'development'
  url: string
  notes: string
  deployedAt: string
  status: 'deployed' | 'failed' | 'pending'
  timestamp: Date
  version: string
}

export interface DeploymentForm {
  environment: 'staging' | 'production' | 'development'
  url: string
  notes: string
  version: string
}

export interface Comment {
  id: string
  author: string
  message: string
  content: string
  timestamp: Date
  attachments: string[]
}

export interface QAEvidence {
  id: string
  type: 'image' | 'video' | 'document'
  url: string
  name: string
  title: string
  description: string
  attachments: string[]
  timestamp: Date
}

export interface Issue {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  status: 'open' | 'in-progress' | 'resolved'
  assignedTo: string
  createdAt: Date
  lastUpdated: Date
  section: string
  qaEvidence: QAEvidence[]
  builds: Build[]
  deployments: Deployment[]
  comments: Comment[]
}
