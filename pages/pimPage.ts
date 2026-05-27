import type { Locator, Page } from "@playwright/test";

export class PimPage {
  readonly page: Page;
  readonly addBtn: Locator;
  readonly firstName: Locator;
  readonly LastName: Locator;
  readonly middleName: Locator;
  readonly saveBtn: Locator;
  readonly empNameHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addBtn = page.getByRole("button", { name: " Add" });
    this.firstName = page.getByRole("textbox", { name: "First Name" });
    this.middleName = page.getByRole("textbox", {
      name: "Middle Name",
    });
    this.LastName = page.getByRole("textbox", { name: "Last Name" });
    this.saveBtn = page.getByRole("button", { name: "Save" });
    this.empNameHeading = page.locator(".orangehrm-edit-employee-name h6");
  }
  /**
   * To add Employee
   * @param firstName
   * @param middleName
   * @param LastName
   */
  async addEmployee(firstName: string, middleName: string, LastName: string) {
    await this.addBtn.click();
    await this.firstName.fill(firstName);
    await this.middleName.fill(middleName);
    await this.LastName.fill(LastName);
    await this.saveBtn.click();
  }
}
