@accessories
Feature: Accessories
  Scenario: Discount should be shown for consumer
    Given I have a discounted accessory for consumer
    Then I do expect the text "Discount" to be visible
    Then I do expect the text "Accessories Discount save 10 pct" to be visible
    Then I do expect the text "Accessories Discount save £10" to be visible
    Then I do expect the text "-£47.35" to be visible
    Then I do expect the text "Package Total" to be visible
    Then I do expect the text "Total discount" to be visible

  Scenario: Discount should be shown for business customer
    Given I have a discounted accessory for business customer
    Then I do expect the text "Discount" to be visible
    Then I do expect the text "Accessories Discount save 10 pct" to be visible
    Then I do expect the text "Accessories Discount save £10" to be visible
    Then I do expect the text "-£39.45" to be visible
    Then I do expect the text "(ex VAT)" to be visible
    Then I do expect the text "Package Total" to be visible
    Then I do expect the text "-£47.35" to be visible
    Then I do expect the text "Total discount" to be visible

  Scenario: Sim Only Accessory Cross Sell
    Given I have a simo cross sell basket with an accessory
    Then I expect to see 6 basket items
    Then I do expect the text "Add Ons" to be visible
    Then I do expect the text "Leef iBridge external memory 16GB" to be visible

  Scenario: Pay As You Go With Multiple Accessories
    Given I have a PAYG handset with multiple accessories
    Then I expect to see 8 basket items
    Then I do expect the text "Apple iPhone 7 32GB Black" to be visible
    Then I do expect the text "OtterBox Symmetry Case for Apple iPhone 6/6S/7/8/SE Clear" to be visible
    Then I do expect the text "Apple Lightning to 3.5 mm Jack" to be visible
    Then I do expect the text "Pay as you go SIM" to be visible
    Then I do expect the text "£20 Big Value Bundle" to be visible
    Then I expect data-selector "basket-header-action-package-1" to be enabled
    Then I see 1 "Add Ons" within a 'h5'
    Then I see 1 "Subtotal" within a 'h5'
    Then I see 1 "£359" within a '.vfuk-BasketItem__basket-item-totals'
    When I click data-selector "checkout-button"
    Then I am on the Checkout page

  Scenario: User can remove/undo accessory
    Given I have a PAYG handset with multiple accessories
    When I remove one accessory addOn
    Then I do expect the text "You removed Apple Lightning to 3.5 mm Jack" to be visible
    When I undo removed accessory addOn
    Then I do expect the text "Apple Lightning to 3.5 mm Jack" to be visible
    Then I do not expect the text "Undo" to exist

  Scenario: Accessories with another package
    Given I have an Accessory package with handset
    When I remove Accessory package all accessories
    Then I do not expect the text "Are you sure you'd like to delete this package from your basket? This will empty your basket, and can't be undone." to exist
    When I remove package "package-2"
    Then I do expect the text "Delete package" to be visible
    Then I do expect the text "Are you sure you'd like to delete this package from your basket? This will empty your basket, and can't be undone." to be visible


  Scenario: Accessories planType package
    Given I have an Accessory package full with accessories
    When I remove Accessory package one accessory
    Then I do expect the text "You removed XQISIT Wireless Charger 10W Black" to be visible
    When I undo Accessory package removed accessory
    Then I do expect the text "XQISIT Wireless Charger 10W Black" to be visible
    Then I do not expect the text "Undo" to exist
    When I remove Accessory package all accessories
    Then I do expect the text "Are you sure you'd like to delete this package from your basket? This will empty your basket, and can't be undone." to be visible
