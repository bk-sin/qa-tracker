describe('QA Tracker - Sistema de Autenticación (Cypress)', () => {
  beforeEach(() => {
    // Interceptar APIs para monitoreo
    cy.intercept('POST', '/api/auth/signup').as('signupAPI')
    cy.intercept('POST', '/api/auth/signin').as('signinAPI')
    cy.intercept('GET', '/api/users').as('usersAPI')
  })

  it('✅ Verificar carga de página y lista de usuarios', () => {
    cy.log('🚀 Iniciando test de carga de página')
    
    // Visitar página de pruebas
    cy.visit('/auth/test')
    
    // Verificar elementos de la página
    cy.contains('🧪 Pruebas de Autenticación').should('be.visible')
    cy.contains('Crear Usuario').should('be.visible')
    cy.contains('Iniciar Sesión').should('be.visible')
    cy.contains('Usuarios Registrados').should('be.visible')
    
    // Esperar que se carguen los usuarios
    cy.wait('@usersAPI').then((interception) => {
      cy.log(`📡 Users API: ${interception.response?.statusCode}`)
      cy.task('log', `📄 Users Response: ${JSON.stringify(interception.response?.body)}`)
    })
    
    // Probar botón de recarga
    cy.get('button:contains("Recargar")').click()
    cy.wait('@usersAPI')
    
    cy.log('✅ Página cargada correctamente')
  })

  it('🔐 Crear usuario con datos válidos', () => {
    cy.log('🚀 Iniciando test de creación de usuario')
    
    cy.visit('/auth/test')
    
    const timestamp = Date.now()
    const testUser = {
      name: `QA Cypress Test ${timestamp}`,
      email: `cypress.qa.${timestamp}@gmail.com`,
      password: 'CypressTest123!'
    }
    
    cy.log(`👤 Creando usuario: ${testUser.email}`)
    
    // Llenar formulario de registro
    cy.get('#signup-name').clear().type(testUser.name)
    cy.get('#signup-email').clear().type(testUser.email)
    cy.get('#signup-password').clear().type(testUser.password)
    
    // Seleccionar rol QA Tester
    cy.get('button[role="combobox"]').first().click()
    cy.contains('QA Tester').click()
    
    // Enviar formulario
    cy.get('button:contains("Crear Usuario")').click()
    
    // Capturar respuesta de la API
    cy.wait('@signupAPI').then((interception) => {
      cy.log(`📡 Signup API: ${interception.response?.statusCode}`)
      cy.task('log', `📄 Signup Response: ${JSON.stringify(interception.response?.body)}`)
      
      if (interception.response?.statusCode === 201) {
        cy.log('✅ Usuario creado exitosamente')
      } else {
        cy.log(`⚠️ Respuesta inesperada: ${interception.response?.statusCode}`)
      }
    })
    
    cy.wait(2000)
    cy.log('✅ Test de creación completado')
  })

  it('🔐 Intentar login con credenciales', () => {
    cy.log('🚀 Iniciando test de login')
    
    cy.visit('/auth/test')
    
    // Llenar formulario de login
    cy.get('#signin-email').clear().type('test@example.com')
    cy.get('#signin-password').clear().type('password123')
    
    cy.log('📝 Formulario de login llenado')
    
    // Enviar formulario
    cy.get('button:contains("Iniciar Sesión")').click()
    
    // Capturar respuesta
    cy.wait('@signinAPI').then((interception) => {
      cy.log(`📡 Signin API: ${interception.response?.statusCode}`)
      cy.task('log', `📄 Signin Response: ${JSON.stringify(interception.response?.body)}`)
    })
    
    cy.wait(2000)
    cy.log('✅ Test de login completado')
  })

  it('⚠️ Manejo de errores y casos límite', () => {
    cy.log('🚀 Iniciando test de manejo de errores')
    
    cy.visit('/auth/test')
    
    // Test 1: Registro con email incompleto
    cy.log('🧪 Test: Registro con datos incompletos')
    cy.get('#signup-email').clear().type('incomplete@test.com')
    // Dejar name y password vacíos intencionalmente
    cy.get('button:contains("Crear Usuario")').click()
    cy.wait(2000)
    
    // Test 2: Login con credenciales incorrectas
    cy.log('🧪 Test: Login con credenciales incorrectas')
    cy.get('#signin-email').clear().type('nonexistent@example.com')
    cy.get('#signin-password').clear().type('wrongpassword')
    cy.get('button:contains("Iniciar Sesión")').click()
    
    cy.wait('@signinAPI').then((interception) => {
      cy.log(`📡 Signin fallido: ${interception.response?.statusCode}`)
      if (interception.response?.statusCode === 401) {
        cy.log('✅ Error 401 manejado correctamente')
      }
    })
    
    cy.wait(2000)
    cy.log('✅ Test de errores completado')
  })

  it('📊 Monitoreo completo del sistema', () => {
    cy.log('🚀 Iniciando monitoreo completo del sistema')
    
    const apiCalls: any[] = []
    
    // Interceptar todas las llamadas API
    cy.intercept('**', (req) => {
      if (req.url.includes('/api/')) {
        req.continue((res) => {
          apiCalls.push({
            url: req.url,
            method: req.method,
            status: res.statusCode,
            timestamp: new Date().toISOString()
          })
        })
      }
    })
    
    cy.visit('/auth/test')
    cy.wait(2000)
    
    // Crear múltiples usuarios para stress test
    const users = [
      { name: 'Cypress Admin Test', email: `admin.${Date.now()}@gmail.com`, role: 'Administrador' },
      { name: 'Cypress Dev Test', email: `dev.${Date.now()}@gmail.com`, role: 'Desarrollador' },
      { name: 'Cypress QA Test', email: `qa.${Date.now()}@gmail.com`, role: 'QA Tester' }
    ]
    
    users.forEach((user, index) => {
      cy.log(`👤 Creando usuario ${index + 1}/3: ${user.email}`)
      
      // Limpiar formulario
      cy.get('#signup-name').clear()
      cy.get('#signup-email').clear()
      cy.get('#signup-password').clear()
      
      // Llenar datos
      cy.get('#signup-name').type(user.name)
      cy.get('#signup-email').type(user.email)
      cy.get('#signup-password').type('TestPass123!')
      
      // Seleccionar rol
      cy.get('button[role="combobox"]').first().click()
      cy.contains(user.role).click()
      
      // Enviar
      cy.get('button:contains("Crear Usuario")').click()
      cy.wait(2000)
      
      // Recargar lista
      cy.get('button:contains("Recargar")').click()
      cy.wait(1000)
    })
    
    // Mostrar resumen de APIs
    cy.then(() => {
      cy.log(`📊 Total de llamadas API capturadas: ${apiCalls.length}`)
      apiCalls.forEach((call, index) => {
        cy.task('log', `${index + 1}. ${call.method} ${call.url} - ${call.status}`)
      })
    })
    
    cy.log('✅ Monitoreo completo finalizado')
  })

  it('🎯 Análisis detallado de respuestas API', () => {
    cy.log('🚀 Iniciando análisis detallado de APIs')
    
    cy.visit('/auth/test')
    
    // Test completo de ciclo de vida de usuario
    const timestamp = Date.now()
    const testUser = {
      name: `API Analysis ${timestamp}`,
      email: `analysis.${timestamp}@gmail.com`,
      password: 'AnalysisTest123!'
    }
    
    cy.log(`📋 Usuario de análisis: ${testUser.email}`)
    
    // 1. Verificar carga inicial de usuarios
    cy.wait('@usersAPI').then((interception) => {
      const response = interception.response
      cy.log(`📡 GET /api/users: ${response?.statusCode}`)
      
      if (response?.body) {
        const data = response.body as any
        cy.task('log', `👥 Usuarios existentes: ${data.total || 0}`)
        cy.task('log', `📄 Estructura de respuesta: ${JSON.stringify(data, null, 2)}`)
      }
    })
    
    // 2. Crear nuevo usuario
    cy.get('#signup-name').clear().type(testUser.name)
    cy.get('#signup-email').clear().type(testUser.email)
    cy.get('#signup-password').clear().type(testUser.password)
    cy.get('button[role="combobox"]').first().click()
    cy.contains('QA Tester').click()
    cy.get('button:contains("Crear Usuario")').click()
    
    cy.wait('@signupAPI').then((interception) => {
      const response = interception.response
      cy.log(`📡 POST /api/auth/signup: ${response?.statusCode}`)
      cy.task('log', `📄 Signup Response: ${JSON.stringify(response?.body)}`)
      
      if (response?.statusCode === 201) {
        cy.log('✅ Usuario creado correctamente')
      } else if (response?.statusCode === 500) {
        cy.log('⚠️ Error del servidor en creación')
      }
    })
    
    cy.wait(2000)
    
    // 3. Intentar login con el usuario creado
    cy.get('#signin-email').clear().type(testUser.email)
    cy.get('#signin-password').clear().type(testUser.password)
    cy.get('button:contains("Iniciar Sesión")').click()
    
    cy.wait('@signinAPI').then((interception) => {
      const response = interception.response
      cy.log(`📡 POST /api/auth/signin: ${response?.statusCode}`)
      cy.task('log', `📄 Signin Response: ${JSON.stringify(response?.body)}`)
      
      if (response?.statusCode === 200) {
        cy.log('✅ Login exitoso')
      } else if (response?.statusCode === 401) {
        cy.log('⚠️ Credenciales inválidas')
      }
    })
    
    cy.wait(2000)
    
    // 4. Verificar lista actualizada de usuarios
    cy.get('button:contains("Recargar")').click()
    cy.wait('@usersAPI').then((interception) => {
      const response = interception.response
      cy.log(`📡 GET /api/users (final): ${response?.statusCode}`)
      
      if (response?.body) {
        const data = response.body as any
        cy.task('log', `👥 Usuarios finales: ${data.total || 0}`)
      }
    })
    
    cy.log('✅ Análisis detallado completado')
  })
})
