@data-speed
Feature: Data Speed
  Scenario: Should not show speed message for limited plan
    Given I have a basket with limited plan
    Then I do not expect the text "Speed:" to exist

  Scenario: Should show speed message for unlimited plan
    Given I have a basket with unlimited plan
    Then I do expect the text "Speed: Maximum download of 10 Mbps" to be visible

    When I click data-selector "data-speed"
    Then I do expect the text "Details on speed" to be visible

  Scenario: Should show speed message for unlimited-max plan
    Given I have a basket with unlimited-max plan
    Then I do expect the text "Speed: fastest available" to be visible

    When I click data-selector "data-speed"
    Then I do expect the text "Details on speed" to be visible

  Scenario: Should show speed message for unlimited lite plan
    Given I have a basket with unlimited-lite plan
    Then I do expect the text "Speed: Maximum download of 2 Mbps" to be visible

    When I click data-selector "data-speed"
    Then I do expect the text "Details on speed" to be visible
