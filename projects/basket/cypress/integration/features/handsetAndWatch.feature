@handset-with-watch
Feature: Handset with watch
  Scenario: Should load a PAYM handset with a watch
    Given I have a PAYM handset with add ons and a watch with add ons
    Then I do expect the text "Apple iPhone 11 Pro Max 64GB Midnight Green" to be visible
    Then I do expect the text "Red 24GB" to be visible
    Then I do expect the text "Damage and breakdown cover plus AppleCare Services" to be visible
    Then I do expect the text "100 International Texts" to be visible
    Then I do expect the text "Apple Watch Series 6 (GPS+4G) Cellular 44mm Aluminium Space Grey+Nike Band" to be visible
    Then I do expect the text "Damage and breakdown cover" to be visible
    Then I do expect the text "Connectivity Plan shares data, texts & minutes with your Airtime Plan." to be visible
    Then I expect data-selector "basket-header-action-package-1" to be enabled
    Then I expect data-selector "basket-header-action-damage-and-breakdown-cover-plus-applecare-services" to be enabled
    Then I expect data-selector "basket-header-action-100-international-texts" to be enabled
    Then I expect data-selector "basket-header-action-apple-watch-series-6-gps4g-cellular-44mm-aluminium-space-greynike-band" to be enabled
    Then I expect data-selector "basket-header-action-damage-and-breakdown-cover" to be enabled
    Then I see 2 "Add Ons" within a 'h5'
    Then I see 1 "Phone total" within a 'h5'
    Then I see 1 "Watch total" within a 'h5'
    Then I see 1 "Total cost" within a 'h4'
    When I click data-selector "checkout-button"
    Then I am on the Checkout page