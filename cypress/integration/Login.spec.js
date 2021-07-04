import { spanish } from "../../src/translations/Spanish";

describe('Login', ()=>{
    beforeEach(()=>{
        cy.viewport(1500, 900);
    });

    it('Type in login Form', ()=>{
        cy.login("test User", "test Password");
    })

});