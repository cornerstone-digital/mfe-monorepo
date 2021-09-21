@tradeIn
Feature: Trade In
  Scenario: should show message and CTA for Monthly payments
    Given I have a basket with TradeIn of type "monthly"
    Then I do expect the text "Your guaranteed trade-in" to be visible
    Then I do expect the text "£39 for 10 months" to be visible
    Then I do expect the text "(Applied instantly to your Airtime Plan bill)" to be visible
    Then I do not expect the text "Your savings" to exist
    Then I do not expect the text "Your discount" to exist
    Then I do not expect the text "Trade-in saving is applied to Airtime Plan first" to exist

  Scenario: should show message and CTA for One off credit
    Given I have a basket with TradeIn of type "oneoff"
    Then I do expect the text "Your guaranteed trade-in" to be visible
    Then I do expect the text "£380 trade-in credit" to be visible
    Then I do not expect the text "Your savings" to exist
    Then I do not expect the text "Your discount" to exist

  Scenario: should show message and CTA for BACS transfer
    Given I have a basket with TradeIn of type "bacs"
    Then I do expect the text "Your guaranteed trade-in" to be visible
    Then I do expect the text "£380.40 bank transfer" to be visible
    Then I do not expect the text "Your savings" to exist
    Then I do not expect the text "Your discount" to exist

  Scenario: should show more detail
    Given I have a basket with TradeIn of type "bacs"
    When I click data-selector "see-more-trade-in"
    Then I do expect the text "Your quote details" to be visible
    Then I do expect the text "Unique code:" to be visible
    Then I do expect the text "15670678-b46d-4cef-8d3a-2ce5b2516c63" to be visible
    Then I do expect the text "Expiry date:" to be visible
    Then I do expect the text "20th May 2022" to be visible
    Then I do expect the text "Your trade-in device:" to be visible
    Then I do expect the text "Apple iPhone11pro 256Gb black" to be visible
    Then I do not expect the text "Your savings" to exist
    Then I do not expect the text "Your discount" to exist

  Scenario: should show error when the quote has expired
    Given I have a basket with an expired TradeIn of type "bacs"
    When I click data-selector "checkout-button"
    Then I expect to see an error with message "Your trade-in code has expired"
    Then I do expect the text "To trade in this phone, you'll need to complete our Trade-in Tool checks again to get a new code." to be visible
    Then I do expect the text "Get new code" to be visible
    Then I expect data-selector "notification-cta-button" to be enabled
    Then I expect data-selector "checkout-button" to be disabled

  Scenario: should remove and undo a tradeIn package
    Given I have a basket with TradeIn of type "monthly"
    Given The remove trade-in package endpoint works successfully
    When I click tradeIn remove button
    Then I wait for "removeTradeInPackageRequest" request with 200
    Then I do expect the text "You removed your guaranteed trade-in" to be visible
    Given The undo trade-in package endpoint works successfully
    When I click removed tradeIn undo button
    Then I wait for "undoTradeInPackageRequest" request with 200
    Then I do expect the text "Your guaranteed trade-in" to be visible

  Scenario: should go previous state when remove tradeIn package is failed
    Given I have a basket with TradeIn of type "monthly"
    Given The remove trade-in package endpoint is failed
    When I click tradeIn remove button with broken api
    Then I wait for "packageUpdateBadRequest" request with 500
    Then I do expect the text "Your guaranteed trade-in" to be visible
    Then I do expect the text "Something isn't right with your upfront payment amount." to be visible
    Then I do expect the text "You need to change your upfront cost." to be visible

  Scenario: should have different titles when trade-in with discounts
    Given I have a basket with TradeIn of type "bacs/with-discounts"
    Then I do expect the text "Your savings" to be visible
    Then I do expect the text "Your savings" to have "brand" color
    Then I do expect the text "Your discount" to be visible
    Then I do expect the text "Your discount" to have "black" color

  Scenario: should have different titles when trade-in with discounts with upgrade
    Given I have a basket with TradeIn of type "bacs/with-upgrade-discounts"
    Then I do expect the text "Your savings" to be visible
    Then I do expect the text "Your discount" to have "black" color
    Then I do expect the text "Your discount" to be visible
    Then I do expect the text "Your savings" to have "upgrade" color
  
  Scenario: should show tactical discount text when discount price greater than airtime monthly price
    Given I have a basket with TradeIn of type "strategic/greater-than-airtime"
    Then I do expect the text "Trade-in saving is applied to Airtime Plan first" to be visible

  Scenario: should not show tactical discount text when discount price smaller than airtime monthly price
    Given I have a basket with TradeIn of type "strategic/less-than-airtime"
    Then I do not expect the text "Trade-in saving is applied to Airtime Plan first" to exist

  Scenario: should show tactical discount text when a watch combi package
    Given I have a basket with TradeIn of type "strategic/watch-combi"
    Then I do expect the text "Watch total" to be visible
    Then I do expect the text "Trade-in saving is applied to Airtime Plan first" to be visible