Feature: User Login on Swag Labs

    @login @auth @p1
    Scenario Outline: Successful login with valid credentials
        Given the user is on the Swag Labs login page
        When the user enters "<username>" in the username field
        And the user enters "generic password" in the password field
        And the user selects the "Login" button
        Then the user should be redirected to the Inventory page

        Examples:

            | username         |
            | standard user    |
            | performance user |
            | visual user      |

    @login
    Scenario: Unsuccessful login with a locked-out user
        Given the user is on the Swag Labs login page
        When the user enters "locked out user" in the username field
        And the user enters "generic password" in the password field
        And the user selects the "Login" button
        Then an error message for "locked out user" should be displayed

    @login @p1
    Scenario Outline: Unsuccessful login with invalid credentials
        Given the user is on the Swag Labs login page
        When the user enters "<username>" in the username field
        And the user enters "<password>" in the password field
        And the user selects the "Login" button
        Then an error message for "<errorPath>" should be displayed

        Examples:
            | username      | password         | errorPath               |
            | invalid user  | generic password | wrong user              |
            | standard user | wrong password   | wrong password          |
            | wrong user    | wrong password   | wrong user and password |

    @login
    Scenario: Unsuccessful login with empty fields
        Given the user is on the Swag Labs login page
        When the user enters "<username>" in the username field
        And the user enters "<password>" in the password field
        When the user selects the "Login" button
        Then an error message for "<errorPath>" should be displayed

        Examples:
            | username      | password         | errorPath      |
            | empty user    | generic password | empty user     |
            | standard user | empty password   | empty password |
