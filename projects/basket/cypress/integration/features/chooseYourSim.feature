@eSim
Feature: eSIM Panel
  Scenario: Should show eSIM panel
    Given I have a sim card selected package
    Then I do expect the text "Choose your SIM" to be visible

  Scenario: Should show eSIM panel with eSIM option selected
    Given I have a eSim card selected package
    Then I do expect the text "Is your device eSIM compatible" to be visible

  Scenario: Should see eSIM modal prompt and open the modal
    Given I have a sim card selected package
    Then I do expect the text "What is an eSIM?" to be visible
    When I click data-selector "esim-modal-button"
    Then I do expect the text "What you need to know" to be visible

  Scenario: Should show eSIM panel with no option to change for device upgrades
    Given I am upgrading to a eSIM compatible device
    Then I do expect the text "SIM swap help page." to be visible

  Scenario: Should show eSIM panel with no option to change for simo upgrades
    Given I am upgrading my simo plan
    Then I do expect the text "SIM swap help page." to be visible

  # Scenario: Should allow choose SIM type from eSIM to SIM
  # Given I am changing sim card type from esim to sim
  # Then I do expect data-selector "esim" to be checked
  # When I select sim option
  # Then I do expect data-selector "sim" to be checked

  # Scenario: Should allow choose SIM type from SIM to eSIM
  # Given I am changing sim card type from sim to esim
  # Then I do expect data-selector "sim" to be checked
  # When I select esim option
  # Then I do expect data-selector "esim" to be checked