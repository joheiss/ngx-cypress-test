/// <reference types="cypress" />

describe("Forms testing", () => {

  beforeEach(() => {
    cy.visit("/");
  });
  describe("Using the grid", () => {

    beforeEach(() => {
      // -- navigate to Forms -> Form Layout
      cy.navigateTo(["Forms", "Form Layout"]);
      // cy.contains("Forms").click();
      // cy.contains("Form Layouts").click();
      // cy.visit("/pages/forms/layouts");
      cy.contains("nb-card", /using the grid/i).as("using-the-grid-card");
    });

    it("should have correct labels for input fields", () => {
      cy.get("@using-the-grid-card").find("[for=inputEmail1]").should("contain", "Email");
      cy.get("@using-the-grid-card").find("[for=inputPassword2]").should("contain", "Password");

      // can also be done using then and wrapping the HTMLElement
      cy.contains("nb-card", /using the grid/i).then(grid => {
        cy.wrap(grid).find("[for=inputEmail1]").should("contain", "Email");
        cy.wrap(grid).find("[for=inputPassword2]").should("contain", "Password");
      });
    });

    it("should accept valid input in 'email' input field", () => {
      cy.getByTestId("imputEmail1").type("hansi@horsti.de");
      // -- press sign in button
      cy.contains("nb-card", /using the grid/i)
        .contains("button", /sign in/i)
        .click();
    });

    it("should check the 'remember me' checkbox of 'Horizontal Form'", () => {
      cy.get("#inputEmail3")
        .parents("form")
        .contains("nb-checkbox", /remember me/i)
        .click();
    });
  });

  describe("Basic Form ...", () => {

    beforeEach(() => {
      // -- navigate to Forms -> Form Layout
      cy.navigateTo(["Forms", "Form Layout"]);
      // cy.contains("Forms").click();
      // cy.contains("Form Layouts").click();
      // cy.visit("/pages/forms/layouts");
      cy.contains("nb-card", /basic form/i).as("basicFormCard");
    });

    it("should display the 'Basic Form' correctly and extract some texts and values", () => {
      // -- check the labels
      cy.get("@basicFormCard")
        .find("[for=exampleInputEmail1]")
        .should("contain", "Email address");

      // extract label text
      cy.get("@basicFormCard")
        .find("[for=exampleInputEmail1]")
        .then(label => {
          const labelText = label.text();
          // use expect ...
          expect(labelText).to.equal("Email address");
          // ... or cy.wrap
          cy.wrap(labelText).should("contain", "Email address");
        });

      // -- extract label text ... using invoke method
      cy.get("@basicFormCard")
        .find("[for=exampleInputEmail1]")
        .invoke("text")
        .then(text => {
          expect(text).to.equal("Email address");
        });

      // -- no need to use then after invoke
      cy.get("@basicFormCard")
        .find("[for=exampleInputEmail1]")
        .invoke("text")
        .should("contain", "Email address");

      // -- use invoke method to get attributes of the element
      cy.get("@basicFormCard")
        .find("[for=exampleInputEmail1]")
        .invoke("attr", "class")
        .should("contain", "label");

      // -- get property from text input
      cy.get("@basicFormCard")
        .find("#exampleInputEmail1")
        .type("hansi@horsti.de");

      cy.get("@basicFormCard")
        .find("#exampleInputEmail1")
        .invoke("prop", "value")
        .then(value => expect(value).equal("hansi@horsti.de"));
    });

  });

});
