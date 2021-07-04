import { spanish } from "../../src/translations/Spanish";

describe('Pantalla de Asignaturas', ()=>{
    before(()=>{
        cy.login("test User", "test Password");
    })
    beforeEach(()=>{
        cy.viewport(1500, 900);
    });

    it('click subject nav button', ()=>{
        cy.get('[data-testid="subjectsNavButton"]').click(); 
    })


});