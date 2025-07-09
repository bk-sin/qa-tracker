#!/usr/bin/env node

/**
 * Script de configuración inicial para el monorepo QA Tracker
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Configurando QA Tracker Monorepo...\n');

// Verificar prerrequisitos
function checkPrerequisites() {
  console.log('📋 Verificando prerrequisitos...');

  try {
    execSync('node --version', { stdio: 'pipe' });
    console.log('✅ Node.js está instalado');
  } catch (error) {
    console.error(
      '❌ Node.js no está instalado. Por favor instala Node.js >= 18.0.0',
    );
    process.exit(1);
  }

  try {
    execSync('pnpm --version', { stdio: 'pipe' });
    console.log('✅ pnpm está instalado');
  } catch (error) {
    console.error('❌ pnpm no está instalado. Instalando pnpm...');
    try {
      execSync('npm install -g pnpm', { stdio: 'inherit' });
      console.log('✅ pnpm instalado correctamente');
    } catch (installError) {
      console.error(
        '❌ No se pudo instalar pnpm. Por favor instálalo manualmente: npm install -g pnpm',
      );
      process.exit(1);
    }
  }

  console.log('');
}

// Instalar dependencias
function installDependencies() {
  console.log('📦 Instalando dependencias...');

  try {
    execSync('pnpm install', { stdio: 'inherit', cwd: process.cwd() });
    console.log('✅ Dependencias instaladas correctamente\n');
  } catch (error) {
    console.error('❌ Error al instalar dependencias');
    process.exit(1);
  }
}

// Crear archivos de configuración de ejemplo
function createExampleConfigs() {
  console.log('📝 Creando archivos de configuración de ejemplo...');

  // Backend .env example
  const backendEnvExample = `# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com

# Server Configuration
PORT=3001
NODE_ENV=development
`;

  fs.writeFileSync(
    path.join('packages', 'backend', '.env.example'),
    backendEnvExample,
  );
  console.log('✅ Creado packages/backend/.env.example');

  // Frontend .env example
  const frontendEnvExample = `# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Environment
NODE_ENV=development
`;

  fs.writeFileSync(
    path.join('packages', 'frontend', '.env.example'),
    frontendEnvExample,
  );
  console.log('✅ Creado packages/frontend/.env.example');

  console.log('');
}

// Mostrar instrucciones finales
function showFinalInstructions() {
  console.log('🎉 ¡Configuración completada!\n');

  console.log('📋 Próximos pasos:');
  console.log('');
  console.log('1. 🔧 Configurar variables de entorno:');
  console.log(
    '   - Copia packages/backend/.env.example a packages/backend/.env',
  );
  console.log(
    '   - Copia packages/frontend/.env.example a packages/frontend/.env.local',
  );
  console.log('   - Configura tus credenciales de Firebase');
  console.log('');
  console.log('2. 🚀 Iniciar desarrollo:');
  console.log('   pnpm run dev              # Ambos proyectos');
  console.log('   pnpm run dev:frontend     # Solo frontend');
  console.log('   pnpm run dev:backend      # Solo backend');
  console.log('');
  console.log('3. 🏗️ Otros comandos útiles:');
  console.log('   pnpm run build            # Construir todo');
  console.log('   pnpm run lint             # Linting');
  console.log('   pnpm run test             # Tests');
  console.log('   pnpm run clean            # Limpiar builds');
  console.log('');
  console.log('📖 Ver README.md para más información');
  console.log('');
  console.log('¡Happy coding! 🚀');
}

// Ejecutar configuración
async function main() {
  try {
    checkPrerequisites();
    installDependencies();
    createExampleConfigs();
    showFinalInstructions();
  } catch (error) {
    console.error('❌ Error durante la configuración:', error.message);
    process.exit(1);
  }
}

main();
