import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I have a watch simo upgrade package`, () => {
  cy.setValidateMock()
  cy.setScenarioMocks('watch-upgrade/watch-simo', true)
})

Given(`I have a bingo watch upgrade package`, () => {
  cy.setValidateMock()
  cy.setScenarioMocks('watch-upgrade/bingo-watch', true)
})
