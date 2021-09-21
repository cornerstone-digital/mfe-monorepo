import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I have a bingo simo package`, () => {
  cy.setScenarioMocks('simo/bingo-simo-upgrade', true)
  cy.setValidateMock()
})

Given(`I have a bingo simo upgrade package`, () => {
  cy.setScenarioMocks('simo/bingo-simo-upgrade', true)
  cy.setValidateMock()
})

Given(`I have a basic simo package with data addons`, () => {
  cy.setScenarioMocks('simo/data-addons', true)
  cy.setValidateMock()
})
