import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I have a bingo basket for gold 24m unlimited data plan`, () => {
  cy.setScenarioMocks('bingo/benefits-gold-24m-unlimited', true)
})

Given(`I have a bingo basket for gold 12m unlimited data plan`, () => {
  cy.setScenarioMocks('bingo/benefits-gold-12m-unlimited', true)
})

Given(`I have a bingo basket for gold 12m 6GB data plan`, () => {
  cy.setScenarioMocks('bingo/benefits-gold-12m-6GB', true)
})

Given(`I have a bingo basket for gold 24m 6GB data plan`, () => {
  cy.setScenarioMocks('bingo/benefits-gold-24m-6GB', true)
})

Given(`I have a bingo handset package`, () => {
  cy.setScenarioMocks('bingo/default', true)
})

Given(`I have a Small Business basket`, () => {
  cy.setScenarioMocks('bingo/small-business-user', true)
})

Given(`I am a business customer with a bingo handset package`, () => {
  cy.setScenarioMocks('bingo/business-user', true)
})

Given(`I am a business customer with a bingo handset with watch package`, () => {
  cy.setScenarioMocks('bingo/business-watch-discount', true)
})

Given(`I have a bingo basket with a phone and a watch financed plan`, () => {
  cy.setScenarioMocks('bingo/watch-finance', true)
})

Given(`I am a business customer with Bingo_OneNumberRename enabled`, () => {
  cy.setScenarioMocks('bingo/business-user', true)
  cy.loadPage({ urlParams: '&bingo_onenumberrename=true' })
})

Given(`I have a second line bingo watch basket`, () => {
  cy.setScenarioMocks('bingo/watch-finance-secondline', true)
})

Given(`I have a second line bingo watch basket in review mode`, () => {
  cy.setScenarioMocks('bingo/watch-finance-secondline', true)
  cy.loadPage({ urlParams: '&reviewMode=true' })
})

Then(`I click the "See finance breakdown" button`, () => {
  // Without this the test is flaky because the click handler is not there on time
  cy.wait(400)
  cy.get('[data-selector=finance-button]').first().click()
})

Then(`I expect to see two "See finance breakdown" buttons`, () => {
  cy.get('[data-selector=finance-button]').should('have.length', 4) // two per section for responsiveness
})
