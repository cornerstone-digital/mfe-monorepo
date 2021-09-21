import { Given } from 'cypress-cucumber-preprocessor/steps'

Given('I have a sim card selected package', () => {
  cy.setScenarioMocks('choose-your-sim/sim-card-selected', true)
})

Given('I have a eSim card selected package', () => {
  cy.setScenarioMocks('choose-your-sim/esim-selected', true)
})

Given('I am upgrading to a eSIM compatible device', () => {
  cy.setScenarioMocks('choose-your-sim/hybrid-device-upgrade', true)
})

Given('I am upgrading my simo plan', () => {
  cy.setScenarioMocks('choose-your-sim/simo-upgrade', true)
})

Given(`I am changing sim card type from {} to {}`, (from, to) => {
  cy.setScenarioMocks(`choose-your-sim/sim-choose-${from}-${to}`, true)
})

When('I select sim option', () => {
  cy.setScenarioMocks(`choose-your-sim/sim-choose-sim-esim`, false, 'sim_')
  cy.intercept('POST', '**/basket/package/**', { statusCode: 204, body: {} }).as('simSelectedRequest')

  cy.get('[data-selector="sim"]').first().click({ force: true })
})

When('I select esim option', () => {
  cy.setScenarioMocks(`choose-your-sim/sim-choose-esim-sim`, false, 'esim_')
  cy.intercept('POST', '**/basket/package/**', { statusCode: 204, body: {} }).as('esimSelectedRequest')

  cy.get('[data-selector="sim"]').first().click({ force: true })
})
