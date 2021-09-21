@multi-discount
Feature: Multi discount
  Scenario: Should show limited discount message
    Given I have a basket with limited discount
    Then I do see the discount text
    Then I do expect the text "Monthly*" to be visible
    Then I do expect the text "*Includes time-limited discounts." to be visible
    Then I see discount with red colour

  Scenario: Should not show discounts if none applicable
    Given I have a basket with no discount
    Then I do not see the discount text

  Scenario: Should show handset prices
    Given I have a bingo handset package
    Then I do expect to see handset prices

  Scenario: Should show discounted packages for customer
    Given I am a normal customer with a discounted package
    Then I do see the discount text
    Then I see discount with red colour
    Then I do expect the text "£6 Trade In Promotional discount" to be visible
    Then I see "Ex. VAT" price in row 1
    Then I see "20% VAT" price in row 2

  Scenario: Should show discounted packages for business customer
    Given I am a business customer with a discounted package
    Then I do expect the text "ex VAT" to be visible
    Then I do see the discount text
    Then I see discount with red colour
    Then I do expect the text "£6 Trade In Promotional discount" to be visible
    Then I see "Ex. VAT" price in row 1
    Then I see "20% VAT" price in row 2

  Scenario: Should show discounted upgrade packages
    Given I have a discounted upgrade package
    Then I do expect the text "Your upgrade order" to be visible
    Then I see discount with teal colour
    Then I do see the discount text

  Scenario: Should show combi and watch correctly
    Given I have a combi and watch package
    Then I do see the discount text
    Then I see discount with red colour
    Then I do expect the text "Watch total" to be visible
    Then I see Change button to be visible 3 times
