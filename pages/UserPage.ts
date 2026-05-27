import { Page, type Locator } from "@playwright/test";

export default class UserPage {
  readonly page: Page;
  readonly userProfileBtn: Locator;
  readonly logoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userProfileBtn = page.locator(
      "i.oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon",
    );
    this.logoutBtn = page.getByRole("menuitem", { name: "Logout" });
  }

  async clickOnLogout() {
    await this.userProfileBtn.click();
    await this.logoutBtn.click();
  }
}
