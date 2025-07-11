describe('QA Tracker - Authentication System Tests', () => {
  beforeEach(() => {
    // Configurar interceptors para monitorear APIs
    cy.interceptAPI()
  })

  it('should load the test page and display users', () => {
    cy.log('🚀 Starting authentication system test')
    
    // Visitar página de pruebas
    cy.visit('/auth/test')
    
    // Verificar que la página carga correctamente
    cy.contains('🧪 Pruebas de Autenticación').should('be.visible')
    cy.contains('Crear Usuario').should('be.visible')
    cy.contains('Iniciar Sesión').should('be.visible')
    cy.contains('Usuarios Registrados').should('be.visible')
    
    cy.log('✅ Test page loaded successfully')
    
    // Verificar que se cargan los usuarios existentes
    cy.waitForAPIResponse('usersAPI', 200)
    
    // Recargar lista de usuarios para asegurar que funciona
    cy.reloadUserList()
    cy.waitForAPIResponse('usersAPI', 200)
    
    cy.log('✅ User list loading verified')
  })

  it('should create a new user with valid data', () => {
    cy.log('🚀 Starting user creation test')
    
    const testUser = {
      name: `QA Cypress Test ${Date.now()}`,
      email: `cypress.qa.${Date.now()}@gmail.com`, // Usar dominio real
      password: 'CypressTest123!',
      role: 'TESTER' as const
    }
    
    // Crear usuario usando comando personalizado
    cy.createUser(testUser)
    
    // Esperar respuesta de la API de signup
    cy.waitForAPIResponse('signupAPI')
    
    // Verificar que aparece algún feedback
    cy.wait(2000)
    
    cy.log('✅ User creation test completed')
  })

  it('should attempt login with test credentials', () => {
    cy.log('🚀 Starting login test')
    
    // Intentar login con credenciales de prueba
    cy.loginUser('test@example.com', 'password123')
    
    // Esperar respuesta de login
    cy.waitForAPIResponse('signinAPI')
    
    cy.wait(2000)
    
    cy.log('✅ Login test completed')
  })

  it('should handle error scenarios gracefully', () => {
    cy.log('🚀 Starting error handling test')
    
    cy.visit('/auth/test')
    
    // Test 1: Registro con datos incompletos
    cy.log('🧪 Testing incomplete registration')
    cy.get('#signup-email').type('incomplete@test.com')
    // Dejar name y password vacíos
    cy.get('button:contains("Crear Usuario")').click()
    
    cy.wait(2000)
    
    // Test 2: Login con credenciales inválidas
    cy.log('🧪 Testing invalid login')
    cy.get('#signin-email').clear().type('invalid@example.com')
    cy.get('#signin-password').clear().type('wrongpassword')
    cy.get('button:contains("Iniciar Sesión")').click()
    
    cy.waitForAPIResponse('signinAPI')
    
    cy.log('✅ Error handling test completed')
  })

  it('should perform comprehensive system monitoring', () => {
    cy.log('🚀 Starting comprehensive system monitoring')
    
    cy.visit('/auth/test')
    
    // Crear múltiples usuarios para stress test
    const users = [
      { name: 'Cypress Admin', email: `cypress.admin.${Date.now()}@gmail.com`, password: 'Admin123!', role: 'ADMIN' },
      { name: 'Cypress Dev', email: `cypress.dev.${Date.now()}@gmail.com`, password: 'Dev123!', role: 'DEVELOPER' },
      { name: 'Cypress QA', email: `cypress.qa.${Date.now()}@gmail.com`, password: 'QA123!', role: 'TESTER' }
    ]
    
    users.forEach((user, index) => {
      cy.log(`👤 Creating user ${index + 1}/3: ${user.email}`)
      
      // Limpiar formulario
      cy.get('#signup-name').clear()
      cy.get('#signup-email').clear()
      cy.get('#signup-password').clear()
      
      // Llenar formulario
      cy.get('#signup-name').type(user.name)
      cy.get('#signup-email').type(user.email)
      cy.get('#signup-password').type(user.password)
      
      // Seleccionar rol
      cy.get('button[role="combobox"]').first().click()
      
      const roleMap = {
        'ADMIN': 'Administrador',
        'DEVELOPER': 'Desarrollador',
        'TESTER': 'QA Tester'
      }
      
      cy.contains(roleMap[user.role as keyof typeof roleMap]).click()
      
      // Enviar formulario
      cy.get('button:contains("Crear Usuario")').click()
      
      // Esperar respuesta
      cy.wait(2000)
      
      // Recargar lista de usuarios
      cy.reloadUserList()
      cy.wait(1000)
    })
    
    cy.log('✅ Comprehensive monitoring completed')
  })

  it('should capture and analyze API responses', () => {
    cy.log('🚀 Starting API response analysis')
    
    // Array para capturar todas las respuestas
    const apiResponses: any[] = []
    
    // Interceptar y capturar todas las respuestas
    cy.intercept('**', (req) => {
      req.continue((res) => {
        if (req.url.includes('/api/')) {
          apiResponses.push({
            url: req.url,
            method: req.method,
            status: res.statusCode,
            body: res.body
          })
        }
      })
    })
    
    cy.visit('/auth/test')
    cy.wait(2000)
    
    // Crear un usuario de prueba
    const timestamp = Date.now()
    cy.createUser({
      name: `API Analysis Test ${timestamp}`,
      email: `api.analysis.${timestamp}@gmail.com`,
      password: 'APITest123!',
      role: 'TESTER'
    })
    
    cy.wait(3000)
    
    // Intentar login
    cy.loginUser(`api.analysis.${timestamp}@gmail.com`, 'APITest123!')
    
    cy.wait(3000)
    
    // Recargar usuarios
    cy.reloadUserList()
    
    cy.wait(2000)
    
    cy.then(() => {
      cy.log(`📊 Captured ${apiResponses.length} API responses`)
      apiResponses.forEach((response, index) => {
        cy.task('log', `${index + 1}. ${response.method} ${response.url} - ${response.status}`)
      })
    })
    
    cy.log('✅ API response analysis completed')
  })
})
