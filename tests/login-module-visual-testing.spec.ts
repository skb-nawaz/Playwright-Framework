import { test, expect } from "../fixtures/hooks-fixture";

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test(
  "[Login] verify that the user can log in wtih valid username and password.",
  {
    tag: ["@VISUAL", "@DEV"],
    annotation: {
      type: "Test case link",
      description: "https://www.google.com",
    },
  },
  async ({
    gotoUrlFixture,

    loginPageFixture,
    commonUtilsFixture,
    sideBarFixture,
  }) => {
    const username = commonUtilsFixture.decryptData(process.env.USER_NAME!);
    const password = commonUtilsFixture.decryptData(process.env.PASSWORD!);
    await loginPageFixture.loginOrangeHrm(username, password);
    await expect(sideBarFixture.orangeHrmLogo).toHaveScreenshot(
      "orangrhrmBrandLogo.png",
      {
        maxDiffPixelRatio: 0.1,
      },
    );
    await expect(sideBarFixture.completeSideBarElements).toHaveScreenshot(
      "completeSideBarWithElements.png",
      {
        maxDiffPixelRatio: 0.1,
      },
    );
  },
);
