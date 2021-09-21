@watch-packages
Feature: watch packages
  Scenario: Should allow remove and undo remove watch
    Given I have an apple watch in combi package
    When I remove one watch addOn
    Then I do expect the text "You removed Apple Watch SE (GPS+4G) Cellular 44mm Aluminium Space Grey" to be visible
    When I undo removed watch addOn
    Then I do not expect the text "You removed Apple Watch SE (GPS+4G) Cellular 44mm Aluminium Space Grey" to exist
    Then I do expect the text "Connectivity Plan shares data, texts & minutes with your Airtime Plan." to be visible

  Scenario: Should show bingo footer for watch only basket
    Given I have an apple watch package with add on
    Then I do expect the text "Your monthly bill will decrease once you have made all your Watch Plan" to be visible
