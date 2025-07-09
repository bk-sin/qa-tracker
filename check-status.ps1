#!/usr/bin/env pwsh

# Script para verificar el estado de los servicios locales

Write-Host "🔍 Verificando estado de QA Tracker" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Green
Write-Host ""

# Verificar puertos
Write-Host "📡 Verificando puertos:" -ForegroundColor Cyan

$port3000 = netstat -ano | Select-String ":3000"
$port3001 = netstat -ano | Select-String ":3001"

if ($port3000) {
    Write-Host "   ✅ Puerto 3000 (Frontend): EN USO" -ForegroundColor Green
    $port3000 | ForEach-Object { Write-Host "      $_" -ForegroundColor Gray }
} else {
    Write-Host "   ❌ Puerto 3000 (Frontend): LIBRE" -ForegroundColor Red
}

if ($port3001) {
    Write-Host "   ✅ Puerto 3001 (Backend): EN USO" -ForegroundColor Green
    $port3001 | ForEach-Object { Write-Host "      $_" -ForegroundColor Gray }
} else {
    Write-Host "   ❌ Puerto 3001 (Backend): LIBRE" -ForegroundColor Red
}

Write-Host ""

# Verificar URLs
Write-Host "🌐 Verificando servicios:" -ForegroundColor Cyan

try {
    $frontendResponse = Invoke-WebRequest -Uri "http://localhost:3000" -Method Head -TimeoutSec 5 -ErrorAction Stop
    Write-Host "   ✅ Frontend (http://localhost:3000): DISPONIBLE" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Frontend (http://localhost:3000): NO DISPONIBLE" -ForegroundColor Red
}

try {
    $backendResponse = Invoke-WebRequest -Uri "http://localhost:3001" -Method Head -TimeoutSec 5 -ErrorAction Stop
    Write-Host "   ✅ Backend (http://localhost:3001): DISPONIBLE" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Backend (http://localhost:3001): NO DISPONIBLE" -ForegroundColor Red
}

try {
    $trpcResponse = Invoke-WebRequest -Uri "http://localhost:3001/trpc/health" -Method Get -TimeoutSec 5 -ErrorAction Stop
    $responseContent = $trpcResponse.Content | ConvertFrom-Json
    if ($responseContent.result.data.status -eq "ok") {
        Write-Host "   ✅ tRPC (http://localhost:3001/trpc): DISPONIBLE" -ForegroundColor Green
    } else {
        Write-Host "   ❌ tRPC (http://localhost:3001/trpc): RESPUESTA INVÁLIDA" -ForegroundColor Red
    }
} catch {
    Write-Host "   ❌ tRPC (http://localhost:3001/trpc): NO DISPONIBLE" -ForegroundColor Red
}

Write-Host ""

# Verificar archivos de configuración
Write-Host "📁 Verificando configuración:" -ForegroundColor Cyan

$backendEnv = Test-Path "packages/backend/.env"
$frontendEnv = Test-Path "packages/frontend/.env.local"

if ($backendEnv) {
    Write-Host "   ✅ Backend .env: EXISTE" -ForegroundColor Green
} else {
    Write-Host "   ❌ Backend .env: NO EXISTE" -ForegroundColor Red
}

if ($frontendEnv) {
    Write-Host "   ✅ Frontend .env.local: EXISTE" -ForegroundColor Green
} else {
    Write-Host "   ❌ Frontend .env.local: NO EXISTE" -ForegroundColor Red
}

Write-Host ""
Write-Host "📋 URLs de acceso:" -ForegroundColor Yellow
Write-Host "   🎨 Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   🔙 Backend:  http://localhost:3001" -ForegroundColor White
Write-Host "   🔗 tRPC:     http://localhost:3001/trpc" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Para iniciar: pnpm run dev" -ForegroundColor Magenta
Write-Host "🛠️  Script local: pnpm run local:dev" -ForegroundColor Magenta
