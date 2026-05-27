import type { Locator, Page } from "@playwright/test";

export class SideBarPage {
  readonly page: Page;
  readonly pim_link: Locator;
  readonly orangeHrmLogo: Locator;
  readonly completeSideBarElements: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pim_link = this.page.getByRole("link", { name: "PIM" });
    this.orangeHrmLogo = this.page.getByRole("link", {
      name: "client brand banner",
    });
    this.completeSideBarElements = this.page.locator("div.oxd-sidepanel-body");
  }

  /**
   * To open PIM Module
   */
  async clickOnPimLink() {
    await this.pim_link.click();
  }
}
