Feature: Login Page Accessibility

    @a11y
    Scenario: Test the accesibility on Login Page
        Given the user is on the Swag Labs login page
        Then the Login page should not have any automatically detectable accessibility violations
