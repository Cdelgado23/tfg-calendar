// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

import { spanish } from "../../src/translations/Spanish";

// -- This is a parent command --
 Cypress.Commands.add('login', (email, password) => {
    cy.visit('http://localhost:3001');
    if (cy.contains(spanish.login)){
        cy.get('input:first').type(email);
        cy.get('input:last').type(password);
        cy.get('button').last().click();
    }
  });

  Cypress.Commands.add("dragTo", { prevSubject: "element" }, (subject, targetEl) => {

	var dt = {text:"", 
        setData: (type, data)=>{dt[type]=data},
        getData: (type)=>{return dt[type]}
    };
    cy.wrap(subject).trigger("dragstart", {dataTransfer: dt});
    cy.get(targetEl).trigger("drop", {dataTransfer: dt});
  }
);
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
