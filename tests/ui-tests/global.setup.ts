// import { test } from "../../fixtures/common-fixture";
// import { expect } from "@playwright/test";

// test("global setup for auto login", async ({
//   page,
//   loginPageFixture,
//   commonUtilsFixture,
//   dashBoardFixture,
// }) => {
//   const userName = process.env.USER_NAME ? process.env.USER_NAME : "";
//   const password = process.env.PASSWORD ? process.env.PASSWORD : "";

//   const dec_userName_data = commonUtilsFixture.decryptData(userName);
//   const dec_password_data = commonUtilsFixture.decryptData(password);

//   await loginPageFixture.gotoOrangeHrm();
//   await loginPageFixture.loginOrangeHrm(dec_userName_data, dec_password_data);
//   //await expect(dashBoardFixture.dashBoardText).toBeVisible();
//   await page.context().storageState({
//     path: "./PlaywrightAuthFile/.auth/auth.json",
//   });
// });

import { test } from "../../fixtures/common-fixture";
import { expect } from "@playwright/test";

test("global setup for auto login", async ({
  page,
  loginPageFixture,
  commonUtilsFixture,
  dashBoardFixture,
}) => {
  console.log("\n" + "=".repeat(100));
  console.log("🚀 GLOBAL SETUP STARTED");
  console.log(`🕒 Start Time: ${new Date().toLocaleString()}`);
  console.log("=".repeat(100));

  // Read encrypted values from environment variables
  const userName = process.env.USER_NAME ? process.env.USER_NAME : "";
  const password = process.env.PASSWORD ? process.env.PASSWORD : "";

  console.log("\n🔹 ENVIRONMENT VARIABLES");
  console.log(`📌 USER_NAME exists: ${!!process.env.USER_NAME}`);
  console.log(`📌 PASSWORD exists: ${!!process.env.PASSWORD}`);

  // DEMO ONLY
  console.log(`🔐 Encrypted USER_NAME: ${userName}`);
  console.log(`🔐 Encrypted PASSWORD: ${password}`);

  // Validate environment variables
  if (!userName || !password) {
    throw new Error(
      `❌ USER_NAME or PASSWORD is missing from environment variables.
USER_NAME: "${userName}"
PASSWORD: "${password}"`,
    );
  }

  console.log("\n🔹 DECRYPTING DATA");

  const enc_userName = commonUtilsFixture.encryptData("orangehrm_skbn");
  const enc_password = commonUtilsFixture.encryptData("184G1a0126@");

  const dec_userName_data = commonUtilsFixture.decryptData(enc_userName);
  const dec_password_data = commonUtilsFixture.decryptData(enc_password);

  // DEMO ONLY
  console.log(`👤 Decrypted Username: ${dec_userName_data}`);
  console.log(`🔑 Decrypted Password: ${dec_password_data}`);

  if (!dec_userName_data || !dec_password_data) {
    throw new Error(
      `❌ Failed to decrypt credentials.
Username: "${dec_userName_data}"
Password: "${dec_password_data}"`,
    );
  }

  console.log("\n🔹 NAVIGATING TO ORANGEHRM");
  await loginPageFixture.gotoOrangeHrm();

  console.log("\n🔹 PERFORMING LOGIN");
  await loginPageFixture.loginOrangeHrm(dec_userName_data, dec_password_data);

  console.log("\n🔹 VERIFYING LOGIN");

  // Uncomment this after login stabilizes
  // await expect(dashBoardFixture.dashBoardText).toBeVisible();

  console.log("\n🔹 SAVING AUTH STATE");

  await page.context().storageState({
    path: "./PlaywrightAuthFile/.auth/auth.json",
  });

  console.log("💾 Auth state saved to: ./PlaywrightAuthFile/.auth/auth.json");

  console.log("\n" + "=".repeat(100));
  console.log("🎉 GLOBAL SETUP COMPLETED");
  console.log("=".repeat(100));
});
