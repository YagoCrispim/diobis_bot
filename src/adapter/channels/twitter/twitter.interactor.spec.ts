import { TwitterInteractor } from './twitter.interactor';

describe('TwitterInteractor', () => {
  global.$diobis = {
    env: {} as any,
    errorHandler: jest.fn(),
  };

  it('should be defined', () => {
    expect(TwitterInteractor).toBeDefined();
  });
});
