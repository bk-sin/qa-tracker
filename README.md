# QA Tracker - Monorepo

Una aplicación completa de seguimiento de QA con frontend en Next.js y backend en NestJS.

## 🏗️ Estructura del Proyecto

```
qa-tracker/
├── packages/
│   ├── frontend/          # Next.js App (React + TypeScript)
│   └── backend/           # NestJS API (Node.js + TypeScript)
├── package.json           # Configuración del monorepo
├── pnpm-workspace.yaml    # Configuración de workspaces
└── README.md
```

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Instalación

```bash
# Instalar dependencias de todo el monorepo
pnpm install

# O usar el script configurado
pnpm run install-deps
```

### Desarrollo

```bash
# Ejecutar ambos proyectos en paralelo
pnpm run dev

# O ejecutar individualmente
pnpm run dev:frontend    # Solo frontend
pnpm run dev:backend     # Solo backend
```

### Construcción

```bash
# Construir ambos proyectos
pnpm run build

# O construir individualmente
pnpm run build:frontend
pnpm run build:backend
```

### Producción

```bash
# Iniciar ambos proyectos en producción
pnpm run start

# O iniciar individualmente
pnpm run start:frontend
pnpm run start:backend
```

## 📦 Packages

### Frontend (@qa-tracker/frontend)

- **Framework**: Next.js 15
- **Lenguaje**: TypeScript
- **UI**: React + Tailwind CSS + Radix UI
- **Estado**: React Query + tRPC
- **Puerto**: 3000

### Backend (@qa-tracker/backend)

- **Framework**: NestJS
- **Lenguaje**: TypeScript
- **Base de datos**: Firebase/Firestore
- **API**: REST + tRPC
- **Puerto**: 3000

## 🛠️ Scripts Disponibles

### Monorepo

- `pnpm run dev` - Desarrollo en paralelo
- `pnpm run build` - Construcción completa
- `pnpm run start` - Producción completa
- `pnpm run lint` - Linting en todos los packages
- `pnpm run lint:fix` - Fix automático de linting
- `pnpm run test` - Tests en todos los packages
- `pnpm run clean` - Limpiar archivos de build
- `pnpm run type-check` - Verificación de tipos

### Por Package

- `pnpm run dev:frontend` / `pnpm run dev:backend`
- `pnpm run build:frontend` / `pnpm run build:backend`
- `pnpm run start:frontend` / `pnpm run start:backend`

## 🔧 Configuración

### Variables de Entorno

#### Backend

Crear `packages/backend/.env`:

```env
# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com

# Server
PORT=3001
NODE_ENV=development
```

#### Frontend

Crear `packages/frontend/.env.local`:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📁 Arquitectura

### Backend (NestJS)

```
src/
├── app.module.ts              # Módulo principal
├── firebase.module.ts         # Módulo global de Firebase
├── firebase.service.ts        # Servicio central de Firebase
├── users/                     # Feature de usuarios
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── user.entity.ts
│   └── dto/
├── test-cases/               # Feature de casos de prueba
│   └── ...
├── bug-reports/              # Feature de reportes de bugs
│   └── ...
└── trpc/                     # Configuración tRPC
```

### Frontend (Next.js)

```
src/
├── app/                      # App Router
├── components/               # Componentes reutilizables
│   ├── ui/                  # Componentes base
│   ├── navbar/              # Navegación
│   └── user-menu/           # Menú de usuario
├── lib/                     # Utilidades
├── types/                   # Tipos TypeScript
└── mocks/                   # Datos de prueba
```

## 🧪 Testing

```bash
# Tests en todos los packages
pnpm run test

# Tests con coverage
pnpm run test:cov

# Tests en modo watch
pnpm run test:watch
```

## 🎯 Features Implementadas

### ✅ Backend

- [x] Arquitectura modular con NestJS
- [x] CRUD completo para Users, Test Cases y Bug Reports
- [x] Integración con Firebase/Firestore
- [x] Validación de datos con class-validator
- [x] Tipos TypeScript fuertes
- [x] API REST completa
- [x] Configuración tRPC preparada

### ✅ Frontend

- [x] Interfaz moderna con Next.js 15
- [x] Sistema de temas (light/dark)
- [x] Componentes reutilizables con Radix UI
- [x] Integración con tRPC preparada
- [x] TypeScript configurado
- [x] ESLint y Prettier configurados

## 🚀 Próximos Pasos

- [ ] Conectar frontend con backend vía tRPC
- [ ] Implementar autenticación
- [ ] Agregar tests automatizados
- [ ] Configurar CI/CD
- [ ] Dockerizar aplicaciones
- [ ] Agregar documentación de API

## 📝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.
