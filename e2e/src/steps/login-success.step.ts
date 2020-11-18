import { Before, Given, Then, When } from 'cucumber';
import { CommonPage } from '../common.po';
import { browser, ExpectedConditions, protractor } from 'protractor';
import { expect } from 'chai';
import { LoginPage } from '../login.po';

let commonPage: CommonPage;
let loginPage: LoginPage;

Before(() => {
  commonPage = new CommonPage();
  loginPage = new LoginPage();
});
Given('a user who already has an account', async () => {
  await commonPage.goTo('login');
});

When('he tries to login with valid credentials', async () => {
  await commonPage.fillInput('username', 'user');
  await commonPage.fillInput('password', 'pass');
  const form = await commonPage.getById('loginForm').getAttribute('class');
  expect(form).contain('ng-valid');
  await commonPage.scrollAndClick(await commonPage.getById('btnSubmit'));
});
Then('the system redirects to transaction list', async () => {
  const url = await browser.getCurrentUrl();
  await expect(url).to.equal('http://localhost:4200/transaction');
});
