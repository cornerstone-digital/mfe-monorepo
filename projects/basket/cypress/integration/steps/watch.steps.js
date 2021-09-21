import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I have an apple watch package with add on`, () => {
  cy.setScenarioMocks('watch/apple-with-add-on', true)
})

Given(`I have a samsung watch package with add on`, () => {
  cy.setScenarioMocks('watch/samsung-with-add-on', true)
})

Given(`I have an apple watch in combi package`, () => {
  cy.setScenarioMocks('watch/combi-watch', true)
})

When('I remove one watch addOn', () => {
  cy.intercept('POST', '**/basket/**/package/**', { statusCode: 204, body: {} })
  cy.get('[data-selector="basket-header-action-apple-watch-se-gps4g-cellular-44mm-aluminium-space-grey"]').first().click()
})

When('I undo removed watch addOn', () => {
  cy.intercept('POST', '**/basket/**/package', { statusCode: 204, body: {} })
  cy.contains('Undo').first().click()
})
