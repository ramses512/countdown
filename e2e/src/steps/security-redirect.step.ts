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
Given('a user who is not logged in', async () => {
  browser.executeScript('window.localStorage.clear();');
});

When('he tries to access transactions screen', async () => {
  await commonPage.goTo('transaction');
});
Then('the system redirects to login page', async () => {
  const url = await browser.getCurrentUrl();
  await expect(url).to.equal(
    'http://localhost:4200/login?returnUrl=%2Ftransaction'
  );
});
