export class FormsLayoutPage {

  submitInlineForm(name, email, rememberMe) {
    cy.contains("nb-card", /inline form/i).as("inlineForm");
    cy.get("@inlineForm").within($form => {
      cy.get("input[placeholder='Jane Doe']").clear().type(name);
      cy.get("input[placeholder='Email']").clear().type(email);
      if (rememberMe) {
        cy.get("nb-checkbox").click();
      }
      cy.get("button").contains(/submit/i).click();
    });
  }


submitBasicForm(email, password, checkMeOut) {
    cy.contains("nb-card", /basic form/i).as("basicForm");
    cy.get("@basicForm").within($form => {
      cy.get("input[placeholder='Email']").clear().type(email);
      cy.get("input[placeholder='Password']").clear().type(password);
      if (checkMeOut) {
        cy.get("nb-checkbox").click();
      }
      cy.get("button").contains(/submit/i).click();
    });
  }
}

export const formsLayoutPage = new FormsLayoutPage();
