import { test, expect } from "../fixtures/hooks-fixture";
import empData from "../data/pim-module-employee-data.json";

test(
  "Verify that a new Employee successfully created under Pim module",
  { tag: ["@UI", "@UAT"] },
  async ({ gotoUrlFixture, sideBarFixture, pimPageFixture }) => {
    await test.step("open PIM Module", async () => {
      await sideBarFixture.clickOnPimLink();
    });
    await test.step("Add employee in PIM module", async () => {
      await pimPageFixture.addEmployee(
        empData.e1.firstName,
        empData.e1.middleName,
        empData.e1.lastName,
      );
    });
    await test.step("verify Employee Name After successfully added in PIM module", async () => {
      await expect(await pimPageFixture.empNameHeading).toHaveText(
        `${empData.e1.firstName} ${empData.e1.lastName}`,
      );
    });
  },
);
