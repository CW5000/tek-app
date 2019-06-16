describe('Search by valid state abbreviation', function() {
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
  })