Feature: Inventory Page Accessibility

    @a11y
    Scenario: Test the accesibility on Inventory Page
        Given the "standard user" is logged into the Swag Labs
        Then the Inventory page should not have any automatically detectable accessibility violations
