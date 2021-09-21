@business
Feature: Business
  Scenario: Business meganav and footer should be shown
    Given I have a business empty basket
    Then I do expect the text "Business solutions" to be visible
    Then I do expect the text "Why work with Vodafone" to be visible
    Then I do expect the text "Help" to be visible

  Scenario: Consumer meganav and footer should be shown by default
    Given I have an empty basket
    Then I do expect the text "Why Vodafone" to be visible
    Then I do expect the text "My Vodafone" to be visible
    Then I do expect the text "Latest phones" to be visible

  Scenario: Small business footer content should be shown
    Given I have a basket with a package having "smallBusiness" account sub category
    Then I do expect the text "† Prices shown include VAT unless otherwise stated, the VAT rate payable is 20% where standard VAT rate applies. Other terms apply, see vodafone.co.uk/terms-and-conditions for details." to be visible

  Scenario: Small business add on costs should be shown
    Given I have a basket with a package having "smallBusiness" account sub category
    Then I do expect the text "£10" to be visible
    Then I do not expect the text "£57.25" to exist

  Scenario: Sole trader footer content
    Given I have a basket with a package having "soleTrader" account sub category
    Then I do expect the text "† Prices shown include VAT unless otherwise stated, the VAT rate payable is 20% where standard VAT rate applies. Monthly price shown plus all out of bundle charges will increase by the Consumer Price Index rate published in January of that year + an additional 3.9%. If you have a Device Plan, this will not affect your monthly Device Plan. Adjusted amount from your April bill. Terms apply. See vodafone.co.uk/pricechanges for details." to be visible

  Scenario: Consumer footer content
    Given I have a basket with a package having "Consumer" account category
    Then I do expect the text "† Prices shown include VAT unless otherwise stated, the VAT rate payable is 20% where standard VAT rate applies. Monthly price shown plus all out of bundle charges will increase by the Consumer Price Index rate published in January of that year + an additional 3.9%. If you have a Device Plan, this will not affect your monthly Device Plan. Adjusted amount from your April bill. Terms apply. See vodafone.co.uk/pricechanges for details." to be visible
