Feature: Inventory Page on Swag Labs

    @auth @logout
    Scenario: Successful logout from inventory page
        Given the "standard user" is logged into the Swag Labs
        When the user logs out from the side menu
        Then the user should be redirected to the login page

    @filter
    Scenario: Filter inventory items by price from low to high
        Given the "standard user" is logged into the Swag Labs
        When the user selects "Price (low to high)" from the product sort dropdown
        Then the inventory items should be ordered by price from "Price (low to high)"

    @footer
    Scenario Outline: Verify social media footer links redirect to correct external pages
        Given the "standard user" is logged into the Swag Labs
        When the user selects the "<social_media>" icon in the footer
        Then the user should be redirected to expected "<social_media>" url in a new tab

        Examples:
            | social_media |
            | Twitter      |
            | Facebook     |
            | LinkedIn     |
