import { Before, When } from 'cucumber';
import { CommonPage } from '../common.po';

let commonPage: CommonPage;

Before(() => {
  commonPage = new CommonPage();
});

When(/^I fill in the form$/, async (table: any) => {
  const inputs = table.hashes();
  for (const input of inputs) {
    await commonPage.fillInput(input.name, input.data);
  }
});
