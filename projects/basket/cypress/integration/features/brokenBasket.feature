@error
Feature: Generic Error
  Scenario: Show show the generic error when trying to create an invalid basket
    Given I have a basket with a wrong basketId
    Then I expect to see an error with message "Uh-oh, something went wrong."
