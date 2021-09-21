import { Given } from 'cypress-cucumber-preprocessor/steps'

Given('I have a red hybrid plan basket with esim', () => {
  cy.setScenarioMocks('red-hybrid/hybrid', true, 'rhRequest')
})

Given('I have a red hybrid plan basket with pyhsical sim', () => {
  cy.setScenarioMocks('red-hybrid/default', true, 'rhRequest')
})
