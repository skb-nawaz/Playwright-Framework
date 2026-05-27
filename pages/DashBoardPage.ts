import { expect, type Locator, type Page } from "@playwright/test";

export default class DashBoardPage {
  readonly page: Page;
  readonly dashBoardText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashBoardText = page.getByRole("heading", { name: "Dashboard" });
  }
}
