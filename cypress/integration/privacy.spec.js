Cypress._.times(3, function() {
    it('testa a pagina de politica de privacidadade de forma independente', () => {
        cy.visit('./src/privacy.html')

        cy.contains('Talking About Testing').should('be.visible')
    });
})