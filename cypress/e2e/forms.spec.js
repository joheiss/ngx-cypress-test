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

    it("should correctly handle the 'Options' radio buttons", () => {
      cy.get("@using-the-grid-card")
        .contains("nb-radio", /option 1/i)
        .find("[type=radio]")
        .first()
        .as("radio-button-1");
      cy.get("@radio-button-1")
        .check({ force: true });
      cy.get("@radio-button-1").should("be.checked");

      cy.get("@using-the-grid-card")
        .contains("nb-radio", /option 2/i)
        .find("[type=radio]")
        .first()
        .as("radio-button-2");
      cy.get("@radio-button-2")
        .check({ force: true });
      cy.get("@radio-button-1").should("not.be.checked");
      cy.get("@radio-button-2").should("be.checked");
      cy.get("@using-the-grid-card")
        .contains("nb-radio", /disabled option/i)
        .find("[type=radio]")
        .first()
        .should("be.disabled");
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

  describe("Date Pickers ...", () => {

    beforeEach(() => {
      // -- navigate to Forms -> Form Layout
      cy.navigateTo(["Forms", "Datepicker"]);
      cy.contains("nb-card", /common datepicker/i).as("commonDatePickerCard");
    });

    it("should handle date selections correctly", () => {
      // -- generate the expected date
      const expectedDate = new Date();
      expectedDate.setDate(28);
      const formattedDate = expectedDate.toLocaleString("en-US",
        { year: 'numeric', month: 'short', day: 'numeric' });

      // -- select date in date picker and check if it is correct
      cy.get("@commonDatePickerCard").find("input").then(input => {
        cy.wrap(input).click();
        cy.get(".day-cell")
          .not(".bounding-month")
          .should("have.length.greaterThan", 27)
          .contains("28")
          .click();
        cy.wrap(input).invoke("prop", "value").should("equal", formattedDate);
      });

    });

    it.only("should handle future date selections correctly", () => {


      // -- select date in date picker and check if it is correct
      cy.get("@commonDatePickerCard").find("input").then(input => {
        cy.wrap(input).click();
        const expectedDate = selectMonthAndYearAndDay(70);
        cy.wrap(input).invoke("prop", "value").should("equal", expectedDate);
      });

    });

  });

  describe("Modal & Overlays ...", () => {
    beforeEach(() => {
      // -- navigate to Modal & Overlays -> Toastr
      cy.navigateTo(["Modal & Overlays", "Toastr"]);
      cy.contains("nb-card", /toaster configuration/i).as("toasterConfigCard");
   });

    it("should handle the checkboxes correctly", () => {
      // -- get checkbox and check it
      cy.get("@toasterConfigCard")
        .contains("nb-checkbox", /hide on click/i)
        .find("[type=checkbox]")
        .first()
        .as("checkbox-1");
      cy.get("@checkbox-1")
        .check({ force: true });
      cy.get("@checkbox-1").should("be.checked");

       // -- get checkbox and uncheck it
      cy.get("@toasterConfigCard")
        .contains("nb-checkbox", /show toast with icon/i)
        .find("[type=checkbox]")
        .first()
        .as("checkbox-3");
      cy.get("@checkbox-3")
        .click({ force: true });
      cy.get("@checkbox-3").should("not.be.checked");
    });
  });

});

// recursive function - since while is not allowed in cypress code
  function selectMonthAndYearAndDay(daysToAdd) {
    // -- generate an expected date in the (far) future
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysToAdd);
    const formattedFutureDate = futureDate.toLocaleString("en-US",
        { year: 'numeric', month: 'short', day: 'numeric' });
    const formattedFutureMonth = futureDate.toLocaleString("en-US", { month: "short" });
    const formattedFutureDay = futureDate.getDate();
    const formattedFutureYear = futureDate.getFullYear();

    cy.get("nb-calendar-navigation")
      .invoke("attr", "ng-reflect-date")
      .then(date => {
        if (!date.includes(formattedFutureYear) || !date.includes(formattedFutureMonth)) {
          cy.get("[data-name=chevron-right]").click();
          selectMonthAndYearAndDay(daysToAdd);
        } else {
          cy.get(".day-cell")
            .not(".bounding-month")
            .contains(formattedFutureDay.toString())
            .click();
        }
      });
    return formattedFutureDate;
  }
