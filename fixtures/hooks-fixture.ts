import { test as baseTest } from "./common-fixture";
import type LoginPage from "../pages/LoginPage";
import UserPage from "../pages/UserPage";

type HooksFixtureType = {
  gotoUrlFixture: any;
  logoutFixture: any;
};

export const test = baseTest.extend<HooksFixtureType>({
  gotoUrlFixture: async ({ loginPageFixture }, use) => {
    await loginPageFixture.gotoOrangeHrm();
    await use();
  },
  logoutFixture: async ({ userPageFixture }, use) => {
    await use();
    await userPageFixture.clickOnLogout();
  },
});

export { expect } from "@playwright/test";
