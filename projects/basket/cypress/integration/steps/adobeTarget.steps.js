import { Given } from 'cypress-cucumber-preprocessor/steps'

When('I click See all benefits', () => {
  cy.get('[data-selector="see-all-benefits"]').first().click({ force: true })
})

When('I click See all benefits chevron', () => {
  cy.get('.vfuk-BlockContainer__header-can-collapse').first().click({ force: true })
})

Then('I should not see the upfront cost zero price', () => {
  cy.get('[data-selector="cost-upfront"] >p > span:nth-child(1)').contains('£0').should('not.exist')
})

Then('I should see all benefits chevron content', () => {
  cy.get('article').first().get('.vfuk-BlockContainer__hidden-content').should('not.be.visible')
})

Then('I should not see all benefits chevron content', () => {
  cy.get('article').first().get('.vfuk-BlockContainer__hidden-content').should('exist')
})

Then('I should only see one CTA buttons group', () => {
  cy.get('[data-selector="checkout-button"]').should('have.length', 1)
  cy.get('[data-selector="continue-shopping-button"]').should('have.length', 1)
})

Then('I should see the StorageColourDetails component', () => {
  cy.get('[data-selector="storage-colour-details"]').should('exist')
})

Then('I should see the SizeColourDetails component', () => {
  cy.get('[data-selector="size-colour-details"]').should('exist')
})

Given('I have a basket with simo+handset+broadband packages with control version', () => {
  cy.setScenarioMocks('adobe-target/plan-benefits', true)
})

Given('I have a basket with simo+handset+broadband packages with control version and with feature flags enabled', () => {
  cy.setScenarioMocks('adobe-target/plan-benefits', true)
})

Given('I have a basket with simo+handset+broadband packages with variant1 version', () => {
  cy.setCookie('planBenefitsAB', 'true')
  cy.setScenarioMocks('adobe-target/plan-benefits', true)
})

Given('I have a basket with simo+handset+broadband packages with variant1 version and with feature flags enabled', () => {
  cy.setCookie('planBenefitsAB', 'true')
  cy.setScenarioMocks('adobe-target/plan-benefits', true)
})

Given('I have a basket with variant1 version and with HBB AB feature flag enabled', () => {
  cy.setCookie('planBenefitsABHBB', 'true')
  cy.setScenarioMocks('adobe-target/plan-benefits-hbb', true)
})

Given('I have a basket with variant2 chevron version and with chevron feature flag enabled', () => {
  cy.setCookie('planChevronAB', 'true')
  cy.setScenarioMocks('adobe-target/plan-benefits-chevron', true)
})

Given('I have a basket with variant2 version and with HBB AB feature flag enabled', () => {
  cy.setCookie('planChevronABHBB', 'true')
  cy.setScenarioMocks('adobe-target/plan-benefits-chevron-hbb', true)
})

Given('I have a consumer basket with AB showDoubledTotalCost feature flag enabled', () => {
  cy.setCookie('showDoubledTotalCost', 'true')
  cy.setScenarioMocks('adobe-target/plan-benefits', true)
})

Given('I have a consumer basket with AB hideUpfrontZeros feature flag enabled', () => {
  cy.setCookie('hideUpfrontZeros', 'true')
  cy.setScenarioMocks('adobe-target/upfront-zeros', true)
})

Given('I have a consumer basket with AB showStorageColourIcons feature flag enabled', () => {
  cy.setCookie('showStorageColourIcons', 'true')
  cy.setScenarioMocks('adobe-target/storage-capacity', true)
})

Given('I have a consumer basket with a smartwatch and AB showStorageColourIcons feature flag enabled', () => {
  cy.setCookie('showStorageColourIcons', 'true')
  cy.setScenarioMocks('adobe-target/watch-size', true)
})
