/// <reference types="cypress" />
import { formsLayoutPage } from "../support/page-objects/FormsLayoutPage";
import { navigation } from "../support/page-objects/NavigationPage";
import { datePickerPage } from "../support/page-objects/DatePickerPage";

describe("Testing with Page Object Models (POM)", () => {

  beforeEach("open application", () => {
    cy.visit("/");
  });

  it("verify navigation across pages", () => {
    navigation.toFormsLayoutsPage();
    cy.contains("nb-card", /inline form/i).should("exist");
    navigation.toDatePickerPage();
    cy.contains("nb-card", /common datepicker/i).should("exist");
    navigation.toToasterPage();
    cy.contains("nb-card", /toaster configuration/i).should("exist");
    navigation.toTooltipPage();
    cy.contains("nb-card", /tooltip with icon/i).should("exist");
    navigation.toDialogPage();
    cy.contains("nb-card", /open dialog/i).should("exist");
    navigation.toSmartTablePage();
    cy.contains("nb-card", /smart table/i).should("exist");
  });

  it("should submit the 'inline form'", () => {
    navigation.toFormsLayoutsPage();
    formsLayoutPage.submitInlineForm("Hansi Hampelmann", "hansi@horsti.de", true);

  });

   it("should submit the 'basic form'", () => {
     navigation.toFormsLayoutsPage();
     formsLayoutPage.submitBasicForm("hansi@horsti.de", "Passwort", true);
   });

  it("should select tomorrows date from calendar", () => {
    navigation.toDatePickerPage();
    datePickerPage.selectDate(1);
    datePickerPage.selectDateRange(1, 10);
  });
});
