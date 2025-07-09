#!/usr/bin/env pwsh

# Script de desarrollo local para Windows PowerShell
# Ejecuta frontend y backend en paralelo sin Docker

Write-Host "🚀 Iniciando QA Tracker - Desarrollo Local" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green

# Verificar que estamos en la raíz del proyecto
if (-not (Test-Path "pnpm-workspace.yaml")) {
    Write-Host "❌ Error: Ejecuta este script desde la raíz del proyecto" -ForegroundColor Red
    exit 1
}

# Verificar que pnpm esté instalado
try {
    $pnpmVersion = pnpm --version
    Write-Host "✅ pnpm detectado: v$pnpmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: pnpm no está instalado" -ForegroundColor Red
    Write-Host "Instala pnpm con: npm install -g pnpm" -ForegroundColor Yellow
    exit 1
}

# Verificar que las dependencias estén instaladas
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    pnpm install
}

Write-Host ""
Write-Host "🔧 Configuración:" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:3001" -ForegroundColor White
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   tRPC:     http://localhost:3001/trpc" -ForegroundColor White
Write-Host ""

# Función para manejar Ctrl+C
$null = Register-EngineEvent PowerShell.Exiting -Action {
    Write-Host "`n🛑 Deteniendo servicios..." -ForegroundColor Yellow
    Get-Job | Stop-Job
    Get-Job | Remove-Job
}

Write-Host "🔄 Iniciando servicios en paralelo..." -ForegroundColor Yellow
Write-Host "   Presiona Ctrl+C para detener todos los servicios" -ForegroundColor Gray
Write-Host ""

# Iniciar backend en background
$backendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    Write-Host "🔙 Iniciando Backend (NestJS) en puerto 3001..." -ForegroundColor Blue
    pnpm run dev:backend
}

# Esperar un poco antes de iniciar el frontend
Start-Sleep -Seconds 3

# Iniciar frontend en background
$frontendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    Write-Host "🎨 Iniciando Frontend (Next.js) en puerto 3000..." -ForegroundColor Magenta
    pnpm run dev:frontend
}

Write-Host "✅ Ambos servicios iniciados" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Estado de los trabajos:" -ForegroundColor Cyan

# Mostrar logs en tiempo real
try {
    while ($true) {
        # Verificar estado de los jobs
        $backendState = $backendJob.State
        $frontendState = $frontendJob.State
        
        Write-Host "`r   Backend: $backendState | Frontend: $frontendState" -NoNewline -ForegroundColor White
        
        # Mostrar algunos logs
        Receive-Job $backendJob | ForEach-Object { Write-Host "[BACKEND] $_" -ForegroundColor Blue }
        Receive-Job $frontendJob | ForEach-Object { Write-Host "[FRONTEND] $_" -ForegroundColor Magenta }
        
        # Si algún job falló, mostrar error
        if ($backendState -eq "Failed") {
            Write-Host "`n❌ Backend falló" -ForegroundColor Red
            break
        }
        if ($frontendState -eq "Failed") {
            Write-Host "`n❌ Frontend falló" -ForegroundColor Red
            break
        }
        
        Start-Sleep -Seconds 2
    }
} catch {
    Write-Host "`n🛑 Proceso interrumpido" -ForegroundColor Yellow
} finally {
    # Limpiar jobs
    Write-Host "`n🧹 Limpiando procesos..." -ForegroundColor Yellow
    Get-Job | Stop-Job
    Get-Job | Remove-Job
    Write-Host "✅ Servicios detenidos" -ForegroundColor Green
}
