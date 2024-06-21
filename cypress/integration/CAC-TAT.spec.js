describe('Central de Atendimento ao cliente TAT', function() {
    // Move beforeEach to the describe block
    beforeEach(function() {
        cy.visit('./src/index.html');
    });

    it('verifica o titulo da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,'
        cy.get('#firstName').type("Alvaro")
        cy.get('#lastName').type("Prado")
        cy.get('#email').type('alvaro@teste.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('.button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    }) 

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type("Alvaro")
        cy.get('#lastName').type("Prado")
        cy.get('#email').type('alvaro@teste,com')
        cy.get('#open-text-area').type('oi')
        cy.contains('.button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    });

    it('campo telefone continua vazio quando preenchido com valor nao numerico', () => {
        cy.get('#phone')
         .type('abcdefghijkl')
         .should('have.value', '')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type("Alvaro")
        cy.get('#lastName').type("Prado")
        cy.get('#email').type('alvaro@teste.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('.button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    });

    it('preenche e limpa os campos nome, sobrenome, emmail e telefone', () => {
        cy.get('#firstName')
         .type('Alvaro')
         .should('have.value', 'Alvaro')
         .clear()
         .should('have.value', '')
        
        cy.get('#lastName')
         .type('Prado')
         .should('have.value','Prado')
         .clear()
         .should('have.value', '')

         cy.get('#email')
         .type('alvaro.teste@exemplo.com')
         .should('have.value', 'alvaro.teste@exemplo.com')
         .clear()
         .should('have.value', '')

         cy.get('#open-text-area')
         .type('teste')
         .should('have.value', 'teste')
         .clear()
         .should('have.value', '')

         cy.get('#phone')
         .type('123456789')
         .should('have.value', '123456789')
         .clear()
         .should('have.value', '')
    });

    it('exibe mensagem de erro', () => {
        cy.contains('.button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    });

    it('envia o formulário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    });

    it('seleciona um produto (yt) por seu texto', () => {
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    });

    it('seleciona um produto (mentoria) por seu valor (value)', () => {
        cy.get('#product')
         .select('mentoria')
         .should('have.value', 'mentoria')
    });

    it('marca o tipo de atendimento "Feedback', () => {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    });

    it('marca ambos checkboxes, depois desmarca o ultimo', () => {
        cy.get('input[type="checkbox"]')
         .check()
         .should('be.checked')
         .last()
         .uncheck()
         .should('not.be.checked')
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should('have.prop', 'files')
            .and(function($files) {
                expect($files[0].name).to.equal('example.json');
        });
    });    

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should('have.prop', 'files')
            .and(function($files) {
                expect($files[0].name).to.equal('example.json');
        });
    });    

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada ', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]') 
        .selectFile('@sampleFile')
    });
    it('verifica se a politica de privacidade abre em outra aba sem a necessidade de um clique  ', () => {
        cy.get('#privacy').should('have.attr', 'target', '_blank')
    });
    
    it('acesso a pagina da politica de privacidade removendo o target e entao clicando no link', () => {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    });
    
});
