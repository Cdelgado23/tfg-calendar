import { spanish } from "../../src/translations/Spanish";

describe('Pantalla de Aulas', ()=>{
    before(()=>{
        cy.login("test User", "test Password");
    })
    beforeEach(()=>{
        cy.viewport(1500, 900);
    });

    it('click classrooms nav button', ()=>{
        cy.get('[data-testid="classroomsNavButton"]').click(); 
    })

});