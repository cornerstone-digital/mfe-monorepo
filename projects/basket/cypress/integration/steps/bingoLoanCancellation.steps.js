import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I have a basket with {int} loans with a cancelled {string} loan`, (number, plan) => {
  cy.setScenarioMocks('bingo/loan-cancellation', false)
  cy.loadPage({ urlParams: '&validate=true' })
  window.sessionStorage.setItem('loanCancellationInfo', `{"numberOfLoans":"${number}","loanDeclinedType":"${plan}"}`)
})
