@changelink
Feature: Change link
  Background: Change link AB Target is set
    Given I have "changeLinkAB" target value set to "true"
  # ===============================================
  # Change Handset Scenarios
  # ===============================================
  Scenario: Change handset in bingo basket
    Given I have a bingo handset package
    Then I expect a change button with data-selector "change-handset" to be visible
    When a user clicks on the change button with data-selector "change-handset"
    Then I expect the url to change and contain "/mobile/phones/pay-monthly-contracts/apple/iphone-11"

  Scenario: Change handset in combi watch basket
    Given I have a combi and watch package
    Then I expect a change button with data-selector "change-handset" to be visible
    When a user clicks on the change button with data-selector "change-handset"
    Then I expect the url to change and contain "/mobile/phones/pay-monthly-contracts/apple/iphone-11"
  
  Scenario: Change handset in paym handset package
    Given I have a paym handset package
    Then I expect a change button with data-selector "change-handset" to be visible
    When a user clicks on the change button with data-selector "change-handset"
    Then I expect the url to change and contain "/mobile/phones/pay-monthly-contracts/apple/iphone-11"

  # Scenario 4 - Change Handset -Vodafone Together (Broadband & Handset)

  # ===============================================
  # Change Watch Scenarios
  # ===============================================

  Scenario: Change watch in watch only basket
    Given I have an apple watch package with add on
    Then I expect a change button with data-selector "change-smart-watch" to be visible
    When a user clicks on the change button with data-selector "change-smart-watch"
    Then I expect the url to change and contain "/smart-watches-and-wearables/"

  Scenario: Change watch in combi watch basket
    Given I have a combi and watch package
    Then I expect a change button with data-selector "change-smart-watch" to be visible
    When a user clicks on the change button with data-selector "change-smart-watch"
    Then I expect the url to change and contain "/smart-watches-and-wearables/"

  # ===============================================
  # Change Broadband Plan
  # ===============================================

  Scenario: Change broadband in hbb refresh basket
    Given I have HBB refresh refresh package
    Then I expect a change button with data-selector "change-broadband" to be visible
    When a user clicks on the change button with data-selector "change-broadband"
    Then I expect the url to change and contain "broadband"

  Scenario: Change broadband in combi watch basket
    Given I have a combi and watch package
    Then I expect a change button with data-selector "change-broadband" to be visible
    When a user clicks on the change button with data-selector "change-broadband"
    Then I expect the url to change and contain "broadband"

  # ===============================================
  # Change SIMO Airtime Plan
  # ===============================================

  Scenario: Change SIMO airtime plan in SIMO upgrade
  Given I have a bingo simo upgrade package
    Then I expect a change button with data-selector "change-sim-only" to be visible
    When a user clicks on the change button with data-selector "change-sim-only"
    Then I expect the url to change and contain "/sim-only-deals"

  # ===============================================
  # Change PAYM Airtime Plan
  # ===============================================
  
  Scenario: Change airtime plan in paym handset package
    Given I have a paym handset package
    Then I expect a change button with data-selector "change-airtime" to be visible
    When a user clicks on the change button with data-selector "change-airtime"
    Then I expect the url to change and contain "#plans"

  # ===============================================
  # Change PAYG Airtime Plan
  # ===============================================

  Scenario: Change handset in combi watch basket
    Given I have a combi and watch package
    Then I expect a change button with data-selector "change-airtime" to be visible
    When a user clicks on the change button with data-selector "change-airtime"
    Then I expect the url to change and contain "#plans"

  # ===============================================
  # Change Data Only SIM
  # ===============================================

  Scenario: Change SIMO airtime plan in SIMO upgrade
  Given I have a tablet basket
    Then I expect a change button with data-selector "change-data-only-sim" to be visible
    When a user clicks on the change button with data-selector "change-data-only-sim"
    Then I expect the url to change and contain "/data-only-sim"

  # ===============================================
  # Change Data Device
  # ===============================================

  Scenario: Change SIMO airtime plan in SIMO upgrade
  Given I have a data device basket
    Then I expect a change button with data-selector "change-data-device" to be visible
    When a user clicks on the change button with data-selector "change-data-device"
    Then I expect the url to change and contain "mobile-broadband/pay-monthly-contracts"
