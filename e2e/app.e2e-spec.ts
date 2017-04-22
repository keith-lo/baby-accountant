import { BabyAccountantV2Page } from './app.po';

describe('baby-accountant-v2 App', function() {
  let page: BabyAccountantV2Page;

  beforeEach(() => {
    page = new BabyAccountantV2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
