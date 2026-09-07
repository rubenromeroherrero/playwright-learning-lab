Feature: User Login on Swag Labs

    @login @p1
    Scenario Outline: Successful login with valid credentials
        Given the user is on the Swag Labs login page
        When the user enters "<email>" in the email field
        And the user enters "secret_sauce" in the password field
        And the user selects the "Login" button
        Then the user should be redirected to the Inventory page

        Examples:

            | email                   |
            | standard_user           |
            | performance_glitch_user |
            | visual_user             |

    @login
    Scenario: Unsuccessful login with a locked-out user
        Given the user is on the Swag Labs login page
        When the user enters "locked_out_user" in the email field
        And the user enters "secret_sauce" in the password field
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
            | username      | password       | error path              |
            | invalid_user  | secret_sauce   | wrong user              |
            | standard_user | wrong_password | wrong password          |
            | wrong_user    | wrong_password | wrong user and password |
