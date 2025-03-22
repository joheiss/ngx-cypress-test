/// <reference types="cypress" />

describe("first test", () => {

  beforeEach(() => {
    cy.visit("/");
  });

  it("should contain 'ngx-admin' in header", () => {
    cy.get("div.header-container div.logo-container").within(
      () => cy.get("a.logo").contains("ngx-admin").should("exist")
    );
  });

  it("should expand the 'Layout' menu, when clicked", () => {
    cy.get("ul.menu-items li a").contains("Layout").as("layout-menu-item");
    cy.get("@layout-menu-item").click();
    // cy.get("@layout-menu-item").parent().within(() => {
    //   cy.get("ul.menu-items li.menu-item")
    //     .should("have.length", 2);
    // });
  });
});
