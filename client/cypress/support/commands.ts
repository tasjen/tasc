/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('getBySel', (value) => {
  return cy.get(`[data-test=${value}]`);
});

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3000/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body));
    cy.visit('http://localhost:5173');
  });
});

// Cypress.Commands.add("addProject", ({ title, author, url }) => {
//   cy.request({
//     method: "POST",
//     url: "http://localhost:3003/api/projects",
//     body: {
//       title,
//       author,
//       url,
//     },
//     headers: {
//       Authorization: `Bearer ${JSON.parse(localStorage.getItem("loggedUser")).token
//         }`,
//     },
//   });
//   cy.visit("http://localhost:5173");
// });

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
//
