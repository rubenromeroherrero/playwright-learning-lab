Feature: User Login on Swag Labs

    @test
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
