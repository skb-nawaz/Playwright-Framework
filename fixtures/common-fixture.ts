import { test as baseTest } from "../fixtures/pom-fixture";
import Commonutils from "../utilities/CommonUtils";

type PomFixturesType = {
  commonUtilsFixture: Commonutils;
};

export const test = baseTest.extend<PomFixturesType>({
  commonUtilsFixture: async ({}, use) => {
    await use(new Commonutils());
  },
});
