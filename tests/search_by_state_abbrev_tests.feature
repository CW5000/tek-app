Feature: basic tests

Background:
    * url 'http://localhost:4000'

Scenario Outline: Prove system works correctly through validation of positive scenarios.
    Given path '/ByState/<abbrev>'
    When method get
	Then status 200
	And match $..result.largest_city == [<largestCity>]
	And match $..result.capital == [<capitalCity>]
	
	Examples:
		| abbrev	| largestCity		| capitalCity		|
		| MO		| Kansas City		| Jefferson City	|	
		| Mo		| Kansas City		| Jefferson City	|
		| mo		| Kansas City		| Jefferson City 	|
		| PR		| 					| San Juan			|
		| Missouri	| Kansas City		| Jefferson City	|
		| missouri	| Kansas City		| Jefferson City	|	
		| MISSOURI	| Kansas City		| Jefferson City	|		
		| New Jersey| Newark			| Trenton			|
	
Scenario Outline: Prove system fails gracefully through validation of negative scenarios.
    Given path '/ByState/<abbrev>'
    When method get
	Then status <status>
	And match $..err == [<excuse>]
	
	Examples:
		| abbrev	| status	| excuse												|
		| aa		| 404		| No matching state found for requested code aa			|
		| a			| 404		| No matching state found for requested code a			|
		| aaa		| 404		| No matching state found for requested code aaa		|
		| $$		| 404		| No matching state found for requested code $$			|
		| 11		| 404		| No matching state found for requested code 11			|
		| a2		| 404		| No matching state found for requested code a2			|
		| a$		| 404		| No matching state found for requested code a$			|
		| $1		| 404		| No matching state found for requested code $1			|
		| Wyyoming	| 404    	| No matching state found for requested code Wyyoming 	|
		| H@wa11	| 404    	| No matching state found for requested code H@wa11 	|
				
Scenario Outline: Prove system fails gracefully through validation of more negative scenarios.
    Given path '/ByState/<abbrev>'
    When method get
	Then status <status>

	Examples:
		| abbrev	| status	|
		| 			| 404		|	