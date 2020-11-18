import { Before, Given, Then, When } from 'cucumber';
import { CommonPage } from '../common.po';
import { browser, ExpectedConditions, protractor } from 'protractor';
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
Given('a user who is in transactions screen 1', async () => {
  await commonPage.goTo('login');
  await commonPage.fillInput('username', 'user');
  await commonPage.fillInput('password', 'pass');
  const form = await commonPage.getById('loginForm').getAttribute('class');
  expect(form).contain('ng-valid');
  await commonPage.scrollAndClick(await commonPage.getById('btnSubmit'));
  const url = await browser.getCurrentUrl();
  await expect(url).to.equal('http://localhost:4200/transaction');
});

Then('the system displays transactions sorted descending by date', async () => {
  await transactionPage
    .getAllDateTable()
    .map((eachName) => eachName.getText().then((unSorted) => unSorted))
    .then((unSorted) => {
      let sorted = unSorted.slice();
      sorted = sorted.sort().reverse();
      expect(sorted).eql(unSorted);
    });
});
