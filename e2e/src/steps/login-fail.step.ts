import { Before, Then, When } from 'cucumber';
import { CommonPage } from '../common.po';
import { expect } from 'chai';
import { LoginPage } from '../login.po';

let commonPage: CommonPage;
let loginPage: LoginPage;

Before(() => {
  commonPage = new CommonPage();
  loginPage = new LoginPage();
});

When('he tries to login with invalid credentials', async () => {
  await commonPage.goTo('login');
  await commonPage.fillInput('username', 'test');
  await commonPage.fillInput('password', 'test');
  const form = await commonPage.getById('loginForm').getAttribute('class');
  expect(form).contain('ng-valid');
  await commonPage.scrollAndClick(await commonPage.getById('btnSubmit'));
});
Then('the system displays an error', async () => {
  const message = await loginPage.getMessageError().getText();
  await expect(message).to.equal('Username or password not valid');
});
