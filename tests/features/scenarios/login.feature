Feature: User Login on Swag Labs

    @login @p1
    Scenario Outline: Successful login with valid credentials
        Given the user is on the Swag Labs login page
        When the user enters "<email>" in the email field
        And the user enters "generic password" in the password field
        And the user selects the "Login" button
        Then the user should be redirected to the Inventory page

        Examples:

            | email            |
            | standard user    |
            | performance user |
            | visual user      |

    @login
    Scenario: Unsuccessful login with a locked-out user
        Given the user is on the Swag Labs login page
        When the user enters "locked out user" in the email field
        And the user enters "generic password" in the password field
        And the user selects the "Login" button
        Then an error message for "locked out user" should be displayed

    @login @p1
    Scenario Outline: Unsuccessful login with invalid credentials
        Given the user is on the Swag Labs login page
        When the user enters "<username>" in the email field
        And the user enters "<password>" in the password field
        And the user selects the "Login" button
        Then an error message for "<error path>" should be displayed

        Examples:
            | username      | password         | error path              |
            | invalid user  | generic password | wrong user              |
            | standard user | wrong password   | wrong password          |
            | wrong user    | wrong password   | wrong user and password |

    @login
    Scenario: Unsuccessful login with empty fields
        Given the user is on the Swag Labs login page
        When the user enters "<username>" in the email field
        And the user enters "<password>" in the password field
        When the user selects the "Login" button
        Then an error message for "<error path>" should be displayed

        Examples:
            | username      | password         | error path     |
            | empty user    | generic password | empty user     |
            | standard user | empty password   | empty password |
