import { BabyAccountantPage } from './app.po';

describe('baby-accountant App', function() {
  let page: BabyAccountantPage;

  beforeEach(() => {
    page = new BabyAccountantPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
