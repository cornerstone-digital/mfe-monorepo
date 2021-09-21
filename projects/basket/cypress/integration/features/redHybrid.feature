@data-speed
Feature: Red Hybrid
  Scenario: should be shown with sim icon
    Given I have a red hybrid plan basket with pyhsical sim
    Then I do expect the text "Flexi Plan" to be visible
    Then I do expect the text "Total Cost" to be visible
    Then I do expect the text "(VAT included)" to be visible
    Then I do not expect the text "Joining us from another network?" to exist

  Scenario: should be shown with esim icon
    Given I have a red hybrid plan basket with esim
    Then I do expect the text "Flexi Plan" to be visible
    Then I do expect the text "Joining us from another network?" to be visible
    Then I do expect the text "Total Cost" to be visible
    Then I do expect the text "(VAT included)" to be visible

