import { by, element, ElementFinder } from 'protractor';
export class LoginPage {
  public getMessageError(): ElementFinder {
    return element(by.css('.mat-simple-snackbar  > span'));
  }
}
