import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I have HBB refresh refresh package`, () => {
  cy.setScenarioMocks('hbb-refresh/default', true)
})

Given(`I have HBB refresh refresh package with no hardware`, () => {
  cy.setScenarioMocks('hbb-refresh/noHardware', true)
})

Given(`I have HBB refresh refresh package with norton antivirus benefit`, () => {
  cy.setScenarioMocks('hbb-refresh/norton', true)
})

Given(`I have HBB refresh refresh upgrade package`, () => {
  cy.setScenarioMocks('hbb-refresh/upgrade', true)
})

Given('I have a Basket which includes HBB Pro Superfast Xtra', () => {
  cy.setScenarioMocks('hbb-refresh/alexa-built-in', true)
})
