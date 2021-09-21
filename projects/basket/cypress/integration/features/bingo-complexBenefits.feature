@complexBenefits
Feature: Bingo Complex Benefits
  Scenario: Should see Device Care in bundle description for gold unlimited 24m plan
    Given I have a bingo basket for gold 24m unlimited data plan
    Then I do expect the text "Device Care" to be visible
    Then I do not expect the text "3x Unlimited Data Booster" to exist
    Then I do not expect the text "6x Unlimited Data Booster" to exist

  Scenario: Should see Smartwatch Connectivity in bundle description for gold unlimited 24m plan
    Given I have a bingo basket for gold 24m unlimited data plan
    Then I do expect the text "Device Care" to be visible
    Then I do expect the text "£3.50pm off Smartwatch Connectivity Plan" to be visible

  Scenario: Should see Discount header with † sign in bundle description for business customer
    Given I am a business customer with a bingo handset with watch package
    Then I do expect the text "Discount †" to be visible
    Then I do expect the text "£3.50pm off Smartwatch Connectivity Plan" to be visible
    Then I do expect the text "† Prices shown include VAT unless otherwise stated, the VAT rate payable is 20% where standard VAT rate applies." to be visible
    Then I do expect the text "Monthly price shown plus all out of bundle charges will increase by the Consumer Price Index rate published in January of that year + an additional 3.9%." to be visible
    Then I do expect the text "If you have a Device Plan, this will not affect your monthly Device Plan. Adjusted amount from your April bill. Terms apply. See vodafone.co.uk/pricechanges for details." to be visible

  Scenario: Should see Smartwatch Connectivity with † sign in bundle description for business customer
    Given I am a business customer with Bingo_OneNumberRename enabled
    Then I do expect the text "£3.50pm off Smartwatch Connectivity Plan †" to be visible

  Scenario: Should see Device Care in bundle description for gold unlimited 12m plan
    Given I have a bingo basket for gold 12m unlimited data plan
    Then I do expect the text "Device Care" to be visible
    Then I do not expect the text "3x Unlimited Data Booster" to exist
    Then I do not expect the text "6x Unlimited Data Booster" to exist

  Scenario: Should see Device Care and 3xBooster in bundle description
    Given I have a bingo basket for gold 12m 6GB data plan
    Then I do expect the text "Device Care" to be visible
    Then I do expect the text "3x Unlimited Data Booster" to be visible
    Then I do not expect the text "6x Unlimited Data Booster" to exist

  Scenario: Should see Device Care and 6xBooster in bundle description
    Given I have a bingo basket for gold 24m 6GB data plan
    Then I do expect the text "Device Care" to be visible
    Then I do not expect the text "3x Unlimited Data Booster" to exist
    Then I do expect the text "6x Unlimited Data Booster" to be visible
