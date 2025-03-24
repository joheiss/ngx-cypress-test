export class SmartTablePage {

  addUser(firstName, lastName, email, age) {
    cy.contains("nb-card", /smart table/i).as("smartTableCard");
    // -- add an input line
    cy.get("@smartTableCard")
      .find("thead th .nb-plus")
      .click();
    // -- locate input line and fill columns
    cy.get("@smartTableCard")
      .find("thead tr")
      .last()
      .then(row => {
        cy.wrap(row).find("input[placeholder='First Name']").clear().type(firstName);
        cy.wrap(row).find("input[placeholder='Last Name']").clear().type(lastName);
        cy.wrap(row).find("input[placeholder='E-mail']").clear().type(email);
        cy.wrap(row).find("input[placeholder='Age']").clear().type(age);
        cy.wrap(row).find("td .nb-checkmark").click();
      });
    cy.get("@smartTableCard")
      .find("tbody tr")
      .first()
      .should("contain", email);
    // -- use within - just for fun
    cy.get("@smartTableCard")
      .find("tbody tr")
      .first()
      .within($row => {
        cy.get("td").its(2).should("contain", firstName);
        cy.get("td").its(3).should("contain", lastName);
        cy.get("td").its(5).should("contain", email);
        cy.get("td").its(6).should("contain", age);

      });
  }

  deleteUserByEmail(email) {
    cy.contains("nb-card", /smart table/i)
      .find("tbody")
      .contains("tr", email)
      .within($row => {
        const stub = cy.stub();
        cy.on("window:confirm", stub);
        cy.get("td").find(".nb-trash").click().then(() => {
          expect(stub.getCall(0)).to.be.calledWith("Are you sure you want to delete?");
        });
      });
  }

  filterByAge(age) {
    cy.contains("nb-card", /smart table/i)
      .find("thead tr")
      .last()
      .within($row => {
        cy.get("input[placeholder=Age]").clear().type(age);
      });
      cy.wait(500);
      cy.get("tbody tr").each($row => {
        cy.wrap($row).get("td").its(6).should("contain", age);
      });
  }

  updateAgeByFirstName(firstName, age) {
    cy.contains("nb-card", /smart table/i)
      .find("tbody")
      .contains("tr", firstName)
      .then(row => {
        cy.wrap(row).find(".nb-edit").click();
        cy.wrap(row).find("input[placeholder=Age]").clear().type(age);
        cy.wrap(row).find(".nb-checkmark").click();
        cy.wrap(row).find("td").its(6).should("contain", age);
      });
  }

}

export const smartTablePage = new SmartTablePage();
