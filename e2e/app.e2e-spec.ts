import { ValuationJsPage } from './app.po';

describe('favorites-webapp App', function() {
  let page: ValuationJsPage;

  beforeEach(() => {
    page = new ValuationJsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
