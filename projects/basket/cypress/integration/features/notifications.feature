@basketNotifications
Feature: Basket Notifications
  Scenario: PayG + PayM in the same basket
    Given I have basket contains payg and paym
    When I click data-selector "checkout-button"
    Then I wait for "validateRequest" request with 400
    Then I do expect the text "You cannot have Pay as You Go and Pay Monthly packages in the same Basket." to be visible
    Then I do expect the text "You'll need to remove the Pay as You Go or Pay Monthly package to continue. You can use the Remove Package buttons to do this." to be visible

  Scenario: should show "ctns concurrent loans" Notification Error message
    Given I have an invalid bingo basket of type "ctns-concurrent-loans"
    When I click data-selector "checkout-button"
    Then I expect to see an error with message "You already have two phone numbers in use with two Device Plans. You'll need to pay off a Device Plan on one of these phone numbers before you take out another."
    Then I expect data-selector "checkout-button" to be disabled
    Then I do expect the text "Pay-off a Device Plan" to be visible
    Then I expect data-selector "notification-cta-button" to be enabled

  Scenario: should show "loan invalid duration" Notification Error message
    Given I have an invalid bingo basket of type "invalid-duration"
    When I click data-selector "checkout-button"
    Then I expect to see an error with message "Something isn't right with the length of your Phone plan."
    Then I do expect the text "Change my plan length" to be visible
    Then I expect data-selector "notification-cta-button" to be enabled

  Scenario: should show "SME Incompatible mixed handset" Notification Error message
    Given I have an invalid bingo basket of type "sme-mixed-handset"
    When I click data-selector "checkout-button"
    Then I expect to see an error with message "You need to remove some items from your basket"
    Then I do expect the text "You have packages for sole traders and packages for limited companies and partnerships in your basket" to be visible
    Then I expect data-selector "checkout-button" to be disabled

  Scenario: should show "credit error" Notification Error message
    Given I have a bingo basket that goes over the credit limit
    Then I expect to see an error with message "Unfortunately our credit check has indicated that your limit is £40."
    Then I expect to see an error with message "Please select which package(s) to remove from your basket in order to checkout."

  Scenario: should show error message for large order
    Given I have basket with 6 simo
    When I click data-selector "checkout-button"
    Then I expect to see an error with message "You can buy up to 5 business items online."
    Then I do expect the text "Please reduce the quantity in your Basket to continue. For larger orders, please call us on 08080 408 408." to be visible
