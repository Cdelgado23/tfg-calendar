import { spanish } from "../../src/translations/Spanish";

describe('Pantalla de Profesores', ()=>{
    before(()=>{
        cy.login("test User", "test Password");
    })
    beforeEach(()=>{
        cy.viewport(1500, 900);
    });

    it('click teachers nav button', ()=>{
        cy.get('[data-testid="teachersNavButton"]').click(); 
    })
});