import { When } from 'cypress-cucumber-preprocessor/steps'

When(`I click data-selector {string}`, (text, clickOptions) => {
  cy.get(`[data-selector="${text}"]`).first().click(clickOptions)
})

When(`I click on link contains href {string}`, text => {
  cy.intercept('/mobile/accessories/**')
  cy.get(`a[href*="${text}"]`).click()
})
