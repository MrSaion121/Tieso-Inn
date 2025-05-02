Feature: Login button

  Scenario: Successful redirection to login page
    Given I open main page
    When I click on dropdown Ingreso, then on button Ingresar
    Then I should see the login form
