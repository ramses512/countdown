Feature: Transaction
        Scenario: Transaction list
            Given a user who is in transactions screen 1
             Then the system displays transactions sorted descending by date
        Scenario: Transaction empty list
            Given a user who is in transactions screen 2
             When there are no transactions
             Then the system displays an empty notification message
        Scenario: Transaction sorted list
            Given a user who is in transactions screen 3
             When he tries to sort by date
             Then the system displays transactions sorted ascending by date
        Scenario: Transaction filtered list
            Given a user who is in transactions screen 4
             When he tries to search a transaction with "a"
             Then the system displays matching transactions with "a"
