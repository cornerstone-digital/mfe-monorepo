import { Given } from 'cypress-cucumber-preprocessor/steps'

Given('I have basket with 6 simo', () => {
  cy.setValidateMock('notifications/max-paym', 400)
  cy.setScenarioMocks('notifications/max-paym', true)
})

Given('I have basket contains payg and paym', () => {
  cy.setValidateMock('notifications/paym-and-payg', 400)
  cy.setScenarioMocks('notifications/paym-and-payg', true)
})

Given(`I have a bingo basket that goes over the credit limit`, () => {
  cy.setScenarioMocks('validation/error-credit', true)
})

Given(`I have an invalid bingo basket of type {string}`, fixtureName => {
  cy.setValidateMock('validation/error-' + fixtureName, 500)
  cy.setScenarioMocks('validation/error-' + fixtureName, true)
})

Given(`I have an invalid bingo basket of type {string} coming back from Checkout`, text => {
  cy.setScenarioMocks(`validation/error-${text}`)
  cy.setScenarioMock(`validation/error-${text}`, 'post')
  cy.loadPage({ urlParams: '&validate=true' })
})
