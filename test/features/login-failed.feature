Feature: Failed Login Flow

  Scenario: User tries to login with invalid credentials
    Given I visit the home page
    And I click the dropdown button
    And I select the login option
    And I should be on the login page
    When I fill in the login form with invalid data
    Then I should see an error message for failed login

