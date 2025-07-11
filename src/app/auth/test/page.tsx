'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { User, UserPlus, LogIn, AlertCircle, CheckCircle } from 'lucide-react';
import { Role } from '@prisma/client';

export default function AuthTestPage() {
  // Estados para registro
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    name: '',
    role: '' as Role | '',
    department: '',
    phone: ''
  });

  // Estados para login
  const [signInForm, setSignInForm] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [users, setUsers] = useState<any[]>([]);

  // Manejar registro
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signUpForm)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el registro');
      }

      setMessage({ type: 'success', text: 'Usuario creado exitosamente!' });
      setSignUpForm({
        email: '',
        password: '',
        name: '',
        role: '',
        department: '',
        phone: ''
      });
      
      // Recargar lista de usuarios
      fetchUsers();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar login
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signInForm)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el login');
      }

      setMessage({ type: 'success', text: 'Inicio de sesión exitoso!' });
      setSignInForm({ email: '', password: '' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // Obtener usuarios
  const fetchUsers = async () => {
    try {
      console.log('🔄 Fetching users...');
      const response = await fetch('/api/users');
      const data = await response.json();
      console.log('📊 Users response:', data);
      
      if (data.data) {
        setUsers(data.data);
        console.log(`✅ Loaded ${data.data.length} users`);
      } else {
        console.log('⚠️ No data.data in response');
        setUsers([]);
      }
    } catch (error) {
      console.error('❌ Error fetching users:', error);
      setUsers([]);
    }
  };

  // Cargar usuarios al inicio
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">🧪 Pruebas de Autenticación</h1>
          <p className="text-gray-600">Prueba la creación e inicio de sesión de usuarios con Supabase</p>
        </div>

        {message && (
          <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
            {message.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Formulario de Registro */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Crear Usuario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Label htmlFor="signup-name">Nombre</Label>
                  <Input
                    id="signup-name"
                    value={signUpForm.name}
                    onChange={(e) => setSignUpForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Juan Pérez"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signUpForm.email}
                    onChange={(e) => setSignUpForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="juan@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="signup-password">Contraseña</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signUpForm.password}
                    onChange={(e) => setSignUpForm(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="signup-role">Rol</Label>
                  <Select value={signUpForm.role} onValueChange={(value) => setSignUpForm(prev => ({ ...prev, role: value as Role }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Administrador</SelectItem>
                      <SelectItem value="PROJECT_MANAGER">Project Manager</SelectItem>
                      <SelectItem value="DEVELOPER">Desarrollador</SelectItem>
                      <SelectItem value="TESTER">QA Tester</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="signup-department">Departamento (Opcional)</Label>
                  <Input
                    id="signup-department"
                    value={signUpForm.department}
                    onChange={(e) => setSignUpForm(prev => ({ ...prev, department: e.target.value }))}
                    placeholder="Desarrollo, QA, etc."
                  />
                </div>

                <div>
                  <Label htmlFor="signup-phone">Teléfono (Opcional)</Label>
                  <Input
                    id="signup-phone"
                    value={signUpForm.phone}
                    onChange={(e) => setSignUpForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1234567890"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creando...' : 'Crear Usuario'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Formulario de Login */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogIn className="h-5 w-5" />
                Iniciar Sesión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={signInForm.email}
                    onChange={(e) => setSignInForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="juan@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="signin-password">Contraseña</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={signInForm.password}
                    onChange={(e) => setSignInForm(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Tu contraseña"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Usuarios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Usuarios Registrados
              <Button onClick={fetchUsers} variant="outline" size="sm">
                Recargar
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No hay usuarios registrados</p>
            ) : (
              <div className="space-y-2">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <p className="text-xs text-gray-400">Rol: {user.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">
                        Creado: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                      {user.department && (
                        <p className="text-xs text-gray-400">Depto: {user.department}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
