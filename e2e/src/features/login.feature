Feature: Login
        Scenario: Login success
            Given a user who already has an account
             When he tries to login with valid credentials
             Then the system redirects to transaction list
        Scenario: Login fails
             When he tries to login with invalid credentials
             Then the system displays an error
        Scenario: Security redirect
            Given a user who is not logged in
             When he tries to access transactions screen
             Then the system redirects to login page
