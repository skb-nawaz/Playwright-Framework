import { test as baseTest } from "../fixtures/common-fixture";
import type LoginPage from "../pages/LoginPage";
import UserPage from "../pages/UserPage";

type HooksFixtureType = {
  gotoUrlFixture: any;
  logoutFixture: any;
};

export const test = baseTest.extend<HooksFixtureType>({
  gotoUrlFixture: async (
    { loginPageFixture }: { loginPageFixture: LoginPage },
    use: (value?: any) => Promise<void>,
  ) => {
    await loginPageFixture.gotoOrangeHrm();
    await use();
  },
  logoutFixture: async (
    { userPageFixture }: { userPageFixture: UserPage },
    use: (value?: any) => Promise<void>,
  ) => {
    await use();
    await userPageFixture.clickOnLogout();
  },
});

export { expect } from "@playwright/test";
