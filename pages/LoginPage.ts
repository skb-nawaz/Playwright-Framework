import type { Locator, Page } from "@playwright/test";

class LoginPage {
  readonly page: Page;
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly invalidCredentailsError: Locator;

  constructor(page: Page) {
    this.page = page;

    // Username textbox locator
    this.userName = page.getByRole("textbox", { name: "Username" });

    // Password textbox locator
    this.password = page.getByRole("textbox", { name: "Password" });

    // Login button locator
    this.loginButton = page.getByRole("button", { name: "Login" });

    //invalid password validator
    this.invalidCredentailsError = page.getByRole("alert");
  }

  /**
   * To open OrangeHRM URL in browser
   */
  async gotoOrangeHrm() {
    // Wait maximum 2 mins for page loading
    await this.page.goto(`${process.env.BASE_URL}web/index.php/auth/login`, {
      timeout: 120000,
      waitUntil: "domcontentloaded",
    });
  }

  /**
   * To Login into OrangeHRM Application
   * @param username
   * @param password
   */
  async loginOrangeHrm(username: string, password: string) {
    // Fill username
    await this.userName.fill(username, {
      timeout: 120000,
    });

    // Fill password
    await this.password.fill(password, {
      timeout: 120000,
    });

    /*  // Click login and wait for dashboard URL
    await Promise.all([
      this.page.waitForURL("**/ /**", {
        //dashboard
        timeout: 150000,
      }), */

    await this.loginButton.click({
      timeout: 120000,
    });
    // ]);
  }
}

export default LoginPage;
