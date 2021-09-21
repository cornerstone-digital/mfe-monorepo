Given('I have a business empty basket', () => {
  cy.setCookie('customerSegment', 'business')
  cy.setScenarioMocks('clear-basket/empty-basket', true)
})

Given('I have a basket with a package having "smallBusiness" account sub category', () => {
  cy.setCookie('customerSegment', 'business')
  cy.setScenarioMocks('business/small-business', true)
})

Given('I have a basket with a package having "soleTrader" account sub category', () => {
  cy.setCookie('customerSegment', 'business')
  cy.setScenarioMocks('business/sole-trader', true)
})

Given('I have a basket with a package having "Consumer" account category', () => {
  cy.setCookie('customerSegment', '')
  cy.setScenarioMocks('business/consumer', true)
})
