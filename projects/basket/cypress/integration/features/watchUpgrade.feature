@watchUpgrade
Feature: Watch Upgrades
  Scenario Outline: Watch Simo Upgrade
    Given I have a watch simo upgrade package
    Then I do expect the text "Your upgrade order" to be visible
    Then I do not expect the text "Continue shopping" to exist
    Then I do expect the text "30-day Connectivity Plan" to be visible
    Then I do expect the text "OneNumber 30-day rolling" to be visible
    Then I do expect the text "Number associated with the watch: 071111111" to be visible
    Then I do expect the text "Connectivity Plan shares data, texts & minutes with your Airtime Plan."to be visible
  When I click data-selector "checkout-button"
    Then I am on the Checkout page
