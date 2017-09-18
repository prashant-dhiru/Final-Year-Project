import { FinalYearProjectPage } from './app.po';

describe('final-year-project App', () => {
  let page: FinalYearProjectPage;

  beforeEach(() => {
    page = new FinalYearProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to FYP!');
  });
});
