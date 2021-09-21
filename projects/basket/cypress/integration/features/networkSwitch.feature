@networkSwitch
Feature: Network Switch
  Scenario: Switching network with PAC code
    Given I have a regular handset
    Then I wait for "networkSwitchRequest" request with 200
    Then I do expect the text "Joining us from another network?" to be visible
    Then I do not expect the text "Your information is saved." to exist
    #When I click on switch network toggle
    #Then I expect "[class^='ModalRendererstyle__ModalWrapper']" to exist
    #Then I do expect the text "Switch My Network" to be visible
    #Then I do expect the text "Select PAC or STAC code" to be visible
    #Then I do expect the text "Network switch date" to be visible
    #Then I expect "Enter" button to be "disabled"
    #Then I expect date selector to be "disabled"
    #When I type "XAE847693" to "#code" input
    #When I type "07195729387" to "#phone-number" input
    #Then I expect "Enter" button to be "enabled"
    #When I click on "Enter" button
    #Then I expect date selector to be "enabled"
    #Then I expect "Save" button to be "disabled"
    #When I select from date selector
    #Then I expect "Save" button to be "enabled"
    Given I have a handset with portability
    #Then I wait for "portabilityValidateRequest" request with 200
    #When I click on "Save" button
    #Then I wait for "portabilityPostRequest" request with 200
    #Then I wait for "networkSwitchRequest" request with 200
    #Then I expect "[class^='ModalRendererstyle__ModalWrapper']" not to exist
    #Then I do not expect the text "Joining us from another network?" to exist
    #Then I do expect the text "Thank you for switching!" to be visible
    #Then I do expect the text "Your information is saved." to be visible


  Scenario: Switching network off
    Given I have a handset with portability set
    Then I do not expect the text "Joining us from another network?" to exist
    Then I do expect the text "Thank you for switching!" to be visible
    Then I do expect the text "Your information is saved." to be visible
    When I click on switch network toggle
    Then I expect "[class^='ModalRendererstyle__ModalWrapper']" to exist
    Then I do expect the text "Are you sure?" to be visible
    Then I do expect the text "By switching this toggle off your information for switching network will be lost." to be visible
    When I click on "Cancel" button
    Then I expect "[class^='ModalRendererstyle__ModalWrapper']" not to exist
    When I click on switch network toggle
    Then I expect "[class^='ModalRendererstyle__ModalWrapper']" to exist
    Given I have a regular handset with switched off payload
    When I click on "Confirm" button
    Then I wait for "portabilityPostRequest" request with 200
    Then I wait for "networkSwitchRequest" request with 200
    Then I do expect the text "Joining us from another network?" to be visible
