export interface User {
  id: string;
  email: string;
  name?: string;
  role?: 'ADMIN' | 'PROJECT_MANAGER' | 'TESTER' | 'DEVELOPER';
  department?: string;
  phone?: string;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  name?: string;
  role?: User['role'];
  department?: string;
  phone?: string;
}

export interface UpdateUserInput extends Partial<CreateUserInput> {
  isActive?: boolean;
}

export interface HealthResponse {
  status: string;
  message: string;
}
