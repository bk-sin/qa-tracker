/// <reference types="cypress" />
// ***********************************************
// Custom commands for QA Tracker
// ***********************************************

// @ts-ignore
Cypress.Commands.add('loginUser', (email: string, password: string) => {
  cy.log(`🔐 Logging in user: ${email}`)
  cy.visit('/auth/test')
  
  cy.get('#signin-email').type(email)
  cy.get('#signin-password').type(password)
  cy.get('button:contains("Iniciar Sesión")').click()
  
  cy.log('✅ Login form submitted')
})

// @ts-ignore
Cypress.Commands.add('createUser', (userData: {
  name: string,
  email: string,
  password: string,
  role?: 'ADMIN' | 'PROJECT_MANAGER' | 'DEVELOPER' | 'TESTER'
}) => {
  cy.log(`👤 Creating user: ${userData.email}`)
  cy.visit('/auth/test')
  
  // Llenar formulario de registro
  cy.get('#signup-name').clear().type(userData.name)
  cy.get('#signup-email').clear().type(userData.email)
  cy.get('#signup-password').clear().type(userData.password)
  
  // Seleccionar rol si se proporciona
  if (userData.role) {
    cy.get('button[role="combobox"]').first().click()
    
    const roleMap = {
      'ADMIN': 'Administrador',
      'PROJECT_MANAGER': 'Project Manager',
      'DEVELOPER': 'Desarrollador',
      'TESTER': 'QA Tester'
    }
    
    cy.contains(roleMap[userData.role]).click()
  }
  
  cy.get('button:contains("Crear Usuario")').click()
  cy.log('✅ User creation form submitted')
})

// @ts-ignore
Cypress.Commands.add('reloadUserList', () => {
  cy.log('🔄 Reloading user list')
  cy.get('button:contains("Recargar")').click()
  cy.wait(1000) // Wait for reload
})

// @ts-ignore
Cypress.Commands.add('interceptAPI', () => {
  // Interceptar llamadas a las APIs para monitoreo
  cy.intercept('POST', '/api/auth/signup').as('signupAPI')
  cy.intercept('POST', '/api/auth/signin').as('signinAPI')
  cy.intercept('GET', '/api/users').as('usersAPI')
  
  cy.log('🌐 API interceptors configured')
})

// @ts-ignore
Cypress.Commands.add('waitForAPIResponse', (alias: string, expectedStatus?: number) => {
  cy.wait(`@${alias}`).then((interception) => {
    if (expectedStatus) {
      expect(interception.response?.statusCode).to.eq(expectedStatus)
    }
    
    cy.log(`📡 API ${alias}: ${interception.response?.statusCode}`)
    
    // Log response body if it's not too large
    if (interception.response?.body && JSON.stringify(interception.response.body).length < 500) {
      cy.task('log', `📄 Response: ${JSON.stringify(interception.response.body)}`)
    }
  })
})

// @ts-ignore
Cypress.Commands.add('generateTestUser', () => {
  const timestamp = Date.now()
  return {
    name: `QA Test User ${timestamp}`,
    email: `qa.test.${timestamp}@example.com`,
    password: 'TestPass123!',
    role: 'TESTER' as const
  }
})
