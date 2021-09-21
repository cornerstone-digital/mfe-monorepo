import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I have a regular handset`, () => {
  cy.setScenarioMocks('network-switch/default', true, 'networkSwitchRequest')
  cy.setPortabilityMock()
})

Given(`I have a regular handset with switched off payload`, () => {
  cy.setScenarioMocks('network-switch/default', false, 'networkSwitchRequest')
})

Given(`I have a handset with portability set`, () => {
  cy.setScenarioMocks('network-switch/with-portability', true, 'networkSwitchRequest')
  cy.setPortabilityMock()
})

Given(`I have a handset with portability`, () => {
  cy.setScenarioMocks('network-switch/with-portability', false, 'networkSwitchRequest')
  cy.setPortabilityMock()
})

When(`I click on {string} button`, text => {
  cy.get('button').contains(text).click()
})

When(`I click on switch network toggle`, () => {
  cy.get('#switch-network-toggle').click()
})

When(`I click on {string} option`, text => {
  cy.get(`input[value=${text}]`).click({ force: true })
})

When(`I type {string} to {string} input`, (text, id) => {
  cy.get(`input${id}`).type(text)
})

When(`I select from date selector`, () => {
  cy.get('select').select('2021-05-14')
})

Then(`I expect {string} to exist`, classname => {
  cy.get(classname).should('exist')
})

Then(`I expect {string} not to exist`, classname => {
  cy.get(classname).should('not.exist')
})

Then(`I expect {string} button to be {string}`, (text, state) => {
  const isDisabled = state === 'disabled'
  cy.get('button')
    .contains(text)
    .should(`${isDisabled ? '' : 'not.'}have.attr`, 'aria-disabled', 'true')
})

Then(`I expect date selector to be {string}`, state => {
  const isDisabled = state === 'disabled'
  cy.get('select').should(`${isDisabled ? '' : 'not.'}be.disabled`)
})

Then(`I expect {string} to be checked`, value => {
  cy.get(`input[value=${value}]`).should('be.checked')
})
