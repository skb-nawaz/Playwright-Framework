import { test } from "../fixtures/hooks-fixture";
import { expect } from "@playwright/test";
/* test.beforeEach("Before each hook", async ({ loginPageFixture }) => {
  console.log("Before test is started");
  await loginPageFixture.gotoOrangeHrm();
}); */

/* test.afterEach("after each hook", async ({ userPageFixture }) => {
  console.log("after test is started");
  await userPageFixture.clickOnLogout();
}); */

test("Temp test", async ({ gotoUrlFixture }) => {
  console.log("temp test started");
  // const userName = process.env.USER_NAME ? process.env.USER_NAME : "";
  // const password = process.env.PASSWORD ? process.env.PASSWORD : "";

  // const enc_userName_data = commonUtilsFixture.encryptData(userName);
  // const enc_password_data = commonUtilsFixture.encryptData(password);
  // const dec_userName_data = commonUtilsFixture.decryptData(userName);
  // const dec_password_data = commonUtilsFixture.decryptData(password);

  //await loginPageFixture.gotoOrangeHrm();

  // await loginPageFixture.loginOrangeHrm(dec_userName_data, dec_password_data);
});
test("test2", async ({ page, gotoUrlFixture }) => {
  await expect(page).toHaveTitle("OrangeHRM");
});

test("test3", async ({ page, gotoUrlFixture, logoutFixture }) => {
  await expect(page).toHaveTitle("OrangeHRM");
});
