describe('Search by valid state abbreviation', function() {
    it('Verifies the existence of the Input field', function() {
        cy.visit('http://localhost:8081/vue-sample.html')
        cy.get('input')
            .should('exist')
    });

    it('Verifies the existence of the Submit button', function() {
        cy.visit('http://localhost:8081/vue-sample.html')
        cy.get('button')
            .should('exist')
    });

    /*This one is a work in progress...seems to have trouble locking on
    to the field's text value after it being established... so
    it's going to fail in execution. 
    
    All things considered, this isn't
    something you'd use a test automation script to validate
    because it's utility is limited beyond the sprint in which the test
    is first introduced.*/
    it('Verifies the character limit on the Input field', function() {
        cy.visit('http://localhost:8081/vue-sample.html')
        cy.get('[name="inputData"]')
            .clear()
            .type('01234567890123456789012345')
        cy.get('[name="inputData"]')
            .contains('01234567890123456789')
    });

    it('Verifies target state changeover', function() {
        cy.visit('http://localhost:8081/vue-sample.html')
        cy.get('input')
            .clear()
            .type('MO')
        cy.get('[name="target"]')
            .should('have.text', 'MO')
    });

    it('Searches by state abbreviation', function() {
        cy.visit('http://localhost:8081/vue-sample.html')
        cy.get('input')
        .clear()
        .type('MO')
        cy.get('button')
        .click()
        cy.get('[name="largest"]')
        .should('have.text', 'Kansas City')
        cy.get('[name="capital"]')
        .should('have.text', 'Jefferson City')
    });

    it('Searches by state name', function() {
        cy.visit('http://localhost:8081/vue-sample.html')
        cy.get('input')
            .clear()
            .type('Missouri')
        cy.get('button')
            .click()
            cy.get('[name="largest"]')
            .should('have.text', 'Kansas City')
            cy.get('[name="capital"]')
            .should('have.text', 'Jefferson City')
    });

    it('Searches for an invalid string', function() {
        cy.visit('http://localhost:8081/vue-sample.html')
        cy.get('input')
            .clear()
            .type('AAA')
        cy.get('button')
            .click()
            cy.get('[name="largest"]')
            .should('have.text', 'No data found')
            cy.get('[name="capital"]')
            .should('have.text', 'No data found')
    });

    it('Searches for an invalid string', function() {
        cy.visit('http://localhost:8081/vue-sample.html')
        cy.get('input')
            .clear()
            .type('aa')
        cy.get('button')
            .click()
            cy.get('[name="largest"]')
            .should('have.text', 'No data found')
            cy.get('[name="capital"]')
            .should('have.text', 'No data found')
    });

    it('Searches for an invalid string', function() {
        cy.visit('http://localhost:8081/vue-sample.html')
        cy.get('input')
            .clear()
            .type('1$')
        cy.get('button')
            .click()
            cy.get('[name="largest"]')
            .should('have.text', 'No data found')
            cy.get('[name="capital"]')
            .should('have.text', 'No data found')
    });

    it('Searches for an invalid string', function() {
        cy.visit('http://localhost:8081/vue-sample.html')
        cy.get('input')
            .clear()
            .type('Whyyoming')
        cy.get('button')
            .click()
            cy.get('[name="largest"]')
            .should('have.text', 'No data found')
            cy.get('[name="capital"]')
            .should('have.text', 'No data found')
    });
  })