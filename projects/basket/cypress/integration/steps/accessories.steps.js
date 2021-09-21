import { Given } from 'cypress-cucumber-preprocessor/steps'

Given('I have a simo cross sell basket with an accessory', () => {
  cy.setScenarioMocks('accessories/simo-cross-sell', true)
})

Given('I have a PAYG handset with multiple accessories', () => {
  cy.setValidateMock()
  cy.setScenarioMocks('accessories/with-multiple-accessories', true)
})

Given('I have a discounted accessory for consumer', () => {
  cy.setScenarioMocks('accessories/with-consumer-discount', true)
})

Given('I have a discounted accessory for business customer', () => {
  cy.setScenarioMocks('accessories/with-business-discount', true)
})

Given('I have an Accessory package full with accessories', () => {
  cy.setScenarioMocks('accessories/accessory-package', true)
})

Given('I have an Accessory package with handset', () => {
  cy.setScenarioMocks('accessories/with-multiple-packages', true)
})

When('I remove one accessory addOn', () => {
  cy.setScenarioMock('accessories/remove-accessory-addon', 'post', '**/productLine/**')
  cy.get('[data-selector="basket-header-action-apple-lightning-to-35-mm-jack"]').first().click()
})

When('I undo removed accessory addOn', () => {
  cy.setScenarioMock('accessories/undo-accessory-addon', 'post', '**/package/**/product')
  cy.contains('Undo').first().click()
})

When('I remove Accessory package one accessory', () => {
  cy.setScenarioMock('accessories/remove-accessory-addon', 'post', '**/productLine/**')
  cy.get('[data-selector="basket-header-action-xqisit-wireless-charger-10w-black"]').first().click()
})

When('I undo Accessory package removed accessory', () => {
  cy.setScenarioMock('accessories/undo-accessory-addon', 'post', '**/package/**/product')
  cy.contains('Undo').first().click()
})

When('I remove Accessory package all accessories', () => {
  cy.setScenarioMock('accessories/remove-accessory-addon', 'post', '**/productLine/**')
  cy.get('[data-selector="basket-header-action-xqisit-wireless-charger-10w-black"]').first().click()
  cy.get('[data-selector="basket-header-action-apple-earpods-lightning-white"]').first().click()
  cy.get('[data-selector="basket-header-action-invisibleshield-glass-elite-clear"]').first().click()
})
