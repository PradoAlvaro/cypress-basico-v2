Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {

    cy.get('#firstName').type("Alvaro")
    cy.get('#lastName').type("Prado")
    cy.get('#email').type('alvaro@teste.com')
    cy.get('#open-text-area').type('teste')
    cy.get('.button').click()

})