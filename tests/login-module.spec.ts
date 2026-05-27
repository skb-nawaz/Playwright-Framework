import { test, expect } from "../fixtures/hooks-fixture";
import loginModuleData from "../data/login-module-data.json";

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test(
  "verify that the user cannot login with an invalid password",
  {
    tag: ["@UI", "@UAT"],
    annotation: {
      type: "Test case Link",
      description: "https://www.google.com",
    },
  },

  async ({ gotoUrlFixture, loginPageFixture, commonUtilsFixture }) => {
    const userName = commonUtilsFixture.decryptData(process.env.USER_NAME!);
    await loginPageFixture.loginOrangeHrm(
      userName,
      loginModuleData.invalid_password.password,
    );
    await expect(loginPageFixture.invalidCredentailsError).toHaveText(
      loginModuleData.invalid_password.expected_result,
    );
  },
);

test.describe(
  "Invalid login Test",
  {
    tag: "@InvalidLogin",
    annotation: {
      type: "Story Link",
      description: "https://www.google.com",
    },
  },
  async () => {
    test(
      "verify that the user cannot login with an invalid userName",
      {
        tag: ["@UI", "@UAT", "@DEV"],
        annotation: {
          type: "Test case Link",
          description: "https://www.google.com",
        },
      },
      async ({ gotoUrlFixture, loginPageFixture, commonUtilsFixture }) => {
        const password = commonUtilsFixture.decryptData(process.env.PASSWORD!);
        await loginPageFixture.loginOrangeHrm(
          loginModuleData.invalid_username.user_name,
          password,
        );
        await expect(loginPageFixture.invalidCredentailsError).toHaveText(
          loginModuleData.invalid_username.expected_result,
        );
      },
    );

    test(
      "verify that the user cannot login with an invalid userName and password",
      {
        tag: ["@UI", "@DEMO"],
        annotation: {
          type: "Test case Link",
          description: "https://www.playwright.dev",
        },
      },
      async ({ gotoUrlFixture, loginPageFixture, commonUtilsFixture }) => {
        await loginPageFixture.loginOrangeHrm(
          loginModuleData.Invalid_username_password.user_name,
          loginModuleData.Invalid_username_password.password,
        );
        await expect(loginPageFixture.invalidCredentailsError).toHaveText(
          loginModuleData.Invalid_username_password.expected_result,
        );
      },
    );
  },
);

