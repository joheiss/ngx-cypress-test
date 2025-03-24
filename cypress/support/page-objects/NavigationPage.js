export class NavigationPage {

  toFormsLayoutsPage() {
    this.navigateTo(["Forms", "Form Layouts"]);
  }

  toDatePickerPage() {
    this.navigateTo(["Forms", "Datepicker"]);
  }

  toToasterPage() {
    this.navigateTo(["Modal & Overlays", "Toastr"]);
  }

  toTooltipPage() {
    this.navigateTo(["Modal & Overlays", "Tooltip"]);
  }

  toDialogPage() {
    this.navigateTo(["Modal & Overlays", "Dialog"]);
  }

  toSmartTablePage() {
    this.navigateTo(["Tables & Data", "Smart Table"]);
  }
  
  navigateTo(items) {
    for (const menuItem of items) {
      cy.contains(menuItem).click({ force: true })
    };
    }
  }


export const navigation = new NavigationPage();
