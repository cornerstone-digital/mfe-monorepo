@simo
Feature: Simo

  Scenario: Bingo Simo Upgrade
    Given I have a bingo simo upgrade package
    Then I do expect the text "Your upgrade order" to be visible
    Then I do expect the text "For number 447000000000" to be visible
    Then I do not expect the text "Continue shopping" to exist
    Then I do expect to see data-selector "bullets"
    Then I do expect a field with id "journeyId" containing value "https://www.vodafone.co.uk/mobile/best-sim-only-deals?planId=111990&login=true"
    Then I do expect the text "24-month Airtime Plan" to be visible
    Then I do expect the text "Unlimited minutes" to be visible
    Then I do expect the text "Unlimited texts" to be visible
    Then I do expect the text "Unlimited picture messages" to be visible
    Then I do not expect the text "Your monthly bill will decrease once you have made all your Phone Plan" to exist
    When I click data-selector "checkout-button"
    Then I am on the Checkout page

  Scenario: Bingo Simo
    Given I have a bingo simo package
    Then I do expect the text "24-month Airtime Plan" to be visible
    Then I do expect the text "Unlimited minutes" to be visible
    Then I do expect the text "Unlimited texts" to be visible
    Then I do expect the text "Unlimited picture messages" to be visible
    Then I do not expect the text "Your monthly bill will decrease once you have made all your Phone Plan" to exist

  Scenario: Basic Simo hides data Add-Ons
    Given I have a basic simo package with data addons
    Then I do not expect the text "2GB additional data" to exist
    Then I do not expect the text "2GB data allowance" to exist
