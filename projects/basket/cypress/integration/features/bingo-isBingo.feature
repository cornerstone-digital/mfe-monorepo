@bingo
Feature: Bingo
  @visual
  Scenario: has no unexpected visual changes
    Given I have a second line bingo watch basket
    Then I expect the full page to visually match the snapshot

  @visual
  Scenario: review mode has no unexpected visual changes
    Given I have a second line bingo watch basket in review mode
    Then I expect the full page to visually match the snapshot

  Scenario: Should see finance details and modal
    Given I have a bingo handset package
    Then I do expect the text "See finance breakdown" to be visible
    When I click the "See finance breakdown" button
    Then I do expect the text "Your Phone Plan" to be visible
    Then I do expect the text "Total Phone cost" to be visible
    Then I do expect the text "Your Airtime Plan" to be visible
    Then I do expect the text "24-month contract" to be visible
    Then I do not expect the text "(ex VAT)" to exist

  Scenario: Should see (ex vat) label in finance details modal for business customer
    Given I am a business customer with a bingo handset package
    Then I do expect the text "See finance breakdown" to be visible
    When I click the "See finance breakdown" button
    Then I expect the text "24 months" to be visible 1 times in a table cell
    Then I expect the text "(ex VAT)" to be visible 7 times in a table cell

  Scenario: Should see bulleted points
    Given I have a bingo handset package
    Then I expect data-selector "bullets" to be enabled
    Then I do expect the text "Unlimited picture messages" to be visible

  Scenario: Should see handset cost breakdown
    Given I have a bingo handset package
    Then I do expect to see prices in package 1 and section 3
    Then I do expect the text "24-month Airtime Plan" to be visible

  Scenario: Should see vat breakdown when a handset loan is in basket
    Given I have a bingo handset package
    Then I do expect the text "Ex. VAT" to be visible
    Then I do expect the text "20% VAT" to be visible
    Then I do expect the text "Total cost" to be visible

  Scenario: should only see "Your basket" once
    Given I have a bingo handset package
    Then I expect the text "Your basket" to be visible 1 time

  Scenario: should see finance breakdown for both phone and watch
    Given I have a bingo basket with a phone and a watch financed plan
    Then I do not expect the text "On a 24-month phone credit agreement" to exist
    Then I do not expect the text "Representative 0.0% APR" to exist
    Then I expect to see two "See finance breakdown" buttons
    Then I do expect the text "Connectivity Plan shares data, texts & minutes with your Airtime Plan." to be visible
    Then I do not expect the text "Number associated with the watch:" to exist
    Then I do not expect the text "You've chosen to connect this smart watch to this mobile number." to exist

  Scenario: Should see all relevant smart watch connectivity text for secondline bingo watch
    Given I have a second line bingo watch basket
    Then I do expect the text "Connectivity Plan shares data, texts & minutes with your Airtime Plan." to be visible
    Then I do expect the text "Number associated with the watch: 447000000025" to be visible
    Then I do expect the text "You've chosen to connect this smart watch to this mobile number." to be visible

  Scenario: Should hide subtotals, financial button and individual monthly and upfront prices for Small Businesses
    Given I have a Small Business basket
    Then I do not expect the text "See finance breakdown" to exist
    Then I do expect the text "Subtotal" to be visible
    Then I do not expect the text "£22.26" to exist
    Then I expect the text "24-month Plan" to be visible 1 time
