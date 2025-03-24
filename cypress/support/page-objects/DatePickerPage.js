export class DatePickerPage {

  selectDate(daysToAdd) {
    cy.contains("nb-card", /common datepicker/i).as("commonDatePickerCard");
    cy.get("@commonDatePickerCard").find("input").then($input => {
      cy.wrap($input).click();
      const expectedDate = this.selectDayFromCurrentDate(daysToAdd);
      cy.wrap($input).invoke("prop", "value").should("contain", expectedDate);
    });
  }

  selectDateRange(daysToStart, daysToEnd) {
    cy.contains("nb-card", /datepicker with range/i).as("datePickerWithRangeCard");
    cy.get("@datePickerWithRangeCard").find("input").then($input => {
      cy.wrap($input).click();
      const expectedStartDate = this.selectDayFromCurrentDate(daysToStart);
      const expectedEndDate = this.selectDayFromCurrentDate(daysToEnd);
      cy.wrap($input).invoke("prop", "value").should("contain", expectedStartDate + " - " + expectedEndDate);
    });
  }

  selectDayFromCurrentDate(daysToAdd) {
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
          this.selectDayFromCurrentDate(daysToAdd);
        } else {
          cy.get(".day-cell")
            .not(".bounding-month")
            .contains(formattedFutureDay.toString())
            .click();
        }
      });
    return formattedFutureDate;
  }

}

export const datePickerPage = new DatePickerPage();
