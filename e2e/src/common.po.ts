import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions as ExpConds,
} from 'protractor';

export class CommonPage {
  public async goTo(url: string): Promise<any> {
    await browser.get(url);
  }

  public async scrollAndClick(el: ElementFinder): Promise<ElementFinder> {
    await this.scrollToElement(el);
    await browser.wait(ExpConds.visibilityOf(el));
    await browser.wait(ExpConds.elementToBeClickable(el));
    await el.click();
  }

  public async scrollToElement(el: ElementFinder): Promise<ElementFinder> {
    await browser.executeScript(
      'arguments[0].scrollIntoView({behavior: "auto", block: "center", inline: "nearest"})',
      await el.getWebElement()
    );
  }

  public getInput(name: string): ElementFinder {
    return element(by.css(`input[formControlName=${name}]`));
  }
  public getById(name: string): ElementFinder {
    return element(by.id(name));
  }

  public async fillInput(name: string, data: string): Promise<void> {
    const el = this.getInput(name);
    await this.scrollAndClick(el);
    await el.clear();
    await el.sendKeys(data);
  }
}
