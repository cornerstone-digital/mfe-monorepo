import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I have a BB package with Engineer visit upfront cost set to 0`, () => {
  cy.setScenarioMocks('engineer-visit-addon/upfront-cost-0', true)
})

Given(`I have a BB package with Engineer visit upfront cost set to 10`, () => {
  cy.setScenarioMocks('engineer-visit-addon/upfront-cost-10', true)
})
