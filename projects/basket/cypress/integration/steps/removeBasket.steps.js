import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I have a basket with multiple items`, () => {
  cy.intercept('POST', '**/basket/**/empty', { statusCode: 204, body: {} }).as('basketEmptyRequest')
  cy.setScenarioMocks('clear-basket/remove-basket', true)
})

When(`I remove package {string}`, text => {
  cy.intercept('POST', '**/basket/**/package/**', { statusCode: 204, body: {} }).as('removePackageRequest')
  cy.get(`[data-selector="basket-header-action-${text}"]`).first().click()
})

When(`I undo remove package {string}`, text => {
  cy.intercept('POST', '**/basket/**/package', {
    statusCode: 201,
    fixture: 'basket/clear-basket/remove-basket/post',
  }).as('undoRemovePackageRequest')

  cy.get(`[data-selector="basket-header-action-you-removed-${text}"]`).first().click()
  cy.setScenarioMocks('clear-basket/remove-basket')
})
