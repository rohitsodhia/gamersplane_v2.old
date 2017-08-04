import { GamersPlaneNGPage } from './app.po';

describe('gamers-plane-ng App', () => {
  let page: GamersPlaneNGPage;

  beforeEach(() => {
    page = new GamersPlaneNGPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
