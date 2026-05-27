import { test as baseTest } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import DashBoardPage from "../pages/DashBoardPage";
import UserPage from "../pages/UserPage";
import { SideBarPage } from "../pages/sideBarPage";
import { PimPage } from "../pages/pimPage";

type PomFixturesType = {
  loginPageFixture: LoginPage;
  dashBoardFixture: DashBoardPage;
  userPageFixture: UserPage;
  sideBarFixture: SideBarPage;
  pimPageFixture: PimPage;
};
/* const loginPageObj = new LoginPage(page);
    use(loginPageObj); */
export const test = baseTest.extend<PomFixturesType>({
  loginPageFixture: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashBoardFixture: async ({ page }, use) => {
    await use(new DashBoardPage(page));
  },
  userPageFixture: async ({ page }, use) => {
    await use(new UserPage(page));
  },
  sideBarFixture: async ({ page }, use) => {
    await use(new SideBarPage(page));
  },
  pimPageFixture: async ({ page }, use) => {
    await use(new PimPage(page));
  },
});
