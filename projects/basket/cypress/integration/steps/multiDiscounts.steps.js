import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I am a {} customer with a discounted package`, customerType => {
  const scenario = customerType === 'business' ? 'business' : 'normal'
  cy.setScenarioMocks(`multi-discount/${scenario}`, true)
})

Given(`I have a discounted upgrade package`, () => {
  cy.setScenarioMocks('multi-discount/upgrade', true)
})

Given(`I have a basket with no discount`, () => {
  cy.setScenarioMocks('multi-discount/no-discount', true)
})

Given(`I have a combi and watch package`, () => {
  cy.setScenarioMocks('multi-discount/combi-and-watch', true)
})

Given(`I have a basket with limited discount`, () => {
  cy.setScenarioMocks('multi-discount/limited-discount', true)
})

Given(`I have a bingo handset package`, () => {
  cy.setScenarioMocks('multi-discount/default', true)
})

Given(`I have a paym handset package`, () => {
  cy.setScenarioMocks('multi-discount/normal', true)
})
