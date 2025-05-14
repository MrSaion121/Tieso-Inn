Feature: Logout User

  Scenario: Successful logout of a user
    Given I am logged in for logout
    When I click on the logout link
    Then I should see the login button or link
