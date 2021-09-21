import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I have a basket with TradeIn of type {string}`, type => {
  cy.setScenarioMocks('trade-in/' + type, true)
})

Given(`I have a basket with an expired TradeIn of type {string}`, type => {
  cy.setScenarioMocks('trade-in/' + type, true)
  cy.setValidateMock('trade-in/' + type, 500)
})

Given('The remove trade-in package endpoint works successfully', () => {
  cy.intercept('POST', '**/basket/**/package/**', { body: [] }).as('removeTradeInPackageRequest')
})

Given('The undo trade-in package endpoint works successfully', () => {
  cy.intercept('POST', '**/basket/**/package/**', { body: [] }).as('undoTradeInPackageRequest')
})

Given('The remove trade-in package endpoint is failed', () => {
  cy.intercept('POST', '**/basket/**/package/**', {
    statusCode: 500,
    body: {
      errorCode: 'LOAN_INVALID_UPFRONT_COST',
      errorMessage: 'DevicePaymentPlan can not be generated as the upfront cost is above the allowed threshold : 20.00',
      referenceId: 'cc03bf7b-9915-4e42-a1e8-190c4647ae13',
      validationDetails: null,
    },
  }).as('packageUpdateBadRequest')
})

When('I click tradeIn remove button with broken api', () => {
  cy.get(`[data-selector="basket-header-action-your-guaranteed-tradein"]`).first().click()
})

When('I click removed tradeIn undo button', () => {
  cy.get(`[data-selector="basket-header-action-you-removed-your-guaranteed-tradein"]`).first().click()
})

When('I click tradeIn remove button', () => {
  cy.get(`[data-selector="basket-header-action-your-guaranteed-tradein"]`).first().click()
})
