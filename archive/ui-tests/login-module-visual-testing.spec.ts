import { test, expect } from "../../fixtures/hooks-fixture";

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
    const enc_userName = commonUtilsFixture.encryptData("orangehrm_skbn");
    const enc_password = commonUtilsFixture.encryptData("184G1a0126@");
    const username = commonUtilsFixture.decryptData(enc_userName);
    const password = commonUtilsFixture.decryptData(enc_password);
    await loginPageFixture.loginOrangeHrm(username, password);
    /* await expect(sideBarFixture.orangeHrmLogo).toHaveScreenshot(
      "orangrhrmBrandLogo.png",
      {
        maxDiffPixelRatio: 0.1,
      },
    ); */
    /* await expect(sideBarFixture.completeSideBarElements).toHaveScreenshot(
      "completeSideBarWithElements.png",
      {
        maxDiffPixelRatio: 0.1,
      },
    ); */
  },
);
