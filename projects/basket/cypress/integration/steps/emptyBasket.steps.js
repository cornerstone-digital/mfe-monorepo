import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I have an empty basket`, () => {
  cy.setScenarioMocks('clear-basket/empty-basket', true)
  cy.intercept('POST', '**/basket', { statusCode: 201, body: {} })
  cy.acceptCookies()
})
