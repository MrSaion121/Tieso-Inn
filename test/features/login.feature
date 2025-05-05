Feature: Login User

  Scenario: Successful login of a user
    Given I open the login page
    When I fill in the login form with valid data
    Then I should be redirected to the home page
    