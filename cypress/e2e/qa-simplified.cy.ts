describe('🎯 QA Tracker - Automatización con Cypress', () => {
  beforeEach(() => {
    // Interceptar APIs para monitoreo
    cy.intercept('POST', '/api/auth/signup').as('signupAPI')
    cy.intercept('POST', '/api/auth/signin').as('signinAPI')
    cy.intercept('GET', '/api/users').as('usersAPI')
  })

  it('✅ Test Completo - Verificación del Sistema', () => {
    console.log('🚀 Iniciando test completo de automatización QA')
    
    // Paso 1: Cargar página de pruebas
    cy.visit('/auth/test')
    
    // Verificar elementos principales
    cy.contains('🧪 Pruebas de Autenticación').should('be.visible')
    cy.contains('Crear Usuario').should('be.visible')
    cy.contains('Iniciar Sesión').should('be.visible')
    cy.contains('Usuarios Registrados').should('be.visible')
    
    console.log('✅ Página cargada correctamente')
    
    // Paso 2: Verificar carga de usuarios existentes
    cy.wait('@usersAPI').then((interception) => {
      console.log(`📡 GET /api/users: ${interception.response?.statusCode}`)
      const response = interception.response?.body as any
      if (response?.data) {
        console.log(`👥 Usuarios existentes: ${response.data.length}`)
        console.log(`📊 Total en BD: ${response.total}`)
      }
    })
    
    // Paso 3: Crear nuevo usuario de prueba
    const timestamp = Date.now()
    const testUser = {
      name: `QA Cypress ${timestamp}`,
      email: `cypress.${timestamp}@gmail.com`,
      password: 'CypressQA123!'
    }
    
    console.log(`👤 Creando usuario: ${testUser.email}`)
    
    // Llenar formulario de registro
    cy.get('#signup-name').clear().type(testUser.name)
    cy.get('#signup-email').clear().type(testUser.email)
    cy.get('#signup-password').clear().type(testUser.password)
    
    // Seleccionar rol QA Tester
    cy.get('button[role="combobox"]').first().click()
    cy.contains('QA Tester').click()
    
    // Enviar formulario
    cy.get('button:contains("Crear Usuario")').click()
    
    // Capturar respuesta de signup
    cy.wait('@signupAPI').then((interception) => {
      const status = interception.response?.statusCode
      const body = interception.response?.body
      
      console.log(`📡 POST /api/auth/signup: ${status}`)
      console.log(`📄 Response:`, body)
      
      if (status === 201) {
        console.log('✅ Usuario creado exitosamente')
      } else if (status === 500) {
        console.log('⚠️ Error del servidor en creación')
      } else {
        console.log(`⚠️ Respuesta inesperada: ${status}`)
      }
    })
    
    cy.wait(2000)
    
    // Paso 4: Intentar login con el usuario creado
    console.log(`🔐 Intentando login con: ${testUser.email}`)
    
    cy.get('#signin-email').clear().type(testUser.email)
    cy.get('#signin-password').clear().type(testUser.password)
    cy.get('button:contains("Iniciar Sesión")').click()
    
    // Capturar respuesta de signin
    cy.wait('@signinAPI').then((interception) => {
      const status = interception.response?.statusCode
      const body = interception.response?.body
      
      console.log(`📡 POST /api/auth/signin: ${status}`)
      console.log(`📄 Response:`, body)
      
      if (status === 200) {
        console.log('✅ Login exitoso')
      } else if (status === 401) {
        console.log('⚠️ Credenciales inválidas')
      } else {
        console.log(`⚠️ Error de login: ${status}`)
      }
    })
    
    cy.wait(2000)
    
    // Paso 5: Recargar lista de usuarios
    console.log('🔄 Recargando lista de usuarios')
    cy.get('button:contains("Recargar")').click()
    
    cy.wait('@usersAPI').then((interception) => {
      console.log(`📡 GET /api/users (reload): ${interception.response?.statusCode}`)
      const response = interception.response?.body as any
      if (response?.data) {
        console.log(`👥 Usuarios después de creación: ${response.data.length}`)
      }
    })
    
    console.log('🎯 Test completo finalizado')
  })

  it('🧪 Test de Manejo de Errores', () => {
    console.log('🚀 Iniciando test de manejo de errores')
    
    cy.visit('/auth/test')
    
    // Test 1: Registro con datos incompletos
    console.log('🧪 Test: Datos incompletos en registro')
    cy.get('#signup-email').clear().type('incompleto@test.com')
    // Dejar name y password vacíos
    cy.get('button:contains("Crear Usuario")').click()
    cy.wait(2000)
    
    // Test 2: Login con credenciales incorrectas
    console.log('🧪 Test: Credenciales incorrectas')
    cy.get('#signin-email').clear().type('noexiste@example.com')
    cy.get('#signin-password').clear().type('passwordincorrecto')
    cy.get('button:contains("Iniciar Sesión")').click()
    
    cy.wait('@signinAPI').then((interception) => {
      const status = interception.response?.statusCode
      console.log(`📡 Login con credenciales incorrectas: ${status}`)
      
      if (status === 401) {
        console.log('✅ Error 401 manejado correctamente')
      }
    })
    
    console.log('🎯 Test de errores completado')
  })

  it('📊 Test de Stress - Múltiples Usuarios', () => {
    console.log('🚀 Iniciando stress test con múltiples usuarios')
    
    cy.visit('/auth/test')
    cy.wait(1000)
    
    // Crear 3 usuarios diferentes
    const users = [
      { name: 'Stress Admin', email: `stress.admin.${Date.now()}@gmail.com`, role: 'Administrador' },
      { name: 'Stress Dev', email: `stress.dev.${Date.now()}@gmail.com`, role: 'Desarrollador' },
      { name: 'Stress QA', email: `stress.qa.${Date.now()}@gmail.com`, role: 'QA Tester' }
    ]
    
    let successCount = 0
    let errorCount = 0
    
    users.forEach((user, index) => {
      console.log(`👤 Creando usuario ${index + 1}/3: ${user.email}`)
      
      // Limpiar formulario
      cy.get('#signup-name').clear()
      cy.get('#signup-email').clear()
      cy.get('#signup-password').clear()
      
      // Llenar datos
      cy.get('#signup-name').type(user.name)
      cy.get('#signup-email').type(user.email)
      cy.get('#signup-password').type('StressTest123!')
      
      // Seleccionar rol
      cy.get('button[role="combobox"]').first().click()
      cy.contains(user.role).click()
      
      // Enviar formulario
      cy.get('button:contains("Crear Usuario")').click()
      
      cy.wait(2000)
      
      // Verificar resultado
      cy.window().then(() => {
        // Aquí podrías verificar algún mensaje de éxito/error en la UI
        console.log(`✅ Usuario ${index + 1} procesado`)
      })
      
      // Recargar lista
      cy.get('button:contains("Recargar")').click()
      cy.wait(1000)
    })
    
    console.log('📊 Stress test completado')
    console.log(`✅ Usuarios procesados: ${users.length}`)
  })

  it('🎯 Análisis Completo de APIs', () => {
    console.log('🚀 Iniciando análisis completo de APIs')
    
    const apiCalls: any[] = []
    
    // Interceptar todas las APIs
    cy.intercept('**', (req) => {
      if (req.url.includes('/api/')) {
        req.continue((res) => {
          apiCalls.push({
            method: req.method,
            url: req.url,
            status: res.statusCode,
            timestamp: new Date().toISOString()
          })
        })
      }
    })
    
    cy.visit('/auth/test')
    cy.wait(2000)
    
    // Realizar operaciones completas
    const timestamp = Date.now()
    
    // 1. Verificar usuarios iniciales
    cy.get('button:contains("Recargar")').click()
    cy.wait(1000)
    
    // 2. Crear usuario
    cy.get('#signup-name').clear().type(`API Analysis ${timestamp}`)
    cy.get('#signup-email').clear().type(`analysis.${timestamp}@gmail.com`)
    cy.get('#signup-password').clear().type('Analysis123!')
    cy.get('button[role="combobox"]').first().click()
    cy.contains('QA Tester').click()
    cy.get('button:contains("Crear Usuario")').click()
    cy.wait(3000)
    
    // 3. Intentar login
    cy.get('#signin-email').clear().type(`analysis.${timestamp}@gmail.com`)
    cy.get('#signin-password').clear().type('Analysis123!')
    cy.get('button:contains("Iniciar Sesión")').click()
    cy.wait(3000)
    
    // 4. Recargar lista final
    cy.get('button:contains("Recargar")').click()
    cy.wait(2000)
    
    // Mostrar resumen de APIs
    cy.then(() => {
      console.log(`📊 Total de llamadas API: ${apiCalls.length}`)
      apiCalls.forEach((call, index) => {
        console.log(`${index + 1}. ${call.method} ${call.url.split('/').pop()} - ${call.status}`)
      })
      
      // Estadísticas
      const statusCounts = apiCalls.reduce((acc: any, call) => {
        acc[call.status] = (acc[call.status] || 0) + 1
        return acc
      }, {})
      
      console.log('📈 Distribución de status codes:')
      Object.entries(statusCounts).forEach(([status, count]) => {
        console.log(`   - ${status}: ${count}`)
      })
    })
    
    console.log('🎯 Análisis de APIs completado')
  })
})
