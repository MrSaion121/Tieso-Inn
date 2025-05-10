Feature: Sign up

  Scenario: Failed sign up due to existing email
    Given I open the main page
    When I click on dropdown Ingreso
    And I click on button Registro
    And I fill the sign up form with a registered email
    And I submit the sign up form
    Then I get an error due to existing email
