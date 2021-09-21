@hbbRefresh
Feature: HBB Refresh
  Scenario: Should show service icons
    Given I have HBB refresh refresh package
    Then I see image with src "/images/desktop/WiFi_Hub.png"
    Then I see image with src "/images/desktop/Super_WiFi.png"
    Then I see image with src "/images/desktop/Vodafone_K5160Name-grid-product-front.png"
    Then I see image with src "/images/desktop/Apple_TV.png"

  Scenario: Should show bundle description list
    Given I have HBB refresh refresh package
    Then I do expect the text "Pro Superfast 1 Xtra" to be visible
    Then I do expect the text "No price rises while in contract" to be visible
    Then I do expect the text "Dedicated WIFI experts" to be visible

  Scenario: Should show installation address
    Given I have HBB refresh refresh package
    Then I do expect the text "Installation address:" to be visible
    Then I do expect the text "98 Braywick Road, Maidenhead, SL6 1DJ" to be visible

  Scenario: Should show end of contract bill increase statement
    Given I have HBB refresh refresh package
    Then I do expect the text "Please note, your monthly bill will increase by £3 a month after your initial contract." to be visible

  Scenario: Should show included benefits
    Given I have HBB refresh refresh package
    Then I do expect the text "Included with Pro Superfast 1 Xtra" to be visible
    Then I do expect the text "Vodafone Wi-Fi Hub" to be visible
    Then I do expect the text "Super WiFi with WiFi Guarantee" to be visible
    Then I do expect the text "Vodafone 4G Dongle" to be visible
    Then I do expect the text "Apple 4K TV on us" to be visible

  Scenario: Should show router delivery statement
    Given I have HBB refresh refresh package
    Then I do expect the text "Your equipment will be delivered 3 days before your installation date which can be selected when you proceed to checkout." to be visible

  Scenario: Should not show hardware panel when no hardware included
    Given I have HBB refresh refresh package with no hardware
    Then I do not expect the text "Included with Pro Superfast 1 Xtra" to exist
    Then I do expect the text "Pro Superfast 1 Xtra" to be visible
    Then I do not expect the text "Your equipment will be delivered 3 days before your installation date which can be selected when you proceed to checkout." to exist
    Then I do not expect the text "12 Months Free Norton 360 Premium" to exist

  Scenario: Should show norton benefit
    Given I have HBB refresh refresh package with norton antivirus benefit
    Then I do expect the text "12 Months Free Norton 360 Premium" to be visible

  Scenario: Should show account number but should not show installation address for HBB upgrades
    Given I have HBB refresh refresh upgrade package
    Then I do expect the text "Your upgrade order" to be visible
    Then I do expect the text "For account number" to be visible
    Then I do not expect the text "Installation address:" to exist
    Then I do not expect the text "98 Braywick Road, Maidenhead, SL6 1DJ" to exist

  Scenario: Should load HBB Alexa built in hardware item
    Given I have a Basket which includes HBB Pro Superfast Xtra
    Then I do not expect the text "Super Wifi Booster" to exist
    Then I do expect the text "Included with Pro Superfast 2 Xtra with Alexa Built-In" to be visible
    Then I do expect the text "Super WiFi Plus With Alexa Built-In" to be visible

# Once data is available extend tests for £2/£3 discounts according to type of phone plan in basket (if any).
