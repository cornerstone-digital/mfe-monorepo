@remove
Feature: Remove from basket
  Scenario: Customers are able to empty their basket
    Given I have a basket with multiple items
    When I click data-selector "empty-basket-button"
    Then I do expect the text "Are you sure?" to be visible
    Then I do expect the text "You're about to remove everything in your basket. You'll have to shop again if you wish to get these items back." to be visible
    When I click data-selector "confirm-empty-basket-button"
    Then I do expect the text "Your basket is empty" to be visible

  Scenario: Customers are able to remove multiple items
    Given I have a basket with multiple items
    When I remove package "package-1"
    Then I do expect the text "You removed Package 1" to be visible
    When I remove package "package-2"
    Then I do expect the text "Delete package" to be visible
    Then I do expect the text "Are you sure you'd like to delete this package from your basket? This will empty your basket, and can't be undone." to be visible
    When I click data-selector "delete-package-button"
    Then I do expect the text "Your basket is empty" to be visible

  Scenario: Customers are able to undo remove an item
    Given I have a basket with multiple items
    When I remove package "package-1"
    When I undo remove package "package-1"
    Then I do not expect the text "You removed Package 1" to exist
    Then I do expect the text "Unlimited Lite" to be visible
# todo: open it when we use cypress v7+
# Then I do expect the text "Samsung Galaxy S8 64GB Orchid Grey" to be visible
