Feature: basic tests

Background:
    * url 'http://localhost:4000'

Scenario: Prove that the services is active.
    Given path ''
    When method get
    Then status 200