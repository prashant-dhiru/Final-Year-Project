import { browser, by, element } from 'protractor';

export class FinalYearProjectPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('FYP-root h1')).getText();
  }
}
