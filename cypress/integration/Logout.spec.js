import { spanish } from "../../src/translations/Spanish";

describe('Logout', ()=>{
    before(()=>{
        cy.viewport(1500, 900);
        cy.login("test User", "test Password");
    });

    it('Click on users name button', ()=>{
        cy.contains("test User").click();
    })

    it('Click Logout', ()=>{
        cy.contains(spanish.logout).click();
    })
    if ('User is not logged', ()=>{
        cy.contains(spanish.loginHeader);
    });
});