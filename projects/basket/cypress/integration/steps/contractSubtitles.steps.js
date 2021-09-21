import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I have a basket with Bingo Plan`, () => {
  cy.setScenarioMocks('contract-subtitles/bingo-airtime', true)
})

Given(`I have a basket with Post-Bingo Watch only plan`, () => {
  cy.setScenarioMocks('contract-subtitles/watch-only', true)
})

Given(`I have a basket with Data simo plan`, () => {
  cy.setScenarioMocks('contract-subtitles/data-only-sim', true)
})

Given(`I have a basket with tablet plan`, () => {
  cy.setScenarioMocks('contract-subtitles/tablet', true)
})

Given(`I have a basket with dongle plan`, () => {
  cy.setScenarioMocks('contract-subtitles/dongle', true)
})

Given(`I have a basket with broadband plan`, () => {
  cy.setScenarioMocks('contract-subtitles/broadband', true)
})

Given('I have a basket with a bingo handset and a bingo watch', () => {
  cy.setScenarioMocks('contract-subtitles/bingo-handset-and-watch', true)
})
