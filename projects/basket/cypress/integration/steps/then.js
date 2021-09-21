import { Then } from 'cypress-cucumber-preprocessor/steps'

Then(`I do expect the text {string} to be visible`, text => {
  cy.contains(text).should('be.visible')
})

Then(`I do expect the text {string} to have {string} color`, (text, color) => {
  const colors = {
    black: 'rgb(51, 51, 51)',
    brand: 'rgb(230, 0, 0)',
    upgrade: 'rgb(0, 124, 146)',
  }
  cy.contains(text).should('have.css', 'color', colors[color])
})

Then(`I do not expect the text {string} to exist`, text => {
  cy.contains(text).should('not.exist')
})

Then(`I do not expect the text {string} to be visible`, text => {
  cy.contains(text).should('not.be.visible')
})

Then(`I expect the text {string} to be visible 1 time`, text => {
  cy.contains(text).should('be.visible').and('have.length', 1)
})

Then(`I expect the text {string} to be visible {int} times in a table cell`, (text, number) => {
  cy.get('td:contains(' + text + ')').should('have.length', number)
})

Then(`I expect data-selector {string} to be enabled`, text => {
  cy.get('[data-selector="' + text + '"]').should('be.visible')
})

Then(`I expect data-selector {string} to be disabled`, text => {
  cy.get('[data-selector="' + text + '"][aria-disabled=true]').should('be.visible')
})

Then(`I do expect to see data-selector {string}`, text => {
  cy.get('[data-selector="' + text + '"]').should('be.visible')
})

Then(`I do not expect to see data-selector {string}`, text => {
  cy.get('[data-selector="' + text + '"]').should('not.exist')
})

Then(`I do expect to see prices in package 1 and section 3`, () => {
  cy.get(`div.vfuk-Section__section.bg-light1:nth-child(2) article:nth-child(2)`).contains('£').should('be.visible')
})

Then(`I expect to see an error with message {string}`, text => {
  cy.get('.vfuk-Notification__content').contains(text).should('be.visible')
})

Then(`I do expect to see {string} in section 1`, text => {
  cy.get('article:nth-child(1)').contains(text).should('be.visible')
})

Then(`I do not expect to see {string} in section 1`, text => {
  cy.get('article:nth-child(1)').contains(text).should('not.exist')
})

Then(`I do expect to see {string} in section 2`, text => {
  cy.get('article:nth-child(2)').contains(text).should('be.visible')
})

Then(`I do not expect to see {string} in section 2`, text => {
  cy.get('article:nth-child(2)').contains(text).should('not.exist')
})

Then(`I do expect a field with id {string} containing value {string}`, (id, value) => {
  cy.get(`#${id}`).should('have.value', value)
})

Then(`I see {int} {string} within a {string}`, (number, text, element) => {
  cy.get(element + ':contains(' + text + ')').should('have.length', number)
})

Then(`I expect to see {int} basket items`, number => {
  cy.get('article').should('have.length', number)
})

Then(`I am on the Checkout page`, () => {
  cy.url().should('include', '/secure-checkout')
})

Then(`I see image with src {string}`, text => {
  cy.get('[src="' + text + '"]').should('be.visible')
})

Then(`I {} expect to see handset prices`, showPrice => {
  if (showPrice === 'do not') {
    cy.get(`article:nth-child(1)`).contains('£').should('not.exist')
  } else if (showPrice === 'do') {
    cy.get(`article:nth-child(1)`).contains('£').should('be.visible')
  }
})

Then(`I {} see the discount text`, showPrice => {
  if (showPrice === 'do not') {
    cy.contains('Discount').should('not.exist')
    cy.contains('Package Total').should('not.exist')
    cy.contains('Total discount').should('not.exist')
  } else if (showPrice === 'do') {
    cy.contains('Discount').should('be.visible')
    cy.contains('Package Total').should('be.visible')
    cy.contains('Total discount').should('be.visible')
  }
})

Then(`I see discount with red colour`, () => {
  cy.get('.vfuk-FormattedDiscount__discount').should('be.visible')
})

Then(`I see discount with teal colour`, () => {
  cy.get('.vfuk-FormattedDiscount__discount-upgrade').should('be.visible')
})

Then(`I see {string} price in row {int}`, (price, row) => {
  cy.get('.vfuk-CostRow__cost-row').eq(row).contains(price).should('be.visible')
})

Then(`I do not expect to see prices in package 1 and section 1`, () => {
  cy.get(`div.vfuk-Section__section.bg-light1:nth-child(2) article:nth-child(1)`).contains('£').should('not.exist')
})

Then(`I do expect data-selector {string} to be checked`, text => {
  cy.get('[data-selector="' + text + '"]').should('be.checked')
})

Then(`I wait {int} seconds`, seconds => {
  cy.wait(seconds * 1000)
})

Then(`I see Change button to be visible {int} times`, number => {
  cy.get('.vfuk-ChangeLink__change-button').should('be.visible').and('have.length', number)
})

Then('I wait for {string} request with {int}', (alias, statusCode) => {
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', statusCode)
})

Then('I expect the url to change and contain {string}', text => {
  cy.on('url:changed', newUrl => {
    expect(newUrl).to.contain(text)
  })
})

Then(`I expect the full page to visually match the snapshot`, () => {
  const test = cy.state('ctx').test
  const testTitle = `${test?.parent?.title} - ${test?.title}`
  cy.screenshotPage(testTitle)
})
