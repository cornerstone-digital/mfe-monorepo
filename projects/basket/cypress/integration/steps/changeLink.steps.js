Then(`I expect a change button with data-selector {string} to be visible`, text => {
  cy.get(`.vfuk-ChangeLink__change-button[data-selector="${text}"]`).should('be.visible')
})

When(`a user clicks on the change button with data-selector {string}`, text => {
  cy.get(`.vfuk-ChangeLink__change-button[data-selector="${text}"]`).first().click()
})

Given(`I have a data device basket`, () => {
  cy.setScenarioMocks('data-device/default', true)
})

Given(`I have a tablet basket`, () => {
  cy.setScenarioMocks('data-only/default', true)
})
