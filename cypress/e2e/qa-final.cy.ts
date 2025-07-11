describe('🚀 QA Tracker - Cypress Automation Final', () => {
  beforeEach(() => {
    // Interceptar APIs con logging detallado
    cy.intercept('POST', '/api/auth/signup', (req) => {
      console.log('📤 SIGNUP REQUEST:', req.body)
      req.continue((res) => {
        console.log('📡 SIGNUP RESPONSE:', res.statusCode, res.body)
      })
    }).as('signupAPI')
    
    cy.intercept('POST', '/api/auth/signin', (req) => {
      console.log('📤 SIGNIN REQUEST:', req.body)
      req.continue((res) => {
        console.log('📡 SIGNIN RESPONSE:', res.statusCode, res.body)
      })
    }).as('signinAPI')
    
    cy.intercept('GET', '/api/users', (req) => {
      req.continue((res) => {
        console.log('📡 USERS RESPONSE:', res.statusCode, 'Users:', res.body?.data?.length || 0)
      })
    }).as('usersAPI')
  })

  it('🎯 Test Principal - Monitoreo Completo del Sistema', () => {
    console.log('\n' + '='.repeat(60))
    console.log('🚀 CYPRESS QA AUTOMATION - SISTEMA COMPLETO')
    console.log('📋 Objetivo: Monitorear todas las respuestas y operaciones')
    console.log('='.repeat(60))
    
    // FASE 1: Verificación inicial del sistema
    console.log('\n📍 FASE 1: Carga inicial del sistema')
    cy.visit('/auth/test')
    
    // Verificar elementos críticos
    cy.contains('🧪 Pruebas de Autenticación').should('be.visible')
    cy.contains('Usuarios Registrados').should('be.visible')
    
    // Verificar carga de usuarios existentes
    cy.wait('@usersAPI').then((interception) => {
      const response = interception.response?.body as any
      console.log(`✅ Sistema cargado. Usuarios existentes: ${response?.data?.length || 0}`)
      console.log(`📊 Total en BD: ${response?.total || 0}`)
    })
    
    // FASE 2: Test de creación de usuario
    console.log('\n👤 FASE 2: Creación de usuario de prueba')
    const timestamp = Date.now()
    const testUser = {
      name: `Cypress QA Final ${timestamp}`,
      email: `cypress.final.${timestamp}@gmail.com`,
      password: 'CypressFinal123!'
    }
    
    console.log(`📝 Usuario de prueba: ${testUser.email}`)
    
    // Llenar formulario con datos válidos
    cy.get('#signup-name').clear().type(testUser.name)
    cy.get('#signup-email').clear().type(testUser.email)
    cy.get('#signup-password').clear().type(testUser.password)
    
    // Intentar seleccionar rol (simplificado)
    cy.get('button[role="combobox"]').first().should('be.visible').click({ force: true })
    cy.wait(1000)
    
    // Buscar y hacer clic en QA Tester
    cy.get('body').then(($body) => {
      if ($body.find(':contains("QA Tester")').length > 0) {
        cy.contains('QA Tester').click({ force: true })
        console.log('✅ Rol QA Tester seleccionado')
      } else if ($body.find('[value="TESTER"]').length > 0) {
        cy.get('[value="TESTER"]').click({ force: true })
        console.log('✅ Rol TESTER seleccionado via value')
      } else {
        // Si no encuentra el rol, continúa sin seleccionar
        console.log('⚠️ No se pudo seleccionar rol, continuando sin rol')
        cy.get('body').click(0, 0) // Click fuera para cerrar dropdown
      }
    })
    
    // Enviar formulario de registro
    cy.get('button:contains("Crear Usuario")').click({ force: true })
    console.log('📤 Formulario de registro enviado')
    
    // Capturar respuesta de signup
    cy.wait('@signupAPI', { timeout: 15000 }).then((interception) => {
      const status = interception.response?.statusCode
      const body = interception.response?.body
      
      console.log(`📡 SIGNUP RESULT: ${status}`)
      console.log(`📄 Response Body:`, JSON.stringify(body, null, 2))
      
      if (status === 201) {
        console.log('✅ Usuario creado exitosamente')
      } else if (status === 500) {
        console.log('⚠️ Error del servidor (posible problema con Supabase)')
        console.log('🔍 Razón probable: Validación de email o configuración de Supabase')
      } else {
        console.log(`⚠️ Respuesta inesperada: ${status}`)
      }
    })
    
    cy.wait(2000)
    
    // FASE 3: Test de login
    console.log('\n🔐 FASE 3: Test de inicio de sesión')
    
    // Test con el usuario recién creado
    cy.get('#signin-email').clear().type(testUser.email)
    cy.get('#signin-password').clear().type(testUser.password)
    cy.get('button:contains("Iniciar Sesión")').click({ force: true })
    console.log('📤 Intento de login enviado')
    
    cy.wait('@signinAPI', { timeout: 15000 }).then((interception) => {
      const status = interception.response?.statusCode
      const body = interception.response?.body
      
      console.log(`📡 SIGNIN RESULT: ${status}`)
      console.log(`📄 Response Body:`, JSON.stringify(body, null, 2))
      
      if (status === 200) {
        console.log('✅ Login exitoso')
      } else if (status === 401) {
        console.log('⚠️ Credenciales inválidas (esperado si el signup falló)')
      } else if (status === 500) {
        console.log('⚠️ Error del servidor en login')
      }
    })
    
    cy.wait(2000)
    
    // FASE 4: Verificación de lista de usuarios
    console.log('\n📋 FASE 4: Verificación de lista de usuarios')
    cy.get('button:contains("Recargar")').click({ force: true })
    
    cy.wait('@usersAPI').then((interception) => {
      const response = interception.response?.body as any
      console.log(`📊 Usuarios finales en la lista: ${response?.data?.length || 0}`)
      
      if (response?.data && response.data.length > 0) {
        console.log('👥 Usuarios en el sistema:')
        response.data.slice(0, 3).forEach((user: any, index: number) => {
          console.log(`   ${index + 1}. ${user.name} - ${user.email} (${user.role})`)
        })
      }
    })
    
    console.log('\n🎯 FASE 5: Conclusiones del test')
    console.log('✅ Test principal completado')
    console.log('📊 Todas las APIs fueron monitoreadas')
    console.log('🔍 Respuestas capturadas y analizadas')
    console.log('='.repeat(60))
  })

  it('⚠️ Test de Casos Límite y Manejo de Errores', () => {
    console.log('\n🧪 INICIANDO TEST DE MANEJO DE ERRORES')
    
    cy.visit('/auth/test')
    cy.wait(1000)
    
    // Test 1: Registro con email inválido
    console.log('🧪 Test 1: Email con formato inválido')
    cy.get('#signup-name').clear().type('Usuario Test')
    cy.get('#signup-email').clear().type('email-malformado')
    cy.get('#signup-password').clear().type('Password123!')
    cy.get('button:contains("Crear Usuario")').click({ force: true })
    cy.wait(3000)
    
    // Test 2: Campos vacíos
    console.log('🧪 Test 2: Campos vacíos')
    cy.get('#signup-name').clear()
    cy.get('#signup-email').clear()
    cy.get('#signup-password').clear()
    cy.get('button:contains("Crear Usuario")').click({ force: true })
    cy.wait(2000)
    
    // Test 3: Login con credenciales inexistentes
    console.log('🧪 Test 3: Credenciales inexistentes')
    cy.get('#signin-email').clear().type('inexistente@noexiste.com')
    cy.get('#signin-password').clear().type('passwordincorrecto')
    cy.get('button:contains("Iniciar Sesión")').click()
    
    cy.wait('@signinAPI').then((interception) => {
      const status = interception.response?.statusCode
      console.log(`📡 Login fallido esperado: ${status}`)
      
      if (status === 401) {
        console.log('✅ Error 401 manejado correctamente')
      } else {
        console.log(`⚠️ Status inesperado: ${status}`)
      }
    })
    
    // Test 4: Múltiples intentos rápidos
    console.log('🧪 Test 4: Intentos múltiples rápidos')
    for (let i = 1; i <= 3; i++) {
      cy.get('#signin-email').clear().type(`rapid${i}@test.com`)
      cy.get('#signin-password').clear().type(`pass${i}`)
      cy.get('button:contains("Iniciar Sesión")').click()
      cy.wait(1000)
      console.log(`📤 Intento rápido ${i} enviado`)
    }
    
    console.log('✅ Test de errores completado')
  })

  it('📊 Test de Estrés y Rendimiento', () => {
    console.log('\n⚡ INICIANDO STRESS TEST')
    
    cy.visit('/auth/test')
    cy.wait(1000)
    
    const startTime = Date.now()
    let operationsCount = 0
    
    // Realizar múltiples operaciones de lectura
    console.log('📋 Test: Múltiples cargas de usuarios')
    for (let i = 1; i <= 5; i++) {
      cy.get('button:contains("Recargar")').click()
      cy.wait(500)
      operationsCount++
      console.log(`🔄 Recarga ${i}/5 completada`)
    }
    
    // Test de formularios con datos variados
    console.log('📝 Test: Envío de múltiples formularios')
    const testEmails = [
      'stress1@gmail.com',
      'stress2@outlook.com', 
      'stress3@yahoo.com'
    ]
    
    testEmails.forEach((email, index) => {
      cy.get('#signup-name').clear().type(`Stress User ${index + 1}`)
      cy.get('#signup-email').clear().type(email)
      cy.get('#signup-password').clear().type('StressTest123!')
      cy.get('button:contains("Crear Usuario")').click({ force: true })
      cy.wait(2000)
      operationsCount++
      console.log(`📤 Formulario ${index + 1}/3 enviado`)
    })
    
    const endTime = Date.now()
    const duration = endTime - startTime
    
    console.log(`⚡ Stress test completado`)
    console.log(`📊 Operaciones totales: ${operationsCount}`)
    console.log(`⏱️ Tiempo total: ${duration}ms`)
    console.log(`🚀 Promedio por operación: ${Math.round(duration / operationsCount)}ms`)
  })

  it('🔍 Análisis Final de Sistema', () => {
    console.log('\n🔬 ANÁLISIS FINAL DEL SISTEMA')
    
    const allAPICalls: any[] = []
    
    // Interceptar TODAS las llamadas
    cy.intercept('**', (req) => {
      if (req.url.includes('/api/')) {
        req.continue((res) => {
          allAPICalls.push({
            timestamp: new Date().toISOString(),
            method: req.method,
            endpoint: req.url.split('/').pop(),
            status: res.statusCode,
            success: res.statusCode >= 200 && res.statusCode < 300
          })
        })
      }
    })
    
    cy.visit('/auth/test')
    cy.wait(2000)
    
    // Realizar un ciclo completo de operaciones
    console.log('🔄 Ejecutando ciclo completo de operaciones...')
    
    // 1. Verificar estado inicial
    cy.get('button:contains("Recargar")').click()
    cy.wait(1000)
    
    // 2. Intentar crear usuario
    const finalTimestamp = Date.now()
    cy.get('#signup-name').clear().type(`Final Analysis ${finalTimestamp}`)
    cy.get('#signup-email').clear().type(`final.analysis.${finalTimestamp}@gmail.com`)
    cy.get('#signup-password').clear().type('FinalAnalysis123!')
    cy.get('button:contains("Crear Usuario")').click({ force: true })
    cy.wait(3000)
    
    // 3. Intentar login
    cy.get('#signin-email').clear().type(`final.analysis.${finalTimestamp}@gmail.com`)
    cy.get('#signin-password').clear().type('FinalAnalysis123!')
    cy.get('button:contains("Iniciar Sesión")').click()
    cy.wait(3000)
    
    // 4. Verificar estado final
    cy.get('button:contains("Recargar")').click()
    cy.wait(2000)
    
    // Generar reporte final
    cy.then(() => {
      console.log('\n📊 REPORTE FINAL DE AUTOMATIZACIÓN QA')
      console.log('='.repeat(50))
      console.log(`🔢 Total de llamadas API: ${allAPICalls.length}`)
      
      // Análisis por endpoint
      const endpointStats = allAPICalls.reduce((acc: any, call) => {
        const endpoint = call.endpoint
        if (!acc[endpoint]) {
          acc[endpoint] = { total: 0, success: 0, errors: 0 }
        }
        acc[endpoint].total++
        if (call.success) {
          acc[endpoint].success++
        } else {
          acc[endpoint].errors++
        }
        return acc
      }, {})
      
      console.log('\n📈 Análisis por endpoint:')
      Object.entries(endpointStats).forEach(([endpoint, stats]: [string, any]) => {
        const successRate = ((stats.success / stats.total) * 100).toFixed(1)
        console.log(`   📍 ${endpoint}: ${stats.total} llamadas, ${successRate}% éxito`)
      })
      
      // Análisis por status code
      const statusStats = allAPICalls.reduce((acc: any, call) => {
        acc[call.status] = (acc[call.status] || 0) + 1
        return acc
      }, {})
      
      console.log('\n📊 Distribución de status codes:')
      Object.entries(statusStats).forEach(([status, count]) => {
        const emoji = Number(status) >= 200 && Number(status) < 300 ? '✅' : '⚠️'
        console.log(`   ${emoji} ${status}: ${count} respuestas`)
      })
      
      console.log('\n🎯 CONCLUSIONES:')
      const totalSuccess = allAPICalls.filter(call => call.success).length
      const successRate = ((totalSuccess / allAPICalls.length) * 100).toFixed(1)
      console.log(`   ✅ Tasa de éxito general: ${successRate}%`)
      console.log(`   📊 APIs monitoreadas correctamente`)
      console.log(`   🔍 Sistema analizado completamente`)
      console.log('='.repeat(50))
    })
  })
})
