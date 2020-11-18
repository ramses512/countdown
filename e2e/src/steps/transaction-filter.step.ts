import { Before, Given, Then, When } from 'cucumber';
import { CommonPage } from '../common.po';
import { browser } from 'protractor';
import { expect } from 'chai';
import { LoginPage } from '../login.po';
import { TransactionPage } from '../transaction.po';

let commonPage: CommonPage;
let loginPage: LoginPage;
let transactionPage: TransactionPage;

Before(async () => {
  commonPage = new CommonPage();
  loginPage = new LoginPage();
  transactionPage = new TransactionPage();
});
Given('a user who is in transactions screen 4', async () => {
  await commonPage.goTo('login');
  await commonPage.fillInput('username', 'user');
  await commonPage.fillInput('password', 'pass');
  const form = await commonPage.getById('loginForm').getAttribute('class');
  expect(form).contain('ng-valid');
  await commonPage.scrollAndClick(await commonPage.getById('btnSubmit'));
  const url = await browser.getCurrentUrl();
  await expect(url).to.equal('http://localhost:4200/transaction');
});

When(
  /^he tries to search a transaction with "([^"]*)"$/,
  async (value: string) => {
    await commonPage.getById('filter').sendKeys(value);
  }
);
Then(
  /^the system displays matching transactions with "([^"]*)"$/,
  async (value: string) => {
    await transactionPage
      .getAllDescriptionTable()
      .map((eachName) => eachName.getText().then((data) => data))
      .then((data) => {
        const allMatch = data.some((x: string) => x.includes(value));
        expect(allMatch).to.equal(true);
      });
  }
);
