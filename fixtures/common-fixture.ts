import { test as baseTest } from "../fixtures/pom-fixture";
import CommonApiUtils from "../utilities/CommonApiUtils";
import Commonutils from "../utilities/CommonUtils";

type PomFixturesType = {
  commonUtilsFixture: Commonutils;
  commonUtilsApiFixture: CommonApiUtils;
};

export const test = baseTest.extend<PomFixturesType>({
  commonUtilsFixture: async ({}, use) => {
    await use(new Commonutils());
  },
  commonUtilsApiFixture: async ({ request }, use) => {
    await use(new CommonApiUtils(request));
  },
});
