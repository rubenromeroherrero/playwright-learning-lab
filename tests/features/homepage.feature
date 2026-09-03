Feature: Todo App Functionality

    #npm run test:cucumber
    #npm run test:cucumber -- --tags "@test"

    @test
    Scenario: Select an item

        Given the user navigates to the Free Range Testers Sandbox
        When the user types on the input field
        Then the field is filled in
