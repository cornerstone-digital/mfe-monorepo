@bingo-loan-cancellation
Feature: Bingo Loan cancellation
  Scenario: Should show only phone decline message
    Given I have a basket with 1 loans with a cancelled "phone" loan
    Then I do expect the text "Still want to buy the device? Amend your order to create an agreement which is more suitable." to be visible
    Then I do expect the text "You've declined the agreement" to be visible

  Scenario: Should show phone decline message
    Given I have a basket with 2 loans with a cancelled "phone" loan
    Then I do expect the text "Amend your order to create an agreement that's more suitable. Note: you can't buy a smartwatch without a compatible phone, so you won't be able to continue if you remove the phone from your order." to be visible
    Then I do expect the text "You've declined the Phone Plan agreement" to be visible

  Scenario: Should show only watch decline message
    Given I have a basket with 1 loans with a cancelled "watch" loan
    Then I do expect the text "Still want to buy the device? Amend your order to create an agreement which is more suitable." to be visible
    Then I do expect the text "You've declined the agreement" to be visible

  Scenario: Should show watch decline message
    Given I have a basket with 2 loans with a cancelled "watch" loan
    Then I do expect the text "Amend your order to create an agreement that's more suitable. If you've changed your mind, remove the smartwatch from your order and continue with just the phone." to be visible
    Then I do expect the text "You've declined the Watch Plan agreement" to be visible