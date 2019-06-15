Feature: basic tests

Background:
    * url 'http://localhost:4000'

Scenario Outline: Prove system works correctly through validation of positive scenarios.
    Given path '/ByStateAbbrev/<abbrev>'
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
	
Scenario Outline: Prove system fails correctly through validation of negative scenarios.
    Given path '/ByStateAbbrev/<abbrev>'
    When method get
	Then status <status>
	And match $..messages[0] contains [<excuse>]
	
	Examples:
		| abbrev	| status	|	excuse											|
		| 			| 200		|	No matching state found for requested code 		|
		| aa		| 200		|	No matching state found for requested code aa	|
		| a			| 200		|	No matching state found for requested code a	|
		| aaa		| 200		|	No matching state found for requested code aaa	|
		| $$		| 200		|	No matching state found for requested code $$	|
		| 11		| 200		|	No matching state found for requested code 11	|
		| a2		| 200		|	No matching state found for requested code a2	|
		| a$		| 200		|	No matching state found for requested code a$	|
		| $1		| 200		|	No matching state found for requested code $1	|		