@addOns
Feature: Basket addOns
  Scenario: Should hide Engineering Visit add on when upfront is £0
    Given I have a BB package with Engineer visit upfront cost set to 0
    Then I do not expect the text "Engineer Visit" to exist

  Scenario: Should show Engineering Visit add on when upfront is £10
    Given I have a BB package with Engineer visit upfront cost set to 10
    Then I do expect the text "Engineer Visit" to be visible
