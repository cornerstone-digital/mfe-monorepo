@empty
Feature: Empty Basket
  Background: Empty Basket
    Given I have an empty basket

  @visual
  Scenario: has no unexpected visual changes
    Then I expect the full page to visually match the snapshot

  @smoke
  Scenario: Should show empty basket
    Then I do expect the text "Your basket is empty" to be visible

  Scenario: BasketId hidden field should be included
    Then I do expect a field with id "basketId" containing value "https://www.vodafone.co.uk/basket?basketId=17a12ead-1e5c-447f-9f2d-6adb5e0b1be1"

  @smoke
  Scenario: Should show continue shopping modal
    When I click data-selector "continue-shopping-button"
    Then I do expect the text "What are you shopping for?" to be visible

  Scenario: Should show continue shopping modal with navigate options
    When I click data-selector "continue-shopping-button"
    Then I do expect the text "SIM only" to be visible
    Then I do expect the text "Phones" to be visible
    Then I do expect the text "Broadband" to be visible
    Then I do expect the text "Data only SIM" to be visible
    Then I do expect the text "Tablets" to be visible
    Then I do expect the text "Mobile Wi-Fi" to be visible
    Then I do expect the text "Smartwatches" to be visible
    Then I do expect the text "Accessories" to be visible

  Scenario: Should redirect to Browse our range of accessories
    When I click data-selector "continue-shopping-button"
    When I click on link contains href "/mobile/accessories?continueShopping=true"
    Then I expect the url to change and contain "/mobile/accessories?continueShopping=true"