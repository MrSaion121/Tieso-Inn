Feature: Support chat

  Scenario: User logs in and sends a message in the chat
    Given I am logged in
    When I enter the support chat
    And I write "Hello, I need help" and send it
    Then I should see the message "Hello, I need help" in the chat
