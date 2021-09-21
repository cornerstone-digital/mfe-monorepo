@contract-subtitles
Feature: Contract subtitles
  Scenario: Should show contract subtitle Phone plan
    Given I have a basket with Bingo Plan
    Then I do expect the text "Apple iPhone 8 64GB Gold BINGO" to be visible
    Then I do expect the text "24-month Phone Plan" to be visible
    Then I do expect the text "Bingo Test A Gold 24 month 5GB" to be visible
    Then I do expect the text "12-month Airtime Plan" to be visible

  Scenario: Should show contract subtitle for Watch only plan
    Given I have a basket with Post-Bingo Watch only plan
    Then I do expect the text "24-month Watch Plan" to be visible

  Scenario: Should show contract subtitle for Data SIMO plan
    Given I have a basket with Data simo plan
    Then I do expect to see "2GB Data SIM Plan - 12 months" in section 1
    Then I do expect to see "12-month Data Plan" in section 1

  Scenario: Should show contract subtitle for tablet plan
    Given I have a basket with tablet plan
    Then I do not expect to see "Plan" in section 1
    Then I do expect to see "Unlimited Max" in section 2
    Then I do expect to see "24-month Device Plan" in section 2

  Scenario: Should show contract subtitle for dongle plan
    Given I have a basket with dongle plan
    Then I do expect to see "Vodafone K5161 Dongle" in section 1
    Then I do not expect to see "Plan" in section 1
    Then I do expect to see "6GB Dongle or Mobile Wi-Fi Plan - 12 months" in section 2
    Then I do expect to see "12-month Device Plan" in section 2

  Scenario: Should show contract subtitle for broadband plan
    Given I have a basket with broadband plan
    Then I do expect to see "Vodafone Wi-Fi Hub" in section 2
    Then I do expect to see "24-month Broadband Plan" in section 1
    Then I do not expect to see "Plan" in section 2

  Scenario: Should show contract subtitle for small business plan
    Given I have a Small Business basket
    Then I do expect the text "24-month Plan" to be visible

  Scenario: I have a handset plan and a watch plan
    Given I have a basket with a bingo handset and a bingo watch
    Then I do expect the text "Apple iPhone 11 Pro Max 64GB Midnight Green" to be visible
    Then I do expect the text "3-month Phone Plan" to be visible
    Then I do expect the text "12m Unlimited Bronze Airtime Plan with 100m to EU and Entertainment" to be visible
    Then I do expect the text "12-month Airtime Plan" to be visible
    Then I do expect the text "Your monthly bill will decrease once you have made all your Phone Plan" to be visible
    Then I do expect the text "Apple Watch Series 6" to be visible
    Then I do expect the text "3-month Watch Plan" to be visible
    Then I do expect the text "24mth OneNumber for Watch" to be visible
    Then I do expect the text "30-day Connectivity Plan" to be visible
    Then I do expect the text "Your monthly bill will decrease once you have made all your Watch Plan" to be visible
