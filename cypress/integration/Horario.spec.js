import { spanish } from "../../src/translations/Spanish";

describe('Pantalla de Horario', ()=>{
    before(()=>{
        cy.viewport(1500, 900);
        cy.login("test User", "test Password");
    })
    it('page can be opened', ()=>{
        cy.contains(spanish.SelectTitlePlaceholder);
    });

    it('Select title', ()=>{
        cy.get('[data-testid="titleOption"]')
        cy.get('[data-testid="titleSelector"]').select("{\"id\":\"string\",\"titleName\":\"string\",\"semesters\":0}");
    });

    it('Drop group into schedule', ()=>{
        cy.get('[data-testid="subject-string"]').click();
        cy.get('[data-testid="subjectGroup-string"]').dragTo('[data-testid="5-5"]');
    });

    it('Move session into schedule', ()=>{
        cy.get('[data-testid="asdasc-123124jp-asdadipkw"]').dragTo('[data-testid="5-5"]');
    })
    it('Update session values', ()=>{
        cy.get('[data-testid="asdasc-123124jp-asdadipkw"]').click();
        cy.get('[data-testid="sessionDayInput"]').select("1");
        cy.get('[data-testid="colorInput"]').type("#000000");
        cy.get('[data-testid="startTimeInput"]').type("14:55");
        cy.get('[data-testid="lengthInput"]').type("06");
    })
    it('Click update button', ()=>{
        cy.get('[data-testid="submitButton"').click();
    })
});