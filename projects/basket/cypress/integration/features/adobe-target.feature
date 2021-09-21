@adobeTarget
Feature: Adobe Target

  Scenario: Hide upfront zeros prices
    Given I have a consumer basket with AB hideUpfrontZeros feature flag enabled
    Then I should not see the upfront cost zero price

  Scenario: Plan Benefits with version 2 chevron for HBB
    Given I have a basket with variant2 version and with HBB AB feature flag enabled
    Then I do expect the text "See all benefits" to be visible
    Then I do not expect the text "Dedicated WiFi Xperts" to be visible
    When I click See all benefits chevron
    Then I do expect the text "Dedicated WiFi Xperts" to be visible
    Then I do expect the text "12 Months Free Norton" to be visible

  Scenario: Plan Benefits with bingo
    Given I have a basket with simo+handset+broadband packages with control version and with feature flags enabled
    Then I do not expect the text "See all benefits" to exist

  Scenario: Plan Benefits with non bingo, variant1 version
    Given I have a basket with simo+handset+broadband packages with variant1 version
    Then I do expect the text "See all benefits" to be visible
    Then I do not expect the text "Unlimited texts" to exist
    When I click See all benefits
    Then I do expect the text "Plan benefits" to be visible
    Then I do expect the text "3-in-1 SIM" to be visible
    Then I do expect the text "Unlimited texts" to be visible
    Then I do expect the text "3-month free trial of Secure Net" to be visible

  Scenario: Plan Benefits with bingo,variant1 version
    Given I have a basket with simo+handset+broadband packages with variant1 version and with feature flags enabled
    Then I do expect the text "See all benefits" to be visible
    Then I do not expect the text "Unlimited texts" to exist
    When I click See all benefits
    Then I do expect the text "Plan benefits" to be visible
    Then I do expect the text "3-in-1 SIM" to be visible
    Then I do expect the text "Unlimited texts" to be visible
    Then I do expect the text "3-month free trial of Secure Net" to be visible
    Then I do expect the text "See finance breakdown" to be visible

  Scenario: HBB Plan Benefits with variant1 version
    Given I have a basket with variant1 version and with HBB AB feature flag enabled
    Then I do expect the text "See all benefits" to be visible
    Then I do not expect the text "Dedicated WiFi Xperts" to exist
    When I click See all benefits
    Then I do expect the text "Plan benefits" to be visible
    Then I do expect the text "Dedicated WiFi Xperts" to be visible

  Scenario: Plan Benefits with version 2 chevron
    Given I have a basket with variant2 chevron version and with chevron feature flag enabled
    Then I do expect the text "See all benefits" to be visible
    Then I should not see all benefits chevron content
    When I click See all benefits chevron
    Then I should see all benefits chevron content
    Then I do expect the text "3-in-1 SIM" to be visible
    Then I do expect the text "Device Care" to be visible
    Then I do expect the text "£3.50pm off Smartwatch Connectivity Plan" to be visible
    Then I do expect the text "Unlimited minutes" to be visible

  Scenario: Show double Total Costs
    Given I have a consumer basket with AB showDoubledTotalCost feature flag enabled
    Then I should only see one CTA buttons group
    Then I see 2 "Total cost" within a 'h4'

  Scenario: Show storage colour details
    Given I have a consumer basket with AB showStorageColourIcons feature flag enabled
    Then I should see the StorageColourDetails component

  Scenario: Show size colour details
    Given I have a consumer basket with a smartwatch and AB showStorageColourIcons feature flag enabled
    Then I should see the SizeColourDetails component
