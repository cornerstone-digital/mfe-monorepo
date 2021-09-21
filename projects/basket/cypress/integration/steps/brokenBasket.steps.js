import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I have a basket with a wrong basketId`, () => {
  cy.setAuthSessionScenario()
  cy.setAssetsScenario()
  cy.intercept('GET', '**/basket/api/basket/v2/basket/**', { statusCode: 400 })
  cy.loadPage()
})
