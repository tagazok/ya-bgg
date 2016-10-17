import { BggPage } from './app.po';

describe('bgg App', function() {
  let page: BggPage;

  beforeEach(() => {
    page = new BggPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
