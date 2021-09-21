import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I have a PAYM handset with add ons and a watch with add ons`, () => {
  cy.setValidateMock()
  cy.setScenarioMocks('handset-and-watch/add-ons-both', true)
})
