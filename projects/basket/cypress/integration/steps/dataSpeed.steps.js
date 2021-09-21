import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I have a basket with {} plan`, plan => {
  cy.setScenarioMocks(`data-speed/${plan}`, true)
})
