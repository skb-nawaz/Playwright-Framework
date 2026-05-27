import { test } from "@playwright/test";

test.setTimeout(120000);

test("sample test", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    {
      timeout: 120000,
      waitUntil: "domcontentloaded",
    },
  );

  await page.getByRole("textbox", { name: "Username" }).fill("Admin");

  await page.getByRole("textbox", { name: "Password" }).fill("admin123");

  await Promise.all([
    page.waitForURL("**/dashboard/**", {
      timeout: 120000,
    }),
    page.getByRole("button", { name: "Login" }).click(),
  ]);
});
