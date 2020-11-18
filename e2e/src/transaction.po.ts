import { by, element, ElementArrayFinder, ElementFinder } from 'protractor';
export class TransactionPage {
  public getAllDateTable(): ElementArrayFinder {
    return element.all(by.css('tbody tr td:nth-of-type(2)'));
  }
  public getAllDescriptionTable(): ElementArrayFinder {
    return element.all(by.css('tbody tr td:nth-of-type(5)'));
  }
  public getFirstElementOfTable(): ElementFinder {
    return element(by.css('tbody tr td:first-child'));
  }
}
