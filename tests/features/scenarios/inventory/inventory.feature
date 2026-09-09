Feature: Inventory Page on Swag Labs

    @auth @logout
    Scenario: Successful logout from inventory page
        Given the "standard user" is logged into the Swag Labs
        When the user logs out from the side menu
        Then the user should be redirected to the login page

    @filter
    Scenario Outline: Filter inventory items by price
        Given the "standard user" is logged into the Swag Labs
        When the user selects "<filterOption>" from the product sort dropdown
        Then the inventory items should be ordered by price from "<filterOption>"

        Examples:
            | filterOption        |
            | Price (low to high) |
            | Price (high to low) |


    @footer
    Scenario Outline: Verify social media footer links redirect to correct external pages
        Given the "standard user" is logged into the Swag Labs
        When the user selects the "<socialMedia>" icon in the footer
        Then the user should be redirected to expected "<socialMedia>" url in a new tab

        Examples:
            | socialMedia |
            | Twitter     |
            | Facebook    |
            | LinkedIn    |
