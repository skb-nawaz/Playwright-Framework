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

    // Invalid credentials error message
    this.invalidCredentailsError = page.getByRole("alert");
  }

  /**
   * Open OrangeHRM login page
   */
  async gotoOrangeHrm() {
    const url = `${process.env.BASE_URL}web/index.php/auth/login`;

    console.log("\n" + "=".repeat(100));
    console.log("🚀 STARTING NAVIGATION TO ORANGEHRM");
    console.log(`🌐 URL: ${url}`);
    console.log(`🕒 Start Time: ${new Date().toLocaleString()}`);
    console.log("=".repeat(100));

    try {
      await this.page.goto(url, {
        timeout: 120000,
        waitUntil: "domcontentloaded",
      });

      console.log("✅ Navigation completed");
      console.log(`🌐 Current URL: ${this.page.url()}`);
      console.log(`📄 Page Title: ${await this.page.title()}`);

      console.log("⏳ Waiting for Username field...");
      await this.userName.waitFor({
        state: "visible",
        timeout: 120000,
      });

      console.log("✅ Username field is visible");
      console.log("🎉 OrangeHRM Login Page loaded successfully");

      await this.page.screenshot({
        path: `screenshots/login-page-${Date.now()}.png`,
      });

      console.log("📸 Screenshot captured");
    } catch (error) {
      console.error("❌ Failed to load OrangeHRM Login Page");
      console.error(`🌐 Current URL: ${this.page.url()}`);

      try {
        console.error(`📄 Page Title: ${await this.page.title()}`);

        await this.page.screenshot({
          path: `screenshots/navigation-error-${Date.now()}.png`,
          fullPage: true,
        });

        console.log("📸 Error screenshot captured");
      } catch {}

      throw error;
    }

    console.log("=".repeat(100) + "\n");
  }

  /**
   * Login into OrangeHRM
   * @param username
   * @param password
   */
  async loginOrangeHrm(username: string, password: string) {
    console.log("\n" + "=".repeat(100));
    console.log("🚀 STARTING LOGIN PROCESS");
    console.log(`🕒 Start Time: ${new Date().toLocaleString()}`);
    console.log(`🌐 Current URL: ${this.page.url()}`);
    console.log(`👤 Username to enter: ${username}`);
    console.log(`🔑 Password to enter: ${password}`); // DEMO ONLY
    console.log("=".repeat(100));

    try {
      // Username
      console.log("\n🔹 USERNAME FIELD");

      const isUsernameVisible = await this.userName.isVisible();
      console.log(`👀 Username field visible: ${isUsernameVisible}`);

      const isUsernameEnabled = await this.userName.isEnabled();
      console.log(`⚡ Username field enabled: ${isUsernameEnabled}`);

      console.log(`⌨️ Entering username: ${username}`);

      await this.userName.fill(username, {
        timeout: 120000,
      });

      const enteredUsername = await this.userName.inputValue();
      console.log(`📌 Username field value: ${enteredUsername}`);

      // Password
      console.log("\n🔹 PASSWORD FIELD");

      const isPasswordVisible = await this.password.isVisible();
      console.log(`👀 Password field visible: ${isPasswordVisible}`);

      const isPasswordEnabled = await this.password.isEnabled();
      console.log(`⚡ Password field enabled: ${isPasswordEnabled}`);

      console.log(`⌨️ Entering password: ${password}`); // DEMO ONLY

      await this.password.fill(password, {
        timeout: 120000,
      });

      const enteredPassword = await this.password.inputValue();
      console.log(`📌 Password field value: ${enteredPassword}`); // DEMO ONLY

      // Login Button
      console.log("\n🔹 LOGIN BUTTON");

      const isLoginButtonVisible = await this.loginButton.isVisible();
      console.log(`👀 Login button visible: ${isLoginButtonVisible}`);

      const isLoginButtonEnabled = await this.loginButton.isEnabled();
      console.log(`⚡ Login button enabled: ${isLoginButtonEnabled}`);

      const loginButtonText = await this.loginButton.textContent();
      console.log(`📝 Login button text: ${loginButtonText}`);

      await this.page.screenshot({
        path: `screenshots/before-login-${Date.now()}.png`,
      });

      console.log("📸 Screenshot before login captured");

      console.log("🖱️ Clicking Login button...");

      await this.loginButton.click({
        timeout: 120000,
      });

      console.log("✅ Login button clicked");

      console.log("⏳ Waiting for page to load...");

      await this.page.waitForLoadState("domcontentloaded");

      console.log(`🌐 Current URL: ${this.page.url()}`);
      console.log(`📄 Page Title: ${await this.page.title()}`);

      // Check invalid credentials
      const isInvalidCredentialsVisible = await this.invalidCredentailsError
        .isVisible({ timeout: 5000 })
        .catch(() => false);

      console.log(
        `🚨 Invalid credentials error visible: ${isInvalidCredentialsVisible}`,
      );

      if (isInvalidCredentialsVisible) {
        const errorMessage = await this.invalidCredentailsError.textContent();

        console.error(`❌ Login Failed`);
        console.error(`🚨 Error Message: ${errorMessage}`);

        await this.page.screenshot({
          path: `screenshots/login-failed-${Date.now()}.png`,
          fullPage: true,
        });

        throw new Error(`Login Failed: ${errorMessage}`);
      }

      await this.page.screenshot({
        path: `screenshots/login-success-${Date.now()}.png`,
      });

      console.log("📸 Success screenshot captured");

      console.log("\n🎉 LOGIN COMPLETED SUCCESSFULLY");
      console.log(`🌐 Final URL: ${this.page.url()}`);
      console.log(`📄 Final Page Title: ${await this.page.title()}`);
    } catch (error) {
      console.error("\n❌ LOGIN PROCESS FAILED");
      console.error(`🌐 Current URL: ${this.page.url()}`);

      try {
        console.error(`📄 Current Page Title: ${await this.page.title()}`);

        await this.page.screenshot({
          path: `screenshots/login-error-${Date.now()}.png`,
          fullPage: true,
        });

        console.log("📸 Error screenshot captured");
      } catch {}

      throw error;
    }

    console.log("=".repeat(100));
    console.log("🏁 LOGIN FLOW FINISHED");
    console.log("=".repeat(100) + "\n");
  }
}

export default LoginPage;
