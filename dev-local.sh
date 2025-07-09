#!/bin/bash

# Script de desarrollo local para Linux/Mac
# Ejecuta frontend y backend en paralelo sin Docker

echo "🚀 Iniciando QA Tracker - Desarrollo Local"
echo "======================================="

# Verificar que estamos en la raíz del proyecto
if [ ! -f "pnpm-workspace.yaml" ]; then
    echo "❌ Error: Ejecuta este script desde la raíz del proyecto"
    exit 1
fi

# Verificar que pnpm esté instalado
if ! command -v pnpm &> /dev/null; then
    echo "❌ Error: pnpm no está instalado"
    echo "Instala pnpm con: npm install -g pnpm"
    exit 1
fi

PNPM_VERSION=$(pnpm --version)
echo "✅ pnpm detectado: v$PNPM_VERSION"

# Verificar que las dependencias estén instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    pnpm install
fi

echo ""
echo "🔧 Configuración:"
echo "   Backend:  http://localhost:3001"
echo "   Frontend: http://localhost:3000"
echo "   tRPC:     http://localhost:3001/trpc"
echo ""

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo "🛑 Deteniendo servicios..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "✅ Servicios detenidos"
    exit 0
}

# Capturar Ctrl+C
trap cleanup INT TERM

echo "🔄 Iniciando servicios en paralelo..."
echo "   Presiona Ctrl+C para detener todos los servicios"
echo ""

# Iniciar backend
echo "🔙 Iniciando Backend (NestJS) en puerto 3001..."
pnpm run dev:backend &
BACKEND_PID=$!

# Esperar un poco antes de iniciar el frontend
sleep 3

# Iniciar frontend
echo "🎨 Iniciando Frontend (Next.js) en puerto 3000..."
pnpm run dev:frontend &
FRONTEND_PID=$!

echo "✅ Ambos servicios iniciados"
echo ""
echo "📊 PIDs de los procesos:"
echo "   Backend:  $BACKEND_PID"
echo "   Frontend: $FRONTEND_PID"
echo ""
echo "🌐 URLs disponibles:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend:  http://localhost:3001"
echo "   - tRPC:     http://localhost:3001/trpc"
echo ""

# Esperar a que terminen los procesos
wait $BACKEND_PID $FRONTEND_PID
