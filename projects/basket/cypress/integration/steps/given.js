import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I load the page with {} feature flags`, featureFlags => {
  const flags = featureFlags
    .split(',')
    .map(item => `${item}=true`)
    .join('&')
  cy.loadPage({ urlParams: `&${flags}` })
})

Given(`I load the page`, () => {
  cy.loadPage()
})

Given('I have {string} target value set to {string}', (targetName, value) => {
  cy.setCookie(targetName, value)
})
